import {
  FETCH_USER_ACCOUNT_DATA,
  SET_USER_STATUS_SIGNED_IN,
  SET_USER_STATUS_SIGNED_OUT,
} from '../../types'
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../../firebase'
import { auth } from '../../../firebase'
import { exerciseList } from '../../../assets/data/exerciseList'
import { calculateWeight } from '../../../util/calculateWeight'

export const signInAndFetchUserAccountData = user => async dispatch => {
  const uid = user.uid

  dispatch(setUserStatusSignedIn(user))

  dispatch(fetchUserData(uid))
}

export const setUserStatusSignedIn = user => {
  return {
    type: SET_USER_STATUS_SIGNED_IN,
    payload: user,
  }
}
export const setUserStatusSignedOut = () => {
  return {
    type: SET_USER_STATUS_SIGNED_OUT,
  }
}

export const fetchUserData = uid => async dispatch => {
  let userAccountData

  const userRef = doc(db, 'users', uid)
  await getDoc(userRef).then(doc => {
    userAccountData = doc.data()
  })

  dispatch({
    type: FETCH_USER_ACCOUNT_DATA,
    payload: userAccountData,
  })
}

export const setWorkout = (weight, gender, uid) => async dispatch => {
  const weights = exerciseList.map(ex => {
    const id = ex.id
    console.log(id, weight, gender)
    return { exerciseID: id, weight: calculateWeight(id, weight, gender) }
  })

  // Set current user workout data with prop name of current user id
  await setDoc(doc(db, 'workoutData', uid), {
    weights,
    isWorkoutRunning: false,
    runningWorkout: {},
  })
}
export const signup = (email, password, userData) => async dispatch => {
  await auth.createUserWithEmailAndPassword(email, password).then(cred => {
    const uid = cred.user.uid
    const username = userData.usernameVal

    console.log(userData)
    const weight = userData.weightVal
    const gender = userData.genderVal

    dispatch(addNewUsername(username, uid))
    dispatch(saveUserAccountData(uid, userData))
    dispatch(setWorkout(weight, gender, uid)) // Set workout data on initial signup
  })
}

export const saveUserAccountData = (uid, userData) => async () => {
  const {
    usernameVal,
    fullNameVal,
    genderVal,
    birthdayVal,
    heightVal,
    weightVal,
  } = userData

  setDoc(doc(db, 'users', uid), {
    username: usernameVal,
    name: fullNameVal,
    gender: genderVal,
    birthday: birthdayVal,
    height: heightVal,
    weight: weightVal,
  })
}
export const updateUserAccountData = data => async (dispatch, getState) => {
  const { prop, val } = data
  const uid = auth.currentUser.uid

  const currUserAccountData = {
    ...getState().auth.userAccountData,
    [prop]: val,
  }
  const currUsername = getState().auth.userAccountData.username

  const userRef = doc(db, 'users', uid)
  await updateDoc(userRef, {
    [prop]: val,
  }).then(() => {
    dispatch(saveUserAccountData(uid, currUserAccountData))
  })
  if (prop === 'username') {
    const usernameRef = doc(db, 'usernames', currUsername)

    await getDoc(usernameRef).then(document => {
      addNewUsername(val, uid).then(() => {
        if (document && document.exists()) {
          deleteDoc(doc(db, 'usernames', currUsername))
        }
      })
    })
  }
}

export const addNewUsername = (username, uid) => async () => {
  await setDoc(doc(db, 'usernames', username), {
    uid,
  })
}

export const login = (email, password) => async () => {
  auth.signInWithEmailAndPassword(email, password)
}
export const logout = () => async () => {
  await auth.signOut()
}

export const resetPassword = email => async () => {
  auth.sendPasswordResetEmail(email)
}

export const updateEmail = email => async () => {
  auth.currentUser.updateEmail(email)
}

function reauthenticate(currPassword) {
  const user = auth.currentUser
  const credential = auth.EmailAuthProvider.credential(user.email, currPassword)
  return user.reauthenticateWithCredential(credential)
}
export const updatePassword = (oldPassword, newPassword) => async () => {
  await reauthenticate(oldPassword)
  await auth.currentUser.updatePassword(newPassword)
}
