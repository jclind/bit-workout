import {
  FETCH_WORKOUT_DATA,
  SET_COMPLETED_WORKOUT_DATA,
  SET_WORKOUT_DATA,
  SET_WORKOUT_FINISHED,
} from '../types'

const INITIAL_STATE = {
  workoutData: null,
  isWorkoutFinished: null,
}

const setToValue = (obj, path, value) => {
  let i
  path = path.split('.')
  for (i = 0; i < path.length - 1; i++) obj = obj[path[i]]

  obj[path[i]] = value
}

const workoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_WORKOUT_DATA:
      return { ...state, workoutData: action.payload }
    case SET_WORKOUT_DATA:
      const newState = JSON.parse(JSON.stringify(state.workoutData))
      console.log(action.payload, newState)
      // Destructure dot passed dot object notation properties into a useable object
      Object.keys(action.payload).map(key => {
        const currVal = action.payload[key]
        return setToValue(newState, key, currVal)
      })
      console.log(action.payload)
      return {
        ...state,
        workoutData: { ...newState },
      }
    case SET_WORKOUT_FINISHED:
      console.log(state, action.payload)
      return { ...state, isWorkoutFinished: action.payload }
    case SET_COMPLETED_WORKOUT_DATA:
      return { ...state, completedWorkoutData: { ...action.payload } }
    default:
      return state
  }
}

export default workoutReducer
