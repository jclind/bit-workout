import {
  FETCH_WORKOUT_DATA,
  SET_COMPLETED_WORKOUT_DATA,
  SET_WORKOUT_DATA,
  SET_WORKOUT_FINISHED,
} from '../../types'
import { db } from '../../../firebase'
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from 'firebase/firestore'
import { exerciseList } from '../../../assets/data/exerciseList'
import { calcCoins, calcExp, logWorkout } from '../character/character'
import { v4 as uuidv4 } from 'uuid'

export const fetchWorkoutData = uid => async dispatch => {
  await getDoc(doc(db, 'workoutData', uid)).then(document => {
    const workoutData = document.data()
    dispatch({ type: FETCH_WORKOUT_DATA, payload: workoutData })
    const timeLastUpdated = workoutData.runningWorkout.timeLastUpdated
    const isWorkoutRunning = workoutData.isWorkoutRunning
    if (
      isWorkoutRunning &&
      (!timeLastUpdated || timeLastUpdated < new Date().getTime() - 1800000)
    ) {
      dispatch(stopWorkout())
    }
  })
}

export const updateWorkout = data => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid
  if (!uid) console.error('UID not defined in updateWorkout')
  const workoutRef = doc(db, 'workoutData', uid)

  await updateDoc(workoutRef, {
    ...data,
  })
    .then(() => {
      dispatch({ type: SET_WORKOUT_DATA, payload: data })
    })
    .catch(err => {
      console.log(err)
      // !ERROR
    })
}
export const setWorkoutFinished = isFinished => async (dispatch, getState) => {
  return {
    type: SET_WORKOUT_FINISHED,
    payload: isFinished,
  }
}

export const getSingleWorkout = id => (dispatch, getState) => {
  const weights = getState().workout.workoutData.weights
  const workoutData = getState().workout.workoutData

  const currExercise = exerciseList.find(ex => ex.id === id)
  const exerciseWeightData = weights.find(ex => ex.exerciseID === id)
  let exerciseWeight
  if (!exerciseWeightData) {
    exerciseWeight = 45
  } else {
    exerciseWeight = exerciseWeightData.weight
  }
  const currWorkoutData = workoutData.runningWorkout.currWorkout.path.find(
    ex => ex.exercise.id === id
  )

  return {
    ...currExercise,
    exerciseWeight,
    currWorkoutData,
  }
}
export const startWorkout = workoutData => async (dispatch, getState) => {
  const data = {
    isWorkoutRunning: true,
    runningWorkout: {
      workoutStartTime: new Date().getTime(),
      timeLastUpdated: new Date().getTime(),
      remainingWorkout: { currIdx: 0, currSet: 1 },
      currWorkout: workoutData,
      timer: {
        isTimer: false,
        timerStart: null,
      },
      coins: 0,
      exp: 0,
    },
  }
  dispatch(updateWorkout(data))
  dispatch(setWorkoutFinished(false))
}

const incCurrWorkoutStats = (
  currWorkoutStats,
  incSets,
  incReps,
  exerciseID,
  incTotalTime
) => {
  const workoutStats = currWorkoutStats
    ? currWorkoutStats
    : {
        totalStats: {
          totalReps: 0,
          totalSets: 0,
          totalWorkoutTime: 0,
        },
        exerciseStats: [],
      }
  if (incTotalTime) {
    workoutStats.totalStats.totalWorkoutTime =
      Number(workoutStats.totalStats.totalWorkoutTime) + Number(incTotalTime)
  }
  if (exerciseID) {
    if (
      workoutStats.exerciseStats.findIndex(
        exercise => exercise.exerciseID === exerciseID
      ) === -1
    ) {
      workoutStats.exerciseStats.push({
        exerciseID,
        totalReps: 0,
        totalSets: 0,
      })
    }
    if (incSets) {
      workoutStats.totalStats.totalSets += 1
      const exerciseStatsIdx = workoutStats.exerciseStats.findIndex(
        exercise => exercise.exerciseID === exerciseID
      )
      workoutStats.exerciseStats[exerciseStatsIdx].totalSets =
        Number(workoutStats.exerciseStats[exerciseStatsIdx].totalSets) + 1
    }
    if (incReps) {
      workoutStats.totalStats.totalReps += Number(incReps)
      const exerciseStatsIdx = workoutStats.exerciseStats.findIndex(
        exercise => exercise.exerciseID === exerciseID
      )
      workoutStats.exerciseStats[exerciseStatsIdx].totalReps =
        Number(workoutStats.exerciseStats[exerciseStatsIdx].totalReps) +
        Number(incReps)
    }
  }

  return workoutStats
}

