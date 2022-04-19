import { FETCH_WORKOUT_DATA, SET_WORKOUT_DATA, COMPLETE_SET } from '../types'

const INITIAL_STATE = {
  workoutData: null,
  isWorkoutFinished: null,
}

const workoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_WORKOUT_DATA:
      console.log(action.payload)
      return { ...state, workoutData: action.payload }
    case SET_WORKOUT_DATA:
      return {
        ...state,
        workoutData: { ...state.workoutData, ...action.payload },
      }

    case COMPLETE_SET:
      return {
        ...state,
      }
    default:
      return state
  }
}

export default workoutReducer
