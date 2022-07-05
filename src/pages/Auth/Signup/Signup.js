import React from 'react'
import { useLocation, useOutlet, Navigate } from 'react-router-dom'
import './Signup.scss'
import { connect } from 'react-redux'

export const SignupContext = React.createContext({})

const Signup = ({ isSignedIn }) => {
  const location = useLocation()

  const outlet = useOutlet()

  if (isSignedIn) {
    return <Navigate to='/' />
  }
  if (location.pathname === '/signup') {
    return <Navigate to='/signup/gender' />
  }

  const saveSignupData = (key, value) => {
    const currSignupData = JSON.parse(localStorage.getItem('signup')) || {}

    currSignupData[key] = value
    localStorage.setItem('signup', JSON.stringify(currSignupData))
  }

  const value = {
    saveSignupData,
  }

  return (
    <SignupContext.Provider value={value} className='signup-container'>
      {outlet}
    </SignupContext.Provider>
  )
}
const mapStateToProps = state => {
  let isSignedIn = false
  if (state.auth && state.auth.userAuth && state.auth.userAuth.uid) {
    isSignedIn = true
  }

  return {
    isSignedIn: isSignedIn,
  }
}

export default connect(mapStateToProps)(Signup)
