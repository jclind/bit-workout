import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../firebase'
import { getDoc, doc, setDoc } from 'firebase/firestore'

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

  // useEffect(() => {
  //   async function stateChange() {
  //     auth.onAuthStateChanged(user => {
  //     setCurrentUser(user)
  //     console.log('effect canged', user)
  //     console.log(loading)
  //     const uid = user && user.uid
  //     console.log(uid)
  //        if (uid) {
  //       const userRef = doc(db, 'users', uid)
  //       async function stateChange()
  //     }
  //   })
  // }, [])

  async function getUserData(user) {
    let userData

    const userRef = doc(db, 'users', user.uid)
    await getDoc(userRef).then(doc => {
      userData = doc.data()
    })
    return userData
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('logged in')
      } else {
        console.log('logged out')
      }
      setCurrentUser(user)
      setLoading(false)
    })

    return () => unsubscribe()

    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   console.log('am I here?')
    //   setUser(user)
    // })
    // return unsubscribe
    // async function stateChange() {
    //   auth.onAuthStateChanged(user => {
    //     setCurrentUser(user)
    //     console.log('effect canged', user)
    //     console.log(loading)
    //     const uid = user && user.uid
    //     console.log(uid)
    //     if (uid) {
    //       const userRef = doc(db, 'users', uid)
    //       return getDoc(userRef).then(doc => {
    //         setCurrUserData(doc.data())
    //         setLoading(false)
    //         console.log('currUserData', currUserData)
    //         setLoading(false)
    //       })
    //     } else {
    //       setCurrUserData(null)
    //       setLoading(false)
    //     }
    //   })
    // }

    // stateChange()
  }, [])

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
  }
  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading....</div> : children}
    </AuthContext.Provider>
  )
}
