import React from 'react'
import PageIndicator from '../PageIndicator/PageIndicator'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import { FcGoogle } from 'react-icons/fc'
import './SignupSelection.scss'
import { useNavigate } from 'react-router-dom'

const SignupSelection = () => {
  const navigate = useNavigate()

  return (
    <div className='signup-page signup-selection'>
      <PageIndicator currPage={8} />
      <BackButton />
      <div className='title'>Last Step!</div>
      <p className='description'>
        Sign up to save your data and start your new exercise journey!
      </p>
      <div className='signup-options'>
        <button className='google-signup'>
          <FcGoogle className='icon' /> Continue With Google
        </button>
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

export default SignupSelection
