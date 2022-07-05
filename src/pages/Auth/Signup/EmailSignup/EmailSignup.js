import React, { useState, useEffect, useRef } from 'react'
import FormInput from '../../../../components/FormInput/FormInput'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import accountIcon from '../../../../assets/images/icons/account.svg'
import emailIcon from '../../../../assets/images/icons/email.svg'
import passwordIcon from '../../../../assets/images/icons/password.svg'
import { AiOutlineWarning } from 'react-icons/ai'
import { connect } from 'react-redux'
import './EmailSignup.scss'
import { signup } from '../../../../redux/actions/auth/authStatus'

const EmailSignup = ({ signup }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setError('')
  }, [name, email, password])

  const [error, setError] = useState('')

  const signupBtnRef = useRef()

  const handleSignup = async e => {
    e.preventDefault()
    if (!name) {
      return setError('Please Enter Name')
    }
    if (!email) {
      return setError('Please Enter Email')
    }
    if (!password) {
      return setError('Please Enter Password')
    }

    const savedSignupData = JSON.parse(localStorage.getItem('signup'))

    const { barbellWeight, birthday, gender, height, username, weight } =
      savedSignupData
    console.log(savedSignupData)

    const payload = {
      email,
      name,
      birthday,
      gender,
      height,
      username,
      weight,
      barbellWeight,
    }
    try {
      await signup(email, password, payload)
      localStorage.setItem('signup', '{}')
      // navigate('/')
    } catch (error) {
      console.log(error)
      setError(error.code)
    }
  }

  return (
    <div className='signup-page email-signup'>
      <BackButton />
      <div className='settings-title'>Create Account</div>
      {error && (
        <div className='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
      <form className='signup-inputs'>
        <FormInput
          icon={accountIcon}
          placeholder={'full name'}
          inputType={'name'}
          val={name}
          setVal={setName}
          required={true}
        />
        <FormInput
          icon={emailIcon}
          placeholder={'email'}
          inputType={'email'}
          val={email}
          setVal={setEmail}
          required={true}
        />
        <FormInput
          icon={passwordIcon}
          placeholder={'password'}
          inputType={'password'}
          val={password}
          setVal={setPassword}
          required={true}
          showPasswordBtn={true}
        />
        <button
          className='signup-next-btn'
          ref={signupBtnRef}
          onClick={handleSignup}
          type='submit'
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}
const mapDispatchToProps = dispatch => {
  return {
    signup: (email, password, payload) =>
      dispatch(signup(email, password, payload)),
  }
}

export default connect(null, mapDispatchToProps)(EmailSignup)
