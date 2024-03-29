import {
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
  SET_COMPLETED_ACHIEVEMENTS,
  SET_EXERCISE_STATS,
  SET_STATS_STATUS,
  SET_TOTAL_USER_STATS,
} from '../../types'

const getSingleExerciseStatsRef = async (uid, exerciseID) => {
  const userStatsRef = doc(db, 'userStats', uid)
  const exerciseDataQuery = query(
    collection(userStatsRef, 'exerciseStats'),
    where('exerciseID', '==', Number(exerciseID))
  )

  const exerciseQuerySnapshot = await getDocs(exerciseDataQuery)
  let exerciseStatsRef
  let exerciseStatsData
  exerciseQuerySnapshot.forEach(doc => {
    exerciseStatsRef = doc
    exerciseStatsData = doc.data()
  })

  return { exerciseStatsRef: exerciseStatsRef?.ref || null, exerciseStatsData }
}

export const updateWorkoutStats =
  (
    incSets = 0,
    incReps = 0,
    weight = 0,
    exerciseID,
    incTotalTime = 0,
    incCoins = 0,
    incExp = 0,
    workoutCompleted,
    currSetID = null
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
        ...(workoutCompleted && { totalWorkoutsCompleted: increment(1) }),
      },
      { merge: true }
    )
    const totalUserStats = getState().stats.totalUserStats
    dispatch({
      type: SET_TOTAL_USER_STATS,
      payload: {
        ...totalUserStats,
        totalSets: (totalUserStats?.totalSets || 0) + Number(incSets),
        totalReps: (totalUserStats?.totalReps || 0) + Number(incReps),
        totalWeightLifted:
          (totalUserStats?.totalWeightLifted || 0) + Number(weight),
        totalWorkoutTime:
          (totalUserStats?.totalWorkoutTime || 0) + Number(incTotalTime),
        totalCoins: (totalUserStats?.totalCoins || 0) + Number(incCoins),
        totalExp: (totalUserStats?.totalExp || 0) + Number(incExp),
        ...(workoutCompleted && {
          totalWorkoutsCompleted:
            (totalUserStats?.totalWorkoutsCompleted || 0) + 1,
        }),
      },
    })

    const currExerciseStatsRef = doc(
      userStatsRef,
      'exerciseStats',
      `${exerciseID}-id`
    )

    const currExerciseStatsSnap = await getDoc(currExerciseStatsRef)
    const exerciseStatsExist = currExerciseStatsSnap.exists()

    const { pr1x1, pr1x5 } = exerciseStatsExist
      ? currExerciseStatsSnap.data()
      : {}

    const date = new Date().getTime()

    let newPR1x1
    if (Number(weight) && (!pr1x1 || pr1x1.weight < Number(weight))) {
      newPR1x1 = {
        id: currSetID,
        weight: Number(weight),
        date,
        reps: Number(incReps),
      }
    } else {
      newPR1x1 = false
    }

    let newPR1x5
    if (
      Number(weight) &&
      Number(incReps) >= 5 &&
      (!pr1x5 || pr1x5.weight < Number(weight))
    ) {
      newPR1x5 = {
        id: currSetID,
        weight: Number(weight),
        date,
        reps: Number(incReps),
      }
    } else {
      newPR1x5 = false
    }

    const exerciseData = {
      ...(newPR1x1 && { pr1x1: newPR1x1 }),
      ...(newPR1x5 && { pr1x5: newPR1x5 }),
    }
    if (exerciseStatsExist) {
      await setDoc(
        currExerciseStatsRef,
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
      await setDoc(
        currExerciseStatsRef,
        {
          ...exerciseData,
          exerciseID,
          totalTime: Number(incTotalTime),
          totalCoins: Number(incCoins),
          totalExp: Number(incExp),
          totalSets: Number(incSets),
          totalReps: Number(incReps),
          totalExerciseWeightLifted: Number(weight),
        },
        { merge: true }
      ).then(doc => {
        // currExerciseStatsRef = doc
      })
    }
    const exerciseStats = getState()?.stats?.exerciseStats ?? []
    const singleExerciseStats = exerciseStats.find(
      el => el.exerciseID === exerciseID
    )
    const updatedSingleExerciseStats = {
      ...singleExerciseStats,
      ...exerciseData,
      exerciseID,
      totalTime: (singleExerciseStats?.totalTime || 0) + Number(incTotalTime),
      totalCoins: (singleExerciseStats?.totalCoins || 0) + Number(incCoins),
      totalExp: (singleExerciseStats?.totalExp || 0) + Number(incExp),
      totalSets: (singleExerciseStats?.totalSets || 0) + Number(incSets),
      totalReps: (singleExerciseStats?.totalReps || 0) + Number(incReps),
      totalExerciseWeightLifted:
        (singleExerciseStats?.totalExerciseWeightLifted || 0) + Number(weight),
    }
    dispatch({
      type: SET_EXERCISE_STATS,
      payload: [
        updatedSingleExerciseStats,
        ...exerciseStats.filter(el => el.exerciseID !== exerciseID),
      ],
    })
    await setDoc(doc(currExerciseStatsRef, 'completedSetsPath', currSetID), {
      id: currSetID,
      isNewPR1x1: !!newPR1x1,
      isNewPR1x5: !!newPR1x5,
      date,
      weight: Number(weight),
      reps: Number(incReps),
    })
  }

