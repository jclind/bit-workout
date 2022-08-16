import {
  FETCH_USER_ACCOUNT_DATA,
  SET_USER_STATUS_SIGNED_IN,
  SET_USER_STATUS_SIGNED_OUT,
  SET_USER_ACCOUNT_DATA,
} from '../types'

const INITIAL_STATE = {
  userAuth: null,
  userAccountData: null,
}

const setToValue = (obj, path, value) => {
  let i
  path = path.split('.')
  for (i = 0; i < path.length - 1; i++) obj = obj[path[i]]

  obj[path[i]] = value
}

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_STATUS_SIGNED_IN:
      const userAuth = JSON.parse(JSON.stringify(action.payload))
      return { ...state, userAuth }
    case SET_USER_STATUS_SIGNED_OUT:
      return { ...state, userAuth: null, userAccountData: null }
    case FETCH_USER_ACCOUNT_DATA:
      return { ...state, userAccountData: action.payload }
    case SET_USER_ACCOUNT_DATA:
      const newState = JSON.parse(JSON.stringify(state.userAccountData))
      // Destructure dot passed dot object notation properties into a useable object
      Object.keys(action.payload).map(key => {
        const currVal = action.payload[key]
        return setToValue(newState, key, currVal)
      })
      return { ...state, userAccountData: { ...newState } }
    default:
      return state
  }
}
export default authReducer
