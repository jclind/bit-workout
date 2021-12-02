import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../firebase'
import { getDoc, doc, setDoc } from 'firebase/firestore'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [currUserData, setCurrUserData] = useState()
  const [loading, setLoading] = useState(true)

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
        email: email,
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
    setDoc(doc(db, 'usernames', username), {
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

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userRef = doc(db, 'users', user.uid)
        const userSnap = getDoc(userRef).then(doc => {
          setCurrUserData(doc.data())
          setCurrentUser(user)
          setLoading(false)
        })
      }
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    currUserData,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
