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
      const userAccountData = JSON.parse(JSON.stringify(action.payload))
      return { ...state, userAccountData: { ...state, ...userAccountData } }
    default:
      return state
  }
}
export default authReducer
