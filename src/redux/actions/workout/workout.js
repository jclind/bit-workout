import { FETCH_WORKOUT_DATA, SET_WORKOUT_DATA } from '../../types'
import { db } from '../../../firebase'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { exerciseList } from '../../../assets/data/exerciseList'

export const fetchWorkoutData = uid => async dispatch => {
  await getDoc(doc(db, 'workoutData', uid)).then(document => {
    const workoutData = document.data()
    dispatch({ type: FETCH_WORKOUT_DATA, payload: workoutData })
  })
}

// export const setWorkoutData = (data, uid) => async dispatch => {hange js
//   const workoutRef = doc(db, 'workoutData', uid)
//   await updateDoc(workoutRef, {
//     ...data,
//   })
// }
export const updateWorkout = (data, uid) => async dispatch => {
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

export const completeSet =
  (currSetTotal, uid) => async (dispatch, getState) => {
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
        console.log(
          'FIX ME IN COMPLETE_SET WORKOUTREDUCER: Calling workoutFinished()'
        )
        dispatch(finishWorkout(uid))
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

        dispatch(updateWorkout(updatedData, uid))
      }
    } else {
      const startTime = new Date().getTime()
      const nextSet = currSet + 1

      const updatedData = {
        'runningWorkout.remainingWorkout.currSet': nextSet,
        'runningWorkout.timer.isTimer': true,
        'runningWorkout.timer.timerStart': startTime,
      }
      dispatch(updateWorkout(updatedData, uid))
    }
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
export const finishWorkout = uid => async (dispatch, getState) => {
  const workoutData = getState().workout.workoutData
  const updatedWeights = updateWeights(
    workoutData.weights,
    workoutData.runningWorkout.currWorkout.path
  )

  const updatedData = {
    isWorkoutRunning: false,
    weights: updatedWeights,
  }

  dispatch(updateWorkout(updatedData, uid))
}
