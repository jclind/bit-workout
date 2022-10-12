import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../../../firebase'
import {
  SET_EXERCISE_STATS,
  SET_STATS_STATUS,
  SET_TOTAL_USER_STATS,
} from '../../types'
import { v4 as uuidv4 } from 'uuid'

const getSingleExerciseStatsRef = async (uid, exerciseID) => {
  const userStatsRef = doc(db, 'userStats', uid)
  const exerciseDataQuery = query(
    collection(userStatsRef, 'exerciseStats'),
    where('exerciseID', '==', Number(exerciseID))
  )

  const exerciseQuerySnapshot = await getDocs(exerciseDataQuery)
  let exerciseStatsRef
  exerciseQuerySnapshot.forEach(doc => {
    console.log('here!!!')
    exerciseStatsRef = doc
  })

  return exerciseStatsRef.ref
}

export const updateWorkoutStats =
  (
    incSets = 0,
    incReps = 0,
    weight = 0,
    exerciseID,
    incTotalTime = 0,
    incCoins = 0,
    incExp = 0
  ) =>
  async (dispatch, getState) => {
    const uid = getState().auth.userAuth.uid

    const userStatsRef = doc(db, 'userStats', uid)

    await setDoc(
      userStatsRef,
      {
        totalSets: increment(Number(incSets)),
        totalReps: increment(Number(incReps)),
        totalWeightLifted: increment(Number(weight)),
        totalWorkoutTime: increment(Number(incTotalTime)),
        totalCoins: increment(Number(incCoins)),
        totalExp: increment(Number(incExp)),
      },
      { merge: true }
    )

    const exerciseStatsQuery = query(
      collection(userStatsRef, 'exerciseStats'),
      where('exerciseID', '==', exerciseID)
    )
    const exerciseStatsDocs = await getDocs(exerciseStatsQuery)
    const exerciseStatsExist = !exerciseStatsDocs.empty

    let currExerciseStatsRef = null
    if (exerciseStatsExist) {
      exerciseStatsDocs.forEach(doc => (currExerciseStatsRef = doc))
    }

    let currExerciseStatsSnap = false
    if (exerciseStatsExist) {
      currExerciseStatsSnap = await getDoc(currExerciseStatsRef.ref)
    }
    const { pr1x1, pr1x5 } = currExerciseStatsSnap
      ? currExerciseStatsSnap.data()
      : {}

    const id = uuidv4()

    const date = new Date().getTime()

    let newPR1x1
    if (weight && (!pr1x1 || pr1x1.weight < weight)) {
      newPR1x1 = { id, weight: weight, date, reps: incReps }
    } else {
      newPR1x1 = false
    }

    let newPR1x5
    if (weight && incReps >= 5 && (!pr1x5 || pr1x5.weight < weight)) {
      newPR1x5 = { id, weight: weight, date, reps: incReps }
    } else {
      newPR1x5 = false
    }

    const exerciseData = {
      ...(newPR1x1 && { pr1x1: newPR1x1 }),
      ...(newPR1x5 && { pr1x5: newPR1x5 }),
    }
    if (exerciseStatsExist) {
      await setDoc(
        currExerciseStatsRef.ref,
        {
          ...exerciseData,
          totalTime: increment(Number(incTotalTime)),
          totalCoins: increment(Number(incCoins)),
          totalExp: increment(Number(incExp)),
          totalSets: increment(Number(incSets)),
          totalReps: increment(Number(incReps)),
          totalExerciseWeightLifted: increment(Number(weight)),
        },
        { merge: true }
      )
    } else {
      await addDoc(collection(userStatsRef, 'exerciseStats'), {
        ...exerciseData,
        exerciseID,
        totalTime: Number(incTotalTime),
        totalCoins: Number(incCoins),
        totalExp: Number(incExp),
        totalSets: Number(incSets),
        totalReps: Number(incReps),
        totalExerciseWeightLifted: Number(weight),
      }).then(doc => {
        currExerciseStatsRef = { ref: doc }
      })
    }

    await setDoc(doc(currExerciseStatsRef.ref, 'completedSetsPath', id), {
      id,
      isNewPR1x1: !!newPR1x1,
      isNewPR1x5: !!newPR1x5,
      date,
      weight,
      reps: incReps,
    })
  }

export const getStats = () => async (dispatch, getState) => {
  dispatch({ type: SET_STATS_STATUS, payload: 'loading' })
  const uid = getState().auth.userAuth.uid
  const userStatsRef = doc(db, 'userStats', uid)
  const userStatsSnap = await getDoc(userStatsRef)

  if (!userStatsSnap.exists()) {
    return dispatch({ type: SET_STATS_STATUS, payload: 'no_data' })
  } else {
    dispatch({
      type: SET_TOTAL_USER_STATS,
      payload: userStatsSnap.data(),
    })
  }

  const exerciseDataQuery = collection(userStatsRef, 'exerciseStats')
  const querySnapshot = await getDocs(exerciseDataQuery)

  let exerciseData = []
  querySnapshot.forEach(doc => {
    exerciseData.push(doc.data())
  })

  dispatch({ type: SET_EXERCISE_STATS, payload: exerciseData })

  return dispatch({ type: SET_STATS_STATUS, payload: 'success' })
}

