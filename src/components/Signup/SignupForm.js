import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/styles/components/signup.scss'
import signupBackground from '../../assets/images/signup-background.png'
import usernameIcon from '../../assets/images/icons/username.svg'
import accountIcon from '../../assets/images/icons/account.svg'
import emailIcon from '../../assets/images/icons/email.svg'
import passwordIcon from '../../assets/images/icons/password.svg'
import FormInput from '../FormInput'

const SignupForm = ({
  handleSubmit,
  loading,
  error,
  emailRef,
  passwordRef,
  currentUser,
}) => {
  return (
    <>
      <img src={signupBackground} className='signup-background' />
      <h1 className='title'>Sign Up</h1>
      <div className='content'>
        <form action='' autoComplete='none' onSubmit={handleSubmit}>
          <div className='inputs'>
            <FormInput
              icon={usernameIcon}
              placeholder={'username'}
              inputType={'text'}
              required={true}
            />
            <FormInput
              icon={accountIcon}
              placeholder={'full name'}
              inputType={'name'}
              required={true}
            />
            <FormInput
              icon={emailIcon}
              placeholder={'email'}
              inputType={'email'}
              required={true}
            />
            <FormInput
              icon={passwordIcon}
              placeholder={'password'}
              inputType={'password'}
              required={true}
            />
          </div>
          <button type='submit' className='submit-btn'>
            Next Step
          </button>
          <div className='sign-in-prompt'>
            <p className='sub-text'>
              Already have an account?{' '}
              <Link to='/login' className='text-link'>
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
      {/* <form onSubmit={handleSubmit} className='signup-form'>
        {error && <div>ERROR!</div>}
        <label>
          Email
          <input type='email' ref={emailRef} />
        </label>
        <label>
          Password
          <input type='password' ref={passwordRef} />
        </label>
        <button type='submit' disabled={loading}>
          Sign Up
        </button>
      </form>
      <div>
        Already have an account? <Link to='/login'>Log In</Link>
      </div> */}
    </>
  )
}

export default SignupForm
