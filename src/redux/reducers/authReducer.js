import { SIGN_IN, SIGN_OUT, GET_USER_ACCOUNT_DATA } from '../types'

const INITIAL_STATE = {
  userAuth: null,
  userAccountData: null,
}

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      console.log(action.payload)
      return { ...state, user: action.payload }
    case SIGN_OUT:
      return { ...state, user: null }
    case GET_USER_ACCOUNT_DATA:
    default:
      return state
  }
}
export default authReducer
