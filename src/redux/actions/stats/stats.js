import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { db } from '../../../firebase'
import {
  SET_EXERCISE_STATS,
  SET_STATS_STATUS,
  SET_TOTAL_USER_STATS,
} from '../../types'

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

    const date = new Date().getTime()

    let newPR1x1
    if (weight && (!pr1x1 || pr1x1.weight < weight)) {
      newPR1x1 = { weight: weight, date, reps: incReps }
    } else {
      newPR1x1 = false
    }

    let newPR1x5
    if (weight && incReps >= 5 && (!pr1x5 || pr1x5.weight < weight)) {
      newPR1x5 = { weight: weight, date, reps: incReps }
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

    await addDoc(collection(currExerciseStatsRef.ref, 'completedSetsPath'), {
      isNewPR1x1: !!newPR1x1,
      isNewPR1x5: !!newPR1x5,
      date,
      weight,
      reps: incReps,
    })
  }

// export const getStats = () => async (dispatch, getState) => {
//   dispatch({ type: SET_STATS_STATUS, payload: 'loading' })
//   const uid = getState().auth.userAuth.uid
//   const userStatsRef = doc(db, 'userStats', uid)
//   const userStatsSnap = await getDoc(userStatsRef)
// }

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