export const completeSet =
  (currSetTotal, completedReps, exerciseID, lastSetFailed) =>
  async (dispatch, getState) => {
    const runningWorkout = getState().workout.workoutData.runningWorkout
    const timeLastUpdated = runningWorkout.timeLastUpdated
    const currSet = runningWorkout.remainingWorkout.currSet
    const currIdx = runningWorkout.remainingWorkout.currIdx
    const currWorkoutPathLength = runningWorkout.currWorkout.path.length
    const elapsedTime = new Date().getTime() - timeLastUpdated

    const currExerciseWeightObj = getState().workout.workoutData.weights.find(
      ex => ex.exerciseID === exerciseID
    )
    // If user doesn't have recorded weight for current exercise, set to 45
    let currExerciseWeight
    if (!currExerciseWeightObj || !currExerciseWeightObj.weight) {
      currExerciseWeight = 45
      addNewExerciseWeight(45, exerciseID)
    } else {
      currExerciseWeight = currExerciseWeightObj.weight
    }

    let updatedPath = [...runningWorkout.currWorkout.path]
    const currSetPath = updatedPath[currIdx].setPath || []
    updatedPath[currIdx].setPath = [
      ...currSetPath,
      {
        setNum: currSet,
        completedReps,
        weight: currExerciseWeight,
        isFailed: lastSetFailed || false,
      },
    ]

    const currCoins = runningWorkout.coins ? runningWorkout.coins : 0
    const totalCoins = calcCoins(completedReps) + currCoins
    const currExp = runningWorkout.exp ? runningWorkout.exp : 0
    const totalExp = calcExp(completedReps) + currExp

    // If the current set is the last set
    // Else start rest timer, increment set, and updateWorkout
    if (currSet >= currSetTotal) {
      // If the last set of the last exercise is finished then call finishWorkout
      // Else begin next rest timer, increment currSet and currIdx, and updateWorkout
      if (currIdx >= currWorkoutPathLength - 1) {
        dispatch(finishWorkout(totalCoins, totalExp))
      } else {
        const startTime = new Date().getTime()
        const nextIdx = currIdx + 1
        const nextSet = 1

        const workoutStats = incCurrWorkoutStats(
          getState().workout.workoutData.workoutStats,
          true,
          completedReps,
          exerciseID,
          elapsedTime
        )
        const updatedData = {
          'runningWorkout.remainingWorkout.currIdx': nextIdx,
          'runningWorkout.remainingWorkout.currSet': nextSet,
          'runningWorkout.timer.isTimer': true,
          'runningWorkout.timer.timerStart': startTime,
          'runningWorkout.currWorkout.lastSetFailed': false,
          'runningWorkout.timeLastUpdated': new Date().getTime(),
          'runningWorkout.coins': totalCoins,
          'runningWorkout.exp': totalExp,
          'runningWorkout.currWorkout.path': updatedPath,
          workoutStats,
        }

        dispatch(updateWorkout(updatedData))
      }
    } else {
      const startTime = new Date().getTime()
      const nextSet = currSet + 1

      const workoutStats = incCurrWorkoutStats(
        getState().workout.workoutData.workoutStats,
        true,
        completedReps,
        exerciseID,
        elapsedTime
      )
      const updatedData = {
        'runningWorkout.remainingWorkout.currSet': nextSet,
        'runningWorkout.timer.isTimer': true,
        'runningWorkout.timer.timerStart': startTime,
        'runningWorkout.currWorkout.lastSetFailed': lastSetFailed || false,
        'runningWorkout.timeLastUpdated': new Date().getTime(),
        'runningWorkout.coins': totalCoins,
        'runningWorkout.exp': totalExp,
        workoutStats,
      }
      dispatch(updateWorkout(updatedData))
    }

    // Calculate character stats based on completed reps
    dispatch(logWorkout(completedReps))
  }

