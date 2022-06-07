import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Signup.scss'
import usernameIcon from '../../../../assets/images/icons/username.svg'
import accountIcon from '../../../../assets/images/icons/account.svg'
import emailIcon from '../../../../assets/images/icons/email.svg'
import passwordIcon from '../../../../assets/images/icons/password.svg'
import FormInput from '../../../FormInput/FormInput'
import { SignupContext } from '../../../../pages/Auth/Signup/Signup'
import { AiOutlineWarning } from 'react-icons/ai'

const SignupAccount = () => {
  const {
    usernameVal,
    setUsernameVal,
    fullNameVal,
    setFullNameVal,
    emailVal,
    setEmailVal,
    passwordVal,
    setPasswordVal,
    usernameAvailable,
  } = useContext(SignupContext)

  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleAccountSubmit = e => {
    e.preventDefault()
    setError('')

    if (!usernameVal || !emailVal || !fullNameVal || !passwordVal) {
      return setError('Please enter all fields in form')
    }

    if (usernameVal.length < 3) {
      return setError('Username must be 3 characters or longer')
    } else if (usernameVal.length >= 25) {
      return setError('Username must be 25 characters or less')
    }
    if (!usernameAvailable) {
      return setError('Username unavailable, please enter a unique username')
    }
    navigate('/signup/personal-info')
  }

  return (
    <>
      <div className='content signup-account-info'>
        {error && (
          <div className='form-error'>
            <AiOutlineWarning className='icon' />
            {error}
          </div>
        )}
        <form action='' onSubmit={handleAccountSubmit}>
          <div className='inputs'>
            <div className='username-input'>
              <FormInput
                icon={usernameIcon}
                placeholder={'username'}
                inputType={'text'}
                val={usernameVal}
                setVal={setUsernameVal}
                required={true}
              />

              {usernameAvailable !== null && (
                <div
                  className={
                    usernameAvailable
                      ? 'is-username-available available'
                      : 'is-username-available not-available'
                  }
                >
                  {usernameAvailable ? (
                    <>
                      <strong>{usernameVal}</strong> is available!
                    </>
                  ) : (
                    <>
                      <strong>{usernameVal}</strong> is not available.
                    </>
                  )}
                </div>
              )}
            </div>
            <FormInput
              icon={accountIcon}
              placeholder={'full name'}
              inputType={'name'}
              val={fullNameVal}
              setVal={setFullNameVal}
              required={true}
            />
            <FormInput
              icon={emailIcon}
              placeholder={'email'}
              inputType={'email'}
              val={emailVal}
              setVal={setEmailVal}
              required={true}
            />
            <FormInput
              icon={passwordIcon}
              placeholder={'password'}
              inputType={'password'}
              val={passwordVal}
              setVal={setPasswordVal}
              required={true}
              showPasswordBtn={true}
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
    </>
  )
}

export default SignupAccount
