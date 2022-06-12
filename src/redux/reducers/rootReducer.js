import { combineReducers } from 'redux'
import authReducer from './authReducer'
import workoutReducer from './workoutReducer'
import characterReducer from './characterReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  workout: workoutReducer,
  character: characterReducer,
})

export default rootReducer