export const incrementIndividualStat = stat => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid

  const userStatsRef = doc(db, 'userStats', uid)

  await setDoc(
    userStatsRef,
    {
      [stat.prop]: increment(Number(stat.value)),
    },
    { merge: true }
  )

  const totalUserStats = getState().stats.totalUserStats
  dispatch({
    type: SET_TOTAL_USER_STATS,
    payload: {
      ...totalUserStats,
      [stat.prop]: totalUserStats[stat.prop]
        ? totalUserStats[stat.prop] + Number(stat.value)
        : Number(stat.value),
    },
  })
}
export const setIndividualStat = stat => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid

  const userStatsRef = doc(db, 'userStats', uid)

  await setDoc(
    userStatsRef,
    {
      [stat.prop]: Number(stat.value),
    },
    { merge: true }
  )

  const totalUserStats = getState().stats.totalUserStats
  dispatch({
    type: SET_TOTAL_USER_STATS,
    payload: {
      ...totalUserStats,
      [stat.prop]: Number(stat.value),
    },
  })
}

export const getExercisePRs = async (exerciseID, uid) => {
  const { exerciseStatsData } = await getSingleExerciseStatsRef(uid, exerciseID)
  const { pr1x1, pr1x5 } = exerciseStatsData ?? {}

  return { pr1x1, pr1x5, exerciseID }
}
export const getStats = () => async (dispatch, getState) => {
  dispatch({ type: SET_STATS_STATUS, payload: 'loading' })
  const uid = getState().auth.userAuth.uid
  const userStatsRef = doc(db, 'userStats', uid)
  const userStatsSnap = await getDoc(userStatsRef)

  if (!userStatsSnap.exists()) {
    return dispatch({ type: SET_STATS_STATUS, payload: 'no_data' })
  } else {
    const { achievements, ...userStatsData } = userStatsSnap.data()
    dispatch({ type: SET_COMPLETED_ACHIEVEMENTS, payload: achievements || [] })
    dispatch({
      type: SET_TOTAL_USER_STATS,
      payload: userStatsData,
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
  (exerciseID, numResults, latestDoc, endDate) =>
  async (dispatch, getState) => {
    const uid = getState().auth.userAuth.uid

    const { exerciseStatsRef, exerciseStatsData } =
      await getSingleExerciseStatsRef(uid, exerciseID)
    if (!exerciseStatsData) return { data: [] }

    const completedSetsPathRef = collection(
      exerciseStatsRef,
      'completedSetsPath'
    )

    let setsPathQuery
    if (endDate) {
      setsPathQuery = query(
        completedSetsPathRef,
        where('date', '>=', endDate),
        limit(500)
      )
    } else if (latestDoc) {
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

    if (completedSetsPathSnapshot.empty)
      return { data: [], exerciseStatsData, latestDoc: null }

    const newLatestDoc =
      completedSetsPathSnapshot.docs[completedSetsPathSnapshot.docs.length - 1]

    let sets = []
    completedSetsPathSnapshot.forEach(doc => {
      const data = doc.data()
      if (data) {
        sets.push(doc.data())
      }
    })

    return { data: sets, exerciseStatsData, latestDoc: newLatestDoc }
  }

export const removeChartData =
  (deletedID, singleExerciseStats, setReps) => async (dispatch, getState) => {
    const uid = getState().auth.userAuth.uid
    const { exerciseID, pr1x1, pr1x5 } = singleExerciseStats

    const { exerciseStatsRef } = await getSingleExerciseStatsRef(
      uid,
      exerciseID
    )
    const completedSetsPathRef = collection(
      exerciseStatsRef,
      'completedSetsPath'
    )
    const completedSetsPathDocRef = doc(
      exerciseStatsRef,
      'completedSetsPath',
      deletedID
    )

    await deleteDoc(completedSetsPathDocRef)

    let isNewPR1x1 = false
    let newPR1x1Data = null
    let newPR1x1Ref
    let newPR1x5Ref
    if (!pr1x1 || pr1x1.id === deletedID) {
      const setsPathQuery = query(
        completedSetsPathRef,
        orderBy('weight', 'desc'),
        orderBy('date'),
        limit(1)
      )
      const newPR1x1Snapshot = await getDocs(setsPathQuery)

      newPR1x1Snapshot.forEach(res => {
        newPR1x1Ref = res.ref
        isNewPR1x1 = true
        const { id, date, reps, weight } = res.data()
        newPR1x1Data = { id, date, reps, weight }
      })
    }
    let isNewPR1x5 = false
    let newPR1x5Data = null
    if (!pr1x5 || pr1x5.id === deletedID) {
      const setsPathQuery = query(
        completedSetsPathRef,
        where('reps', '>=', 5),
        orderBy('reps', 'desc'),
        orderBy('weight', 'desc'),
        orderBy('date')
      )

      let sets = []
      const newPR1x5Snapshot = await getDocs(setsPathQuery)
      newPR1x5Snapshot.forEach(res => {
        sets.push({ ...res.data(), ref: res.ref })
        isNewPR1x5 = true
      })
      const { id, date, reps, weight, ref } = sets.sort(
        (a, b) => Number(b.weight) - Number(a.weight) || a.date - b.date
      )[0]
      newPR1x5Ref = ref
      newPR1x5Data = { id, date, reps, weight }
    }

    if (isNewPR1x1 || isNewPR1x5) {
      await updateDoc(newPR1x1Ref, {
        ...(newPR1x1Ref && isNewPR1x1 && { isNewPR1x1 }),
      })
      await updateDoc(newPR1x5Ref, {
        ...(newPR1x5Ref && isNewPR1x5 && { isNewPR1x5 }),
      })
      await updateDoc(exerciseStatsRef, {
        ...(newPR1x1Data && { pr1x1: newPR1x1Data }),
        ...(newPR1x5Data && { pr1x5: newPR1x5Data }),
      })
    }
  }

export const addCompletedAchievements =
  achievementIDs => async (dispatch, getState) => {
    if (achievementIDs.length <= 0) return
    const uid = getState().auth.userAuth.uid
    const completedAchievementList =
      getState()?.stats?.completedAchievements ?? []
    const userStatsRef = doc(db, 'userStats', uid)
    const addedIDs = achievementIDs.map(id => {
      return { id, date: new Date().getTime() }
    })
    const updatedAchievementsArr = [...completedAchievementList, ...addedIDs]
    dispatch({
      type: SET_COMPLETED_ACHIEVEMENTS,
      payload: updatedAchievementsArr,
    })
    await setDoc(
      userStatsRef,
      {
        achievements: updatedAchievementsArr,
      },
      { merge: true }
    )
    return updatedAchievementsArr
  }
