import { SIGN_IN, SIGN_OUT, GET_USER_ACCOUNT_DATA } from '../../types'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase'

export const signIn = user => {
  return {
    type: SIGN_IN,
    payload: user,
  }
}
export const signOut = () => {
  return {
    type: SIGN_OUT,
  }
}

export const getUserData = uid => async dispatch => {
  let userAccountData

  const userRef = doc(db, 'users', uid)
  await getDoc(userRef).then(doc => {
    userAccountData = doc.data()
  })

  dispatch({
    type: GET_USER_ACCOUNT_DATA,
    payload: userAccountData,
  })
}