export const failSet =
  (newWeight, exerciseID, currSetTotal, completedReps) =>
  async (dispatch, getState) => {
    const weights = getState().workout.workoutData.weights

    const modWeights = weights.map(weight => {
      if (weight.exerciseID === exerciseID) {
        return { ...weight, weight: newWeight }
      }
      return weight
    })
    await dispatch(completeSet(currSetTotal, completedReps, true))
    await dispatch(
      updateWorkout({
        weights: modWeights,
        // 'runningWorkout.currWorkout.path'
      })
    )
  }

const updateWeights = (weights, currWorkoutPath) => {
  const modWeights = [...weights]
  currWorkoutPath.forEach(ex => {
    const exerciseID = ex.exerciseID

    modWeights.forEach(w => {
      if (w.exerciseID === exerciseID) {
        w.weight += 5
      }
    })
  })
  return modWeights
}
export const addNewExerciseWeight =
  (newWeight, exerciseID) => async (dispatch, getState) => {
    const weights = getState().workout.workoutData.weights
    const newWeights = [...weights, { weight: newWeight, exerciseID }]
    dispatch(
      updateWorkout({
        weights: newWeights,
      })
    )
  }

export const addWorkoutToPastWorkouts = data => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid
  const userWorkoutDataRef = doc(db, 'workoutData', uid)
  const userPastWorkoutsRef = collection(userWorkoutDataRef, 'pastWorkouts')

  const workoutId = uuidv4()

  addDoc(userPastWorkoutsRef, { ...data, id: workoutId }).catch(err => {
    console.log('workout not added to data:', err)
    // !ERROR
  })
}
export const finishWorkout = (coins, exp) => async (dispatch, getState) => {
  const workoutData = getState().workout.workoutData
  const runningWorkout = workoutData.runningWorkout
  const currWorkout = runningWorkout.currWorkout
  const weights = workoutData.weights

  const path = currWorkout.path
  // Get path data with weights included for pastWorkoutData stats
  const pathData = path.map(ex => {
    const exerciseID = ex.exercise.id
    const imageURL = exerciseList.find(ex => ex.id === exerciseID).imageURL
    let currWeight = null
    weights.forEach(w => {
      if (w.exerciseID === exerciseID) {
        currWeight = w.weight
      }
    })
    return { ...ex, weight: currWeight, imageURL }
  })

  const timeLastUpdated =
    getState().workout.workoutData.runningWorkout.timeLastUpdated
  const updatedWeights = await updateWeights(
    weights,
    workoutData.runningWorkout.currWorkout.path
  )

  const elapsedTime = new Date().getTime() - timeLastUpdated
  const workoutStats = incCurrWorkoutStats(
    getState().workout.workoutData.workoutStats,
    true,
    null,
    null,
    elapsedTime
  )

  const updatedData = {
    isWorkoutRunning: false,
    weights: updatedWeights,
    workoutStats,
  }

  const workoutStartTime = runningWorkout.workoutStartTime
  const totalWorkoutTime = new Date() - workoutStartTime
  const finishedWorkoutData = {
    workoutName: currWorkout.name || 'Temp Workout',
    workoutRestTime: currWorkout.restTime,
    workoutStartTime,
    totalWorkoutTime,
    coinsEarned: coins,
    expEarned: exp,
    path: pathData,
  }
  dispatch(updateWorkout(updatedData))
  dispatch({ type: SET_COMPLETED_WORKOUT_DATA, payload: finishedWorkoutData })
  dispatch(setWorkoutFinished(true))
  dispatch(addWorkoutToPastWorkouts(finishedWorkoutData))
}

