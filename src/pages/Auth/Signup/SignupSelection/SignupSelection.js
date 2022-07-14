import React, { useState } from 'react'
import PageIndicator from '../PageIndicator/PageIndicator'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
// import { FcGoogle } from 'react-icons/fc'
import { AiOutlineWarning } from 'react-icons/ai'
import './SignupSelection.scss'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
// import { signupWithGoogle } from '../../../../redux/actions/auth/authStatus'

const SignupSelection = ({ signupWithGoogle }) => {
  const navigate = useNavigate()

  const [error, setError] = useState('')

  // const handleGoogleSignup = async () => {
  //   setError('')
  //   const savedSignupData = JSON.parse(localStorage.getItem('signup'))

  //   const { barbellWeight, birthday, gender, height, username, weight } =
  //     savedSignupData

  //   const userData = {
  //     birthday,
  //     gender,
  //     height,
  //     username,
  //     weight,
  //     barbellWeight,
  //   }

  //   try {
  //     await signupWithGoogle(userData)
  //     localStorage.setItem('signup', '{}')
  //     navigate('/')
  //   } catch (error) {
  //     console.log(error)
  //     setError(error.code)
  //   }
  // }

  return (
    <div className='signup-page signup-selection'>
      <PageIndicator currPage={8} />
      <BackButton />
      <div className='title'>Last Step!</div>
      <p className='description'>
        Sign up to save your data and start your new exercise journey!
      </p>
      {error && (
        <div className='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
      <div className='signup-options'>
        {/* <button className='google-signup' onClick={handleGoogleSignup}>
          <FcGoogle className='icon' /> Continue With Google
        </button> */}
        <button
          className='email-signup'
          onClick={() => navigate('/signup/email-signup')}
        >
          Continue With Email
        </button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    // signupWithGoogle: userData => dispatch(signupWithGoogle(userData)),
  }
}

export default connect(null, mapDispatchToProps)(SignupSelection)
