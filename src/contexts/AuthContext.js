import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../firebase'
import { getDoc, doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import firebase from 'firebase/compat/app'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState()
  const [currUserData, setCurrUserData] = useState()

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
      return setDoc(doc(db, 'users', uid), {
        username: usernameVal,
        name: fullNameVal,
        gender: genderVal,
        birthday: birthdayVal,
        height: heightVal,
        weight: weightVal,
      })
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

  function logout() {
    return auth.signOut()
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
    await getDoc(userRef).then(doc => {
      userData = doc.data()
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
      }
      setCurrentUser(user)
    })

    return () => unsubscribe()
  }, [])
  useEffect(() => {
    if (currentUser && currUserData) {
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
  }
  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading....</div> : children}
    </AuthContext.Provider>
  )
}
