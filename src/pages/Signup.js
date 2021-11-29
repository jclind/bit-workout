import React from 'react'
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
  const location = useLocation()
  const outlet = useOutlet()

  if (location.pathname === '/signup') {
    return <Navigate to='/signup/account-info' />
  }

  return (
    <SignupContext.Provider value={{ foo: 'bar' }}>
      <img src={signupBackground} className='signup-background' />
      <h1 className='title'>Sign Up</h1>
      {outlet}
    </SignupContext.Provider>
  )
}

export default Signup
