import { combineReducers } from 'redux'
import authReducer from './authReducer'
import workoutReducer from './workoutReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  workout: workoutReducer,
})

export default rootReducer
