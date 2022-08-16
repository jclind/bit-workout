import { combineReducers } from 'redux'
import authReducer from './authReducer'
import workoutReducer from './workoutReducer'
import characterReducer from './characterReducer'

const appReducer = combineReducers({
  auth: authReducer,
  workout: workoutReducer,
  character: characterReducer,
})

const rootReducer = (state, action) => {
  if (action.type === 'SET_USER_STATUS_SIGNED_OUT') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export default rootReducer
