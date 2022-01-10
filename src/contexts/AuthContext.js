import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../firebase'
import { getDoc, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import firebase from 'firebase/compat/app'
import LogoutConfirm from '../components/LogoutConfirm'
import { useNavigate } from 'react-router-dom'
import { setWorkout } from './WorkoutContext'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState()
  useEffect(() => {
    if (currentUser) {
      console.log('IM HERE AT THE USEEFFECT')
      setLoading(true)
    }
  }, [currentUser])
  const [currUserData, setCurrUserData] = useState()

  const [workoutData, setWorkoutData] = useState()
  const [isWorkoutRunning, setIsWorkoutRunning] = useState(false)

  const navigate = useNavigate()

  function signup(email, password, payload) {
    const {
      usernameVal,
      fullNameVal,
      genderVal,
      birthdayVal,
      heightVal,
      weightVal,
    } = payload
    return auth.createUserWithEmailAndPassword(email, password).then(cred => {
      const uid = cred.user.uid
      addNewUsername(usernameVal, uid)
      setDoc(doc(db, 'users', uid), {
        username: usernameVal,
        name: fullNameVal,
        gender: genderVal,
        birthday: birthdayVal,
        height: heightVal,
        weight: weightVal,
      })
      setWorkout(weightVal, genderVal, uid)
    })
  }

  function addNewUsername(username, uid) {
    return setDoc(doc(db, 'usernames', username), {
      uid,
    })
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  const [workoutRunningModal, setWorkoutRunningModal] = useState(false)
  const finalLogout = () => {
    setWorkoutData(null)
    setIsWorkoutRunning(false)
    auth.signOut()
    return navigate('/login')
  }
  function logout() {
    if (isWorkoutRunning) {
      setWorkoutRunningModal(true)
    } else {
      return finalLogout()
    }
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  async function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function reauthenticate(currPassword) {
    const user = firebase.auth().currentUser
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currPassword
    )
    return user.reauthenticateWithCredential(credential)
  }

  async function updatePassword(oldPassword, password) {
    await reauthenticate(oldPassword)
    return currentUser.updatePassword(password)
  }

  async function updateUserData(data) {
    const { prop, val } = data
    const user = firebase.auth().currentUser

    const userRef = doc(db, 'users', user.uid)
    await updateDoc(userRef, {
      [prop]: val,
    })
    if (prop === 'username') {
      const currUsername = currUserData.username
      const usernameRef = doc(db, 'usernames', currUsername)

      await getDoc(usernameRef).then(document => {
        addNewUsername(val, user.uid).then(() => {
          if (document && document.exists()) {
            deleteDoc(doc(db, 'usernames', currUsername))
          }
        })
      })
    }
    currUserData[prop] = val
  }

  async function getUserData(user) {
    let userData

    const userRef = doc(db, 'users', user.uid)
    await getDoc(userRef).then(document => {
      userData = document.data()
    })
    setCurrUserData(userData)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('logged in')
        getUserData(user)
      } else {
        console.log('logged out')
        console.log('LOADING 1')
        setLoading(false)
      }
      setCurrentUser(user)
    })

    return () => unsubscribe()
  }, [])
  useEffect(() => {
    if (currentUser && currUserData) {
      console.log('LOADING 2')
      setLoading(false)
    }
  }, [currentUser, currUserData])

  const value = {
    currentUser,
    currUserData,
    getUserData,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateUserData,
    isWorkoutRunning,
    setIsWorkoutRunning,
    workoutData,
    setWorkoutData,
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div>Loading auth....</div>
      ) : (
        <>
          {workoutRunningModal && (
            <LogoutConfirm
              onClose={() => setWorkoutRunningModal(false)}
              logout={finalLogout}
            />
          )}
          <>{children}</>
        </>
      )}
    </AuthContext.Provider>
  )
}