export const queryChartData =
  (exerciseID, numResults, latestDoc) => async (dispatch, getState) => {
    const uid = getState().auth.userAuth.uid

    const exerciseStatsRef = await getSingleExerciseStatsRef(uid, exerciseID)

    const completedSetsPathRef = collection(
      exerciseStatsRef,
      'completedSetsPath'
    )

    console.log(latestDoc)
    let setsPathQuery
    if (latestDoc) {
      setsPathQuery = query(
        completedSetsPathRef,
        orderBy('date', 'desc'),
        startAfter(latestDoc),
        limit(numResults)
      )
    } else {
      setsPathQuery = query(
        completedSetsPathRef,
        orderBy('date', 'desc'),
        limit(numResults)
      )
    }
    const completedSetsPathSnapshot = await getDocs(setsPathQuery)

    const newLatestDoc =
      completedSetsPathSnapshot.docs[completedSetsPathSnapshot.docs.length - 1]

    let sets = []
    completedSetsPathSnapshot.forEach(doc => {
      const data = doc.data()
      if (data) {
        sets.push(doc.data())
      }
    })

    return { data: sets, latestDoc: newLatestDoc }
  }

export const removeChartData =
  (id, singleExerciseStats, setReps) => async (dispatch, getState) => {
    const uid = getState().auth.userAuth.uid
    const { exerciseID, pr1x1, pr1x5 } = singleExerciseStats

    const exerciseStatsRef = await getSingleExerciseStatsRef(uid, exerciseID)
    const completedSetsPathRef = collection(
      exerciseStatsRef,
      'completedSetsPath'
    )
    const completedSetsPathDocRef = doc(
      exerciseStatsRef,
      'completedSetsPath',
      id
    )

    await deleteDoc(completedSetsPathDocRef)

    let isNewPR1x1 = false
    let newPR1x1Data = null
    let newPRRef
    if (pr1x1.id === id) {
      const setsPathQuery = query(
        completedSetsPathRef,
        orderBy('weight', 'desc'),
        orderBy('date'),
        limit(1)
      )
      const newPR1x1Snapshot = await getDocs(setsPathQuery)

      newPR1x1Snapshot.forEach(res => {
        newPRRef = res.ref
        isNewPR1x1 = true
        const { id, date, reps, weight } = res.data()
        newPR1x1Data = { id, date, reps, weight }
      })

      // await updateDoc(newPR1x1Ref, {
      //   // isNewPR1x1
      // })
    }
    let isNewPR1x5 = false
    let newPR1x5Data = null
    if (pr1x5.id === id) {
      const setsPathQuery = query(
        completedSetsPathRef,
        where('reps', '>=', 5),
        orderBy('weight', 'desc'),
        orderBy('date'),
        limit(1)
      )

      const newPR1x5Snapshot = await getDocs(setsPathQuery)
      newPR1x5Snapshot.forEach(res => {
        newPRRef = res.ref
        isNewPR1x5 = true
        const { id, date, reps, weight } = res.data()
        newPR1x5Data = { id, date, reps, weight }
      })
    }

    if (newPRRef && (isNewPR1x1 || isNewPR1x5)) {
      await updateDoc(newPRRef, {
        ...(isNewPR1x1 && { isNewPR1x1 }),
        ...(isNewPR1x5 && { isNewPR1x5 }),
      })
      await exerciseStatsRef.updateDoc(newPRRef, {
        ...(newPR1x1Data && { pr1x1: newPR1x1Data }),
        ...(newPR1x5Data && { pr1x5: newPR1x5Data }),
      })
    }
    // const newPR

    // const removedSetDoc = await getDoc(completedSetsPathRef)
    // const {weight} = removedSetDoc

    // if ()

    // const userStatsRef = doc(db, 'userStats', uid)
    // const exerciseDataQuery = query(
    //   collection(userStatsRef, 'exerciseStats'),
    //   where('exerciseID', '==', exerciseID)
    // )
    // const querySnapshot = await getDocs(exerciseDataQuery)
  }
// export const getExercisePR = exerciseID => async (dispatch, getState) => {
//   const uid = getState().auth.userAuth.uid

//   const userStatsRef = doc(db, 'userStats', uid)
//   const exerciseDataQuery = query(
//     collection(userStatsRef, 'exerciseStats'),
//     where('exerciseID', '==', exerciseID)
//   )
//   const querySnapshot = await getDocs(exerciseDataQuery)

//   let data = null
//   querySnapshot.forEach(doc => {
//     data = doc.data()
//   })
//   return data.pr1x1.weight
// }
