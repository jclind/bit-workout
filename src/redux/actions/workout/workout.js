import {
  FETCH_WORKOUT_DATA,
  SET_WORKOUT_DATA,
  SET_WORKOUT_FINISHED,
} from '../../types'
import { db } from '../../../firebase'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { exerciseList } from '../../../assets/data/exerciseList'
import { v4 as uuidv4 } from 'uuid'

export const fetchWorkoutData = uid => async dispatch => {
  await getDoc(doc(db, 'workoutData', uid)).then(document => {
    const workoutData = document.data()
    dispatch({ type: FETCH_WORKOUT_DATA, payload: workoutData })
    const timeLastUpdated = workoutData.runningWorkout.timeLastUpdated
    if (!timeLastUpdated || timeLastUpdated < new Date().getTime() - 1800000) {
      dispatch(updateWorkout({ isWorkoutRunning: false }))
    }
  })
}

export const updateWorkout = data => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid
  if (!uid) console.error('UID not defined in updateWorkout')
  const workoutRef = doc(db, 'workoutData', uid)
  console.log(data)

  await updateDoc(workoutRef, {
    ...data,
  })
    .then(() => {
      dispatch({ type: SET_WORKOUT_DATA, payload: data })
    })
    .catch(err => {
      console.log(err)
    })
}
export const setWorkoutFinished = isFinished => {
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
    ex => ex.exerciseID === id
  )

  return {
    ...currExercise,
    exerciseWeight,
    currWorkoutData,
  }
}
export const startWorkout = exercise => async (dispatch, getState) => {
  const data = {
    isWorkoutRunning: true,
    runningWorkout: {
      workoutStartTime: new Date().getTime(),
      timeLastUpdated: new Date().getTime(),
      remainingWorkout: { currIdx: 0, currSet: 1 },
      currWorkout: exercise,
      timer: {
        isTimer: false,
        timerStart: null,
      },
    },
  }
  dispatch(updateWorkout(data))
  dispatch(setWorkoutFinished(false))
}

const incCurrWorkoutStats = (
  currWorkoutStats,
  incSets,
  incReps,
  exerciseID
) => {
  const workoutStats = currWorkoutStats
    ? currWorkoutStats
    : {
        totalStats: {
          totalReps: 0,
          totalSets: 0,
        },
        exerciseStats: [],
      }

  if (
    workoutStats.exerciseStats.findIndex(
      exercise => exercise.exerciseID === exerciseID
    ) === -1
  ) {
    workoutStats.exerciseStats.push({ exerciseID, totalReps: 0, totalSets: 0 })
  }
  console.log(
    workoutStats,
    workoutStats.totalStats,
    workoutStats.totalStats.totalSets
  )
  console.log(workoutStats.exerciseStats)
  if (incSets) {
    workoutStats.totalStats.totalSets += 1
    const exerciseStatsIdx = workoutStats.exerciseStats.findIndex(
      exercise => exercise.exerciseID === exerciseID
    )
    console.log(exerciseStatsIdx)
    workoutStats.exerciseStats[exerciseStatsIdx].totalSets += 1
  }
  if (incReps) {
    workoutStats.totalStats.totalReps += incReps
    const exerciseStatsIdx = workoutStats.exerciseStats.findIndex(
      exercise => exercise.exerciseID === exerciseID
    )
    workoutStats.exerciseStats[exerciseStatsIdx].totalReps += incReps
  }
  return workoutStats
}

export const completeSet =
  (currSetTotal, completedReps, exerciseID, lastSetFailed) =>
  async (dispatch, getState) => {
    const runningWorkout = getState().workout.workoutData.runningWorkout
    const currSet = runningWorkout.remainingWorkout.currSet
    const currIdx = runningWorkout.remainingWorkout.currIdx

    const currWorkoutPathLength = runningWorkout.currWorkout.path.length
    // If the current set is the last set
    // Else start rest timer, increment set, and updateWorkout
    if (currSet === currSetTotal) {
      // If the last set of the last exercise is finished then call finishWorkout
      // Else begin next rest timer, increment currSet and currIdx, and updateWorkout
      if (currIdx >= currWorkoutPathLength - 1) {
        dispatch(finishWorkout())
      } else {
        const startTime = new Date().getTime()
        const nextIdx = currIdx + 1
        const nextSet = 1

        const workoutStats = incCurrWorkoutStats(
          getState().workout.workoutData.workoutStats,
          true,
          completedReps,
          exerciseID
        )
        const updatedData = {
          'runningWorkout.remainingWorkout.currIdx': nextIdx,
          'runningWorkout.remainingWorkout.currSet': nextSet,
          'runningWorkout.timer.isTimer': true,
          'runningWorkout.timer.timerStart': startTime,
          'runningWorkout.currWorkout.lastSetFailed': false,
          workoutStats,
        }

        dispatch(updateWorkout(updatedData))
      }
    } else {
      const startTime = new Date().getTime()
      const nextSet = currSet + 1

      console.log()

      const workoutStats = incCurrWorkoutStats(
        getState().workout.workoutData.workoutStats,
        true,
        completedReps,
        exerciseID
      )
      const updatedData = {
        'runningWorkout.remainingWorkout.currSet': nextSet,
        'runningWorkout.timer.isTimer': true,
        'runningWorkout.timer.timerStart': startTime,
        'runningWorkout.currWorkout.lastSetFailed': lastSetFailed || false,
        workoutStats,
      }
      dispatch(updateWorkout(updatedData))
    }
  }

export const failSet =
  (newWeight, exerciseID, currSetTotal, completedReps) =>
  async (dispatch, getState) => {
    const weights = getState().workout.workoutData.weights

    const modWeights = weights.map(weight => {
      console.log(weight.exerciseID, exerciseID)
      if (weight.exerciseID === exerciseID) {
        return { ...weight, weight: newWeight }
      }
      return weight
    })
    console.log(newWeight, modWeights)
    await dispatch(completeSet(currSetTotal, completedReps, true))
    await dispatch(
      updateWorkout({
        weights: modWeights,
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
export const finishWorkout = () => async (dispatch, getState) => {
  const workoutData = getState().workout.workoutData
  const weights = getState().workout.workoutData.weights
  const updatedWeights = await updateWeights(
    weights,
    workoutData.runningWorkout.currWorkout.path
  )

  const updatedData = {
    isWorkoutRunning: false,
    weights: updatedWeights,
  }

  dispatch(updateWorkout(updatedData))
  dispatch(setWorkoutFinished(true))
}
