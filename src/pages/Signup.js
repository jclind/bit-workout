import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Outlet,
  Navigate,
} from 'react-router-dom'
import signupBackground from '../assets/images/signup-background.png'
import '../assets/styles/pages/signup.scss'

const Signup = () => {
  const location = useLocation()

  if (location.pathname === '/signup') {
    return <Navigate to='/signup/account-info' />
  }

  return (
    <>
      <img src={signupBackground} className='signup-background' />
      <h1 className='title'>Sign Up</h1>

      <Outlet />
    </>
  )
}

export default Signup
