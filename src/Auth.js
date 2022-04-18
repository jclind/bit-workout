import React, { useEffect, useState } from 'react'
import { auth } from './firebase'
import { connect } from 'react-redux'
import { signIn, signOut } from './redux/actions/auth/authStatus'

const Auth = ({ signIn }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('logged in')
        signIn(user)
      } else {
        console.log('logged out')
        signOut()
      }
    })
    return () => unsubscribe()
  }, [])
  return null
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: user => dispatch(signIn(user)),
    signOut: () => dispatch(signOut()),
  }
}

export default connect(null, mapDispatchToProps)(Auth)
