import {
  FETCH_USER_ACCOUNT_DATA,
  SET_USER_STATUS_SIGNED_IN,
  SET_USER_STATUS_SIGNED_OUT,
  SET_USER_ACCOUNT_DATA,
} from '../../types'
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from 'firebase/firestore'
import { db } from '../../../firebase'
import { auth } from '../../../firebase'
import { exerciseList } from '../../../assets/data/exerciseList'
import { calculateWeight } from '../../../util/calculateWeight'
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
  // GoogleAuthProvider,
  // signInWithPopup,
  // getAdditionalUserInfo,
} from 'firebase/auth'
import { fetchCharacterData, updateCoins } from '../character/character'

export const signInAndFetchUserAccountData =
  user => async (dispatch, getState) => {
    const uid = user.uid

    await dispatch(setUserStatusSignedIn(user))

    await dispatch(fetchUserData(uid))
    await dispatch(fetchCharacterData(uid))

    // Migrating email to be used from userAccountData instead of user auth.
    // If email doesn't exists in userAccountData, add the current user's email
    const userAccountData = getState().auth.userAccountData
    if (userAccountData && !userAccountData.email) {
      const email = getState().auth.userAuth.email

      await dispatch(updateUserAccountData({ prop: 'email', val: email }))
    }
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
    return { exerciseID: id, weight: calculateWeight(id, weight, gender) }
  })

  // Set current user workout data with prop name of current user id
  await setDoc(doc(db, 'workoutData', uid), {
    weights,
    isWorkoutRunning: false,
    runningWorkout: {},
  })
}
export const signup = (uid, userData) => async dispatch => {
  const username = userData.username

  const weight = userData.weight
  const gender = userData.gender

  addNewUsername(username, uid)
  dispatch(setUserAccountData(uid, userData))
  dispatch(setWorkout(weight, gender, uid)) // Set workout data on initial signup
}
export const signupWithEmail =
  (email, password, userData) => async dispatch => {
    await createUserWithEmailAndPassword(auth, email, password).then(cred => {
      const uid = cred.user.uid
      return dispatch(signup(uid, userData))
    })
  }
// export const signupWithGoogle = userData => async dispatch => {
//   const provider = new GoogleAuthProvider()

//   await signInWithPopup(auth, provider).then(cred => {
//     const isNewUser = getAdditionalUserInfo(cred).isNewUser

//     // if (isNewUser) {
//     // await setUserStatusSignedOut()
//     // dispatch({ type: SET_USER_ACCOUNT_DATA, payload: { isNewUser: true } })
//     // window.location = '/signup'
//     // } else if (!userData) {
//     //   signInAndFetchUserAccountData(cred.user)
//     // } else {
//     //   const uid = cred.user.uid
//     //   const name = cred.user.displayName
//     //   const email = cred.user.email
//     //   const newUserData = { ...userData, name, email }
//     // }
//   })
// .then(cred => {

//   return dispatch({ type: SET_USER_ACCOUNT_DATA, payload: { isNewUser: true } })
//   // return dispatch(signup(uid, newUserData))
//   // })
// }

export const setUserAccountData = (uid, userData) => async () => {
  const {
    email,
    name,
    birthday,
    gender,
    height,
    username,
    weight,
    barbellWeight,
  } = userData

  setDoc(doc(db, 'users', uid), {
    username,
    name,
    gender,
    birthday,
    height,
    weight: [{ weight, date: new Date().getTime() }],
    email,
    barbellWeight,
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
    // dispatch(setUserAccountData(uid, currUserAccountData))
    dispatch({ type: SET_USER_ACCOUNT_DATA, payload: currUserAccountData })
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

export const addNewUsername = async (username, uid) => {
  await setDoc(doc(db, 'usernames', username), {
    uid,
  })
}
export const checkUsernameAvailability = async (username, setLoading) => {
  if (setLoading) {
    setLoading(true)
  }

  const usernameRef = doc(db, 'usernames', username)
  const usernameSnap = await getDoc(usernameRef)

  if (usernameSnap.exists()) {
    return false
  }
  return true
}

export const login = (email, password) => async () => {
  let error = null
  await signInWithEmailAndPassword(auth, email, password).catch(err => {
    error = err
  })
  return error
}

export const demoLogin = () => async dispatch => {
  let error = null

  const generatedString = Math.random().toString(36).slice(2)
  const email = `demo-${generatedString}@bitworkout.com`
  const password = generatedString

  const userData = {
    email,
    name: 'Demo User',
    birthday: '2000-01-01',
    gender: 'male',
    height: { feet: '5', inches: '9' },
    username: generatedString,
    weight: 160,
    barbellWeight: 45,
  }

  await createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
      const uid = cred.user.uid
      return dispatch(signup(uid, userData))
    })
    .catch(err => {
      console.log(err)
      error = err
    })

  return error
}

export const logout = () => async () => {
  await auth.signOut()
}

export const resetPassword = email => async () => {
  let error = null
  await sendPasswordResetEmail(auth, email).catch(err => {
    error = err
  })
  return error
}

export const handleUpdateEmail = (newEmail, password) => async dispatch => {
  await reauthenticate(password).catch(err => {
    console.log(err)
    // !ERROR
  })
  await updateEmail(auth.currentUser, newEmail)
  dispatch(updateUserAccountData({ prop: 'email', val: newEmail }))
}

async function reauthenticate(currPassword) {
  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    currPassword
  )
  await reauthenticateWithCredential(auth.currentUser, credential)
}
export const handleUpdatePassword = (oldPassword, newPassword) => async () => {
  await reauthenticate(oldPassword)
  await updatePassword(auth.currentUser, newPassword)
}

export const addWeight = weightData => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid

  const currUserAccountData = {
    ...getState().auth.userAccountData,
    weight: [...getState().auth.userAccountData.weight, weightData],
  }

  const userRef = doc(db, 'users', uid)
  let error = null
  await updateDoc(userRef, {
    weight: arrayUnion(weightData),
  })
    .then(() => {
      dispatch({ type: SET_USER_ACCOUNT_DATA, payload: currUserAccountData })
    })
    .catch(err => {
      error = err
    })

  return error
}

// Add Feedback to user account
export const submitUserFeedback =
  (category, title, description) => async (dispatch, getState) => {
    const uid = getState().auth.userAuth.uid
    const date = new Date().toISOString().substring(0, 10)

    const userDataRef = doc(db, 'users', uid)
    const userFeedbackRef = collection(userDataRef, 'feedback')

    const q = query(userFeedbackRef, where('date', '==', date))
    const querySnapshot = await getDocs(q).catch(err => console.log(err))
    const feedbackSubmittedToday = []
    querySnapshot.forEach(doc => {
      feedbackSubmittedToday.push(doc.data())
    })

    await addDoc(userFeedbackRef, {
      date,
      category,
      title,
      description,
    })

    let coinsAdded = 0

    // Only give user coins for every 2 feedback forms they submit per day
    if (feedbackSubmittedToday.length === 0) {
      coinsAdded = 10
      dispatch(updateCoins(coinsAdded))
    } else if (feedbackSubmittedToday.length === 1) {
      coinsAdded = 5
      dispatch(updateCoins(coinsAdded))
    }

    return coinsAdded
  }

export const setAccountStats = data => async dispatch => {
  console.log('test')
  dispatch(updateUserAccountData({ prop: 'accountStats', val: data }))
}
