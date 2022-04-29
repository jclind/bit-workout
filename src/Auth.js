import React, { useEffect, useState } from 'react'
import { auth } from './firebase'
import { connect } from 'react-redux'
import { setDoc, doc } from 'firebase/firestore'
import { db } from './firebase'
import {
  signInAndFetchUserAccountData,
  setUserStatusSignedOut,
} from './redux/actions/auth/authStatus'

const Auth = ({ signInAndFetchUserAccountData, signOut, setLoading }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('logged in')
        signInAndFetchUserAccountData(user)
      } else {
        console.log('logged out')
        signOut()
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])
  return null
}

const mapDispatchToProps = dispatch => {
  return {
    signInAndFetchUserAccountData: user =>
      dispatch(signInAndFetchUserAccountData(user)),
    signOut: () => dispatch(setUserStatusSignedOut()),
  }
}

export default connect(null, mapDispatchToProps)(Auth)
