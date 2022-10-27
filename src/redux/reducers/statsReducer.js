import {
  SET_TOTAL_USER_STATS,
  SET_STATS_STATUS,
  SET_EXERCISE_STATS,
  SET_COMPLETED_ACHIEVEMENTS,
} from '../types'

const INITIAL_STATE = {
  status: 'unloaded',
  totalUserStats: null,
  exerciseStats: null,
  completedAchievements: null,
}

const characterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOTAL_USER_STATS:
      return { ...state, totalUserStats: action.payload }
    case SET_EXERCISE_STATS:
      return { ...state, exerciseStats: action.payload }
    case SET_STATS_STATUS:
      return { ...state, status: action.payload }
    case SET_COMPLETED_ACHIEVEMENTS:
      return { ...state, completedAchievements: action.payload }
    default:
      return state
  }
}

export default characterReducer
