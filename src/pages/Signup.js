import React, { useState, useEffect } from 'react'
import { useLocation, useOutlet, useNavigate, Navigate } from 'react-router-dom'
import signupBackground from '../assets/images/signup-background.png'
import '../assets/styles/pages/signup.scss'
import { useAuth } from '../contexts/AuthContext'

export const SignupContext = React.createContext({})

const Signup = () => {
  const [usernameVal, setUsernameVal] = useState('')
  const [fullNameVal, setFullNameVal] = useState('')
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')

  const [genderVal, setGenderVal] = useState('female')
  const [birthdayVal, setBirthdayVal] = useState('')
  const [heightVal, setHeightVal] = useState({ feet: '', inches: '' })
  const [weightVal, setWeightVal] = useState('')

  const navigate = useNavigate()
  const { signup } = useAuth()

  async function handleSignup(e) {
    e.preventDefault()
    const payload = {
      usernameVal,
      fullNameVal,
      genderVal,
      birthdayVal,
      heightVal,
      weightVal,
    }
    try {
      // setError('')
      // setLoading(true)
      await signup(emailVal, passwordVal, payload)
      navigate('/')
    } catch (error) {
      console.log(error)
      // setError('Failed to sign in')
    }
    // setLoading(false)
  }

  useEffect(() => {
    console.log(birthdayVal)
    console.log(new Date(birthdayVal))
  }, [birthdayVal])

  const location = useLocation()
  const outlet = useOutlet()

  if (location.pathname === '/signup') {
    return <Navigate to='/signup/account-info' />
  }
  // If the fields from /signup/account-info aren't all filled out
  // then redirect back to that page
  if (
    location.pathname === '/signup/personal-info' &&
    !(usernameVal && fullNameVal && emailVal && passwordVal)
  ) {
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
    handleSignup,
    genderVal,
    setGenderVal,
    birthdayVal,
    setBirthdayVal,
    heightVal,
    setHeightVal,
    weightVal,
    setWeightVal,
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
