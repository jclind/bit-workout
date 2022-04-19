import {
  SIGN_IN,
  SIGN_OUT,
  FETCH_USER_ACCOUNT_DATA,
  SET_USER_STATUS_SIGNED_IN,
  SET_USER_STATUS_SIGNED_OUT,
} from '../types'

const INITIAL_STATE = {
  userAuth: null,
  userAccountData: null,
}

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER_STATUS_SIGNED_IN:
      return { ...state, userAuth: action.payload }
    case SET_USER_STATUS_SIGNED_OUT:
      return { ...state, userAuth: null, userAccountData: null }
    case FETCH_USER_ACCOUNT_DATA:
      return { ...state, userAccountData: action.payload }
    default:
      return state
  }
}
export default authReducer
