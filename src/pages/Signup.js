import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useOutlet,
  Navigate,
} from 'react-router-dom'
import signupBackground from '../assets/images/signup-background.png'
import '../assets/styles/pages/signup.scss'

export const SignupContext = React.createContext({})

const Signup = () => {
  const [usernameVal, setUsernameVal] = useState('')
  const [fullNameVal, setFullNameVal] = useState('')
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')

  const location = useLocation()
  const outlet = useOutlet()

  if (location.pathname === '/signup') {
    return <Navigate to='/signup/account-info' />
  }

  const value = {
    usernameVal,
    setUsernameVal,
    fullNameVal,
    setFullNameVal,
    emailVal,
    setEmailVal,
    passwordVal,
    setPasswordVal,
  }

  return (
    <SignupContext.Provider value={value}>
      <img src={signupBackground} className='signup-background' />
      <h1 className='title'>Sign Up</h1>
      {outlet}
    </SignupContext.Provider>
  )
}

export default Signup
