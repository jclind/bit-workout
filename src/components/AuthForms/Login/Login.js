import React from 'react'
import { Link } from 'react-router-dom'
import loginIMG from '../../../assets/images/login-background.png'
import FormInput from '../../FormInput/FormInput'
import emailIcon from '../../../assets/images/icons/email.svg'
import passwordIcon from '../../../assets/images/icons/password.svg'
import { TailSpin } from 'react-loader-spinner'
import { AiOutlineWarning } from 'react-icons/ai'

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
          {error && (
            <div className='error'>
              <AiOutlineWarning className='icon' />
              {error}
            </div>
          )}
          <form className='login-form' onSubmit={handleSubmit}>
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
                showPasswordBtn={true}
              />
            </div>
            <Link to='/forgot-password' className='forgot-password'>
              Forgot password?
            </Link>
            <button className='submit-btn'>
              {loading ? (
                <TailSpin
                  height='30'
                  width='30'
                  color='white'
                  arialLabel='loading'
                  className='spinner'
                />
              ) : (
                'Log In'
              )}
            </button>
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
