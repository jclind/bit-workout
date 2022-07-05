import React from 'react'
import bitWorkoutLogo from '../../../assets/images/bit-workout-logo.png'
import loginIMG from '../../../assets/images/login-background.png'
import './AuthLandingPage.scss'

const AuthLandingPage = () => {
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
        <button className='signup'>Get Started</button>
        <button className='login'>Log In</button>
      </div>
    </div>
  )
}

export default AuthLandingPage
