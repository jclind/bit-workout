import { FETCH_WORKOUT_DATA, SET_WORKOUT_DATA, COMPLETE_SET } from '../../types'
import { db } from '../../../firebase'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { exerciseList } from '../../../assets/data/exerciseList'
import { calculateWeight } from '../../../util/calculateWeight'

export const fetchWorkoutData = uid => async dispatch => {
  console.log(uid)
  await getDoc(doc(db, 'workoutData', uid)).then(document => {
    const workoutData = document.data()
    dispatch({ type: FETCH_WORKOUT_DATA, payload: workoutData })
  })
}

export const setWorkoutData = (data, uid) => async dispatch => {
  const workoutRef = doc(db, 'workoutData', uid)
  await updateDoc(workoutRef, {
    ...data,
  })
  dispatch({ type: SET_WORKOUT_DATA, payload: data })
}
export const updateWorkout = (data, uid) => async dispatch => {
  const workoutRef = doc(db, 'workoutData', uid)
  await updateDoc(workoutRef, {
    ...data,
  })
    .then(() => {
      dispatch(setWorkoutData(data, uid))
    })
    .catch(err => {
      console.log(err)
    })
}

export const getSingleWorkout = id => (dispatch, getState) => {
  const weights = getState().workout.workoutData.weights
  const workoutData = getState().workout.workoutData

  const currExercise = exerciseList.find(ex => ex.id === id)
  const exerciseWeight = weights.find(ex => ex.exerciseID === id)
  const currWorkoutData = workoutData.runningWorkout.currWorkout.path.find(
    ex => ex.exerciseID === id
  )

  return {
    ...currExercise,
    exerciseWeight: exerciseWeight.weight,
    currWorkoutData,
  }
}
export const startWorkout = (exercise, uid) => async dispatch => {
  const data = {
    isWorkoutRunning: true,
    runningWorkout: {
      remainingWorkout: { currIdx: 0, currSet: 1 },
      currWorkout: exercise,
      timer: {
        isTimer: false,
        timerStart: null,
      },
    },
  }
  dispatch(updateWorkout(data, uid))
}

export const completeSet = currSetTotal => async (dispatch, getState) => {
  const runningWorkout = getState().workoutData.runningWorkout
  const currSet = runningWorkout.remainingWorkout.currSet
  const currIdx = runningWorkout.remainingWorkout.currIdx

  const currWorkoutPathLength = runningWorkout.currWorkout.path.length

  // If the current set is the last set
  // Else start rest timer, increment set, and updateWorkout
  if (currSet === currSetTotal) {
    // If the last set of the last exercise is finished then call finishWorkout
    // Else begin next rest timer, increment currSet and currIdx, and updateWorkout
    if (currIdx >= currWorkoutPathLength - 1) {
      console.log(
        'FIX ME IN COMPLETE_SET WORKOUTREDUCER: Calling workoutFinished()'
      )
    } else {
      const startTime = new Date().getTime()
      const nextIdx = currIdx + 1
      const nextSet = 1

      const updatedData = {
        'runningWorkout.remainingWorkout.currIdx': nextIdx,
        'runningWorkout.remainingWorkout.currSet': nextSet,
        'runningWorkout.timer.isTimer': true,
        'runningWorkout.timer.timerStart': startTime,
      }

      dispatch(updateWorkout(updatedData))
    }
  } else {
    const startTime = new Date().getTime()
    const nextSet = currSet + 1

    const updatedData = {
      'runningWorkout.remainingWorkout.currSet': nextSet,
      'runningWorkout.timer.isTimer': true,
      'runningWorkout.timer.timerStart': startTime,
    }
    dispatch(updateWorkout(updatedData))
  }
}
