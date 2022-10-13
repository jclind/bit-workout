import {
  SET_TOTAL_USER_STATS,
  SET_STATS_STATUS,
  SET_EXERCISE_STATS,
} from '../types'

const INITIAL_STATE = {
  status: 'unloaded',
  totalUserStats: null,
  exerciseStats: null,
}

const characterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOTAL_USER_STATS:
      return { ...state, totalUserStats: action.payload }
    case SET_EXERCISE_STATS:
      return { ...state, exerciseStats: action.payload }
    case SET_STATS_STATUS:
      return { ...state, status: action.payload }
    default:
      return state
  }
}

export default characterReducer