export const stopWorkout = () => async (dispatch, getState) => {
  const workoutData = getState().workout.workoutData
  const runningWorkout = workoutData.runningWorkout
  const currWorkout = runningWorkout.currWorkout
  const workoutStartTime = runningWorkout.workoutStartTime
  const totalWorkoutTime = new Date() - workoutStartTime
  const weights = workoutData.weights

  const coins = runningWorkout.coins ? runningWorkout.coins : 0
  const exp = runningWorkout.exp ? runningWorkout.exp : 0

  const currIdx = runningWorkout.remainingWorkout.currIdx

  const path = [...currWorkout.path.slice(0, currIdx + 1)]
  // Get path data with weights included for pastWorkoutData stats
  const pathData = path.map(ex => {
    const exerciseID = ex.exerciseID
    const imageURL = exerciseList.find(ex => ex.id === exerciseID).imageURL
    const setPath = ex.setPath || []
    let currWeight = null
    weights.forEach(w => {
      if (w.exerciseID === exerciseID) {
        currWeight = w.weight
      }
    })
    return { ...ex, weight: currWeight, imageURL, setPath }
  })

  const finishedWorkoutData = {
    workoutName: currWorkout.name,
    workoutRestTime: currWorkout.restTime,
    workoutStartTime,
    totalWorkoutTime,
    coinsEarned: coins,
    expEarned: exp,
    path: pathData,
  }

  await dispatch(updateWorkout({ isWorkoutRunning: false }))
  dispatch(setWorkoutFinished(true))

  dispatch({ type: SET_COMPLETED_WORKOUT_DATA, payload: finishedWorkoutData })
  dispatch(addWorkoutToPastWorkouts(finishedWorkoutData))
}

// PAST WORKOUT DATA
export const queryPastWorkoutData =
  (order, numResults, latestDoc, descending = true) =>
  async (dispatch, getState) => {
    const uid = getState().auth.userAuth.uid
    const userWorkoutDataRef = doc(db, 'workoutData', uid)
    const userPastWorkoutsRef = collection(userWorkoutDataRef, 'pastWorkouts')

    const queriedData = []

    // If latestDoc is not pasted in, get results from beginning of collection
    let q
    if (latestDoc) {
      if (descending) {
        q = query(
          userPastWorkoutsRef,
          orderBy(order, 'desc'),
          startAfter(latestDoc),
          limit(numResults)
        )
      } else {
        q = query(
          userPastWorkoutsRef,
          orderBy(order),
          startAfter(latestDoc),
          limit(numResults)
        )
      }
    } else {
      if (descending) {
        q = query(
          userPastWorkoutsRef,
          orderBy(order, 'desc'),
          limit(numResults)
        )
      } else {
        q = query(userPastWorkoutsRef, orderBy(order), limit(numResults))
      }
    }

    const querySnapshot = await getDocs(q)
    const newLatestDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
    // If dataExists is false, will return no data response
    let dataExists
    querySnapshot.forEach(doc => {
      dataExists = true
      const data = doc.data()
      queriedData.push(data)
    })
    if (dataExists) {
      return { data: queriedData, latestDoc: newLatestDoc }
    }
    return { isResponse: false }
  }

// CREATE NEW WORKOUT

export const createWorkout = data => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid
  const dateCreated = new Date().getTime()

  await setDoc(doc(db, 'workouts', data.id), {
    ...data,
    authorUID: uid,
    dateCreated,
  })
}

// GET WORKOUT LIST
export const getWorkouts = (queryString, order, limit) => async () => {
  const workoutsRef = collection(db, 'workouts')

  const q = query(workoutsRef, where('name', '>=', queryString))

  const querySnapshot = await getDocs(q)
  const arr = []
  querySnapshot.forEach(doc => {
    arr.push(doc.data())
  })

  return arr
}
