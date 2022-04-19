import { FETCH_WORKOUT_DATA, SET_WORKOUT_DATA, SET_IS_TIMER } from '../../types'
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

export const setIsTimer = isTimer => {
  return {
    type: SET_IS_TIMER,
    payload: isTimer,
  }
}
