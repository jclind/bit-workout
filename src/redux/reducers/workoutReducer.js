import { FETCH_WORKOUT_DATA, SET_WORKOUT_DATA } from '../types'
import _ from 'lodash'

const INITIAL_STATE = {
  workoutData: null,
  isWorkoutFinished: null,
}

const setToValue = (obj, path, value) => {
  let i
  path = path.split('.')
  for (i = 0; i < path.length - 1; i++) obj = obj[path[i]]

  console.log(value)
  obj[path[i]] = value
}

const workoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_WORKOUT_DATA:
      console.log(action.payload)
      return { ...state, workoutData: action.payload }
    case SET_WORKOUT_DATA:
      const dataObj = { ...state.workoutData }
      console.log(dataObj)
      Object.keys(action.payload).map(key => {
        console.log(key)
        const currVal = action.payload[key]
        setToValue(dataObj, key, currVal)
      })
      console.log(dataObj)
      return {
        ...state,
        workoutData: { ...state.workoutData, ...action.payload },
      }
    default:
      return state
  }
}

export default workoutReducer
