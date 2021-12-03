import React from 'react'
import { Link } from 'react-router-dom'
import loginIMG from '../../assets/images/login-background.png'
import FormInput from '../FormInput'
import emailIcon from '../../assets/images/icons/email.svg'
import passwordIcon from '../../assets/images/icons/password.svg'

const Login = ({
  handleSubmit,
  loading,
  error,
  emailVal,
  setEmailVal,
  passwordVal,
  setPasswordVal,
}) => {
  return (
    <>
      <div className='login-container'>
        <img
          src={loginIMG}
          alt='login background'
          className='login-background'
        />
        <h1 className='title'>Log In</h1>
        <div className='form-container'>
          <form action='' className='login-form' onSubmit={handleSubmit}>
            <div className='inputs'>
              <FormInput
                placeholder='email'
                icon={emailIcon}
                inputType='email'
                val={emailVal}
                setVal={setEmailVal}
                required={true}
                class='login-input'
              />
              <FormInput
                placeholder='password'
                icon={passwordIcon}
                inputType='password'
                val={passwordVal}
                setVal={setPasswordVal}
                required={true}
                class='login-input'
              />
            </div>
            <Link to='/' className='forgot-password'>
              Forgot password?
            </Link>
            <button className='submit-btn'>Log In</button>
            <div className='dont-have-account'>
              Don't have an account?
              <Link to='/signup' className='dont-have-account-btn'>
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
