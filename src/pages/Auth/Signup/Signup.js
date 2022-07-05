import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useOutlet, useNavigate, Navigate } from 'react-router-dom'
import signupBackground from '../../../assets/images/signup-background.png'
import './Signup.scss'
import { connect } from 'react-redux'
import { signup } from '../../../redux/actions/auth/authStatus'
import { checkUsernameAvailability } from '../../../redux/actions/auth/authStatus'

export const SignupContext = React.createContext({})

const Signup = ({ signup, isSignedIn }) => {
  // const [usernameVal, setUsernameVal] = useState('')
  // const [usernameAvailable, setUsernameAvailable] = useState(null)
  // const [fullNameVal, setFullNameVal] = useState('')
  // const [emailVal, setEmailVal] = useState('')
  // const [passwordVal, setPasswordVal] = useState('')

  // const [genderVal, setGenderVal] = useState('female')
  // const [birthdayVal, setBirthdayVal] = useState('')
  // const [heightVal, setHeightVal] = useState({ feet: '', inches: '' })
  // const [weightVal, setWeightVal] = useState('')

  // useEffect(() => {
  //   if (usernameVal.trim().length >= 3) {
  //     checkUsernameAvailability(usernameVal).then(isAvailable => {
  //       setUsernameAvailable(isAvailable)
  //     })
  //   } else {
  //     setUsernameAvailable(null)
  //   }
  // }, [usernameVal])

  // const navigate = useNavigate()

  // async function handleSignup() {
  //   const payload = {
  //     usernameVal,
  //     fullNameVal,
  //     genderVal,
  //     birthdayVal,
  //     heightVal,
  //     weightVal,
  //     emailVal,
  //   }
  //   try {
  //     await signup(emailVal, passwordVal, payload)
  //     navigate('/')
  //   } catch (error) {
  //     console.log(error)
  //     // !ERROR
  //   }
  // }

  const location = useLocation()
  const monthRef = useRef()

  const outlet = useOutlet()

  if (location.pathname === '/signup') {
    return <Navigate to='/signup/gender' />
  }
  // // If the fields from /signup/account-info aren't all filled out
  // // then redirect back to that page
  // const signupFieldsAreFilled =
  //   usernameVal !== null &&
  //   fullNameVal !== null &&
  //   emailVal !== null &&
  //   passwordVal !== null

  if (isSignedIn) {
    return <Navigate to='/' />
  }

  // const value = {
  //   usernameVal,
  //   setUsernameVal,
  //   fullNameVal,
  //   setFullNameVal,
  //   emailVal,
  //   setEmailVal,
  //   passwordVal,
  //   setPasswordVal,
  //   handleSignup,
  //   genderVal,
  //   setGenderVal,
  //   birthdayVal,
  //   setBirthdayVal,
  //   heightVal,
  //   setHeightVal,
  //   weightVal,
  //   setWeightVal,
  //   usernameAvailable,
  // }

  const saveSignupData = (key, value) => {
    const currSignupData = JSON.parse(localStorage.getItem('signup')) || {}

    currSignupData[key] = value
    localStorage.setItem('signup', JSON.stringify(currSignupData))
  }

  const value = {
    monthRef,
    saveSignupData,
  }

  return (
    <SignupContext.Provider value={value} className='signup-container'>
      {/* <img
        src={signupBackground}
        alt='signup background'
        className='signup-background'
      />
      <h1 className='signup-title'>Sign Up</h1> */}
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
const mapDispatchToProps = dispatch => {
  return {
    signup: (email, password, userData) =>
      dispatch(signup(email, password, userData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
