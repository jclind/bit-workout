import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import bitWorkoutLogo from '../../../assets/images/bit-workout-logo.png'
import loginIMG from '../../../assets/images/login-background.png'
import { demoLogin } from '../../../redux/actions/auth/authStatus'
import { connect } from 'react-redux'
import { TailSpin } from 'react-loader-spinner'
import './AuthLandingPage.scss'

const AuthLandingPage = ({ demoLogin, isSignedIn }) => {
  const navigate = useNavigate()

  const [isDemoLoginLoading, setIsDemoLoginLoading] = useState(false)

  const handleDemoLoginClick = async () => {
    setIsDemoLoginLoading(true)
    await demoLogin()
    setIsDemoLoginLoading(false)
  }

  if (isSignedIn) {
    return <Navigate to='/' />
  }

  return (
    <div className='auth-landing-page signup-page'>
      <img src={loginIMG} alt='login background' className='background-img' />
      <div className='logo-image-container'>
        <img src={bitWorkoutLogo} alt='' />
      </div>
      <div className='title'>Gamify Your Health</div>
      <p className='description'>
        Create and customize your own workouts while earning coins and
        completing achievements.
      </p>
      <div className='options'>
        <button
          className='signup'
          onClick={() => navigate('/signup')}
          disabled={isDemoLoginLoading}
        >
          Get Started
        </button>
        <button
          className='login'
          onClick={() => navigate('/login')}
          disabled={isDemoLoginLoading}
        >
          Log In
        </button>
        <button className='demo-login' onClick={handleDemoLoginClick}>
          {isDemoLoginLoading ? (
            <TailSpin
              height='25'
              width='25'
              color='white'
              arialLabel='loading'
              className='spinner'
            />
          ) : (
            'Demo Login'
          )}
        </button>
      </div>
    </div>
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
const mapPropsToDispatch = dispatch => {
  return {
    demoLogin: () => dispatch(demoLogin()),
  }
}
export default connect(mapStateToProps, mapPropsToDispatch)(AuthLandingPage)
