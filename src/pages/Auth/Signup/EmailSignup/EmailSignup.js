import React, { useState, useEffect, useRef } from 'react'
import FormInput from '../../../../components/FormInput/FormInput'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import { AiOutlineWarning, AiOutlineMail } from 'react-icons/ai'
import { BiUser, BiLockAlt } from 'react-icons/bi'
import { connect } from 'react-redux'
import './EmailSignup.scss'
import { signupWithEmail } from '../../../../redux/actions/auth/authStatus'
import { useNavigate } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'

const EmailSignup = ({ signupWithEmail }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setError('')
  }, [name, email, password])

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  useEffect(() => {
    if (nameRef && nameRef.current) {
      nameRef.current.focus()
    }
  }, [nameRef])

  const [error, setError] = useState('')

  const signupBtnRef = useRef()

  const handleSetName = val => {
    if (val.length > 30) return

    setName(val)
  }

  const handleSignup = async e => {
    e.preventDefault()
    setLoading(true)

    if (!name) {
      setLoading(false)
      return setError('Please Enter Name')
    }
    if (!email) {
      setLoading(false)
      return setError('Please Enter Email')
    }
    if (!password) {
      setLoading(false)
      return setError('Please Enter Password')
    }
    if (password.length < 6) {
      setLoading(false)
      return setError('Password Must Be 6 Or More Characters')
    }

    const savedSignupData = JSON.parse(localStorage.getItem('signup'))

    const { barbellWeight, birthday, gender, height, username, weight } =
      savedSignupData

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
      await signupWithEmail(email, password, payload)
      localStorage.setItem('signup', '{}')
      navigate('/')
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
          icon={<BiUser className='icon' />}
          placeholder={'full name'}
          inputType={'name'}
          val={name}
          setVal={val => handleSetName(val)}
          required={true}
          inputRef={nameRef}
          tabRef={emailRef}
          autoCapitalize='words'
        />
        <FormInput
          icon={<AiOutlineMail className='icon' />}
          placeholder={'email'}
          inputType={'email'}
          val={email}
          setVal={setEmail}
          required={true}
          inputRef={emailRef}
          tabRef={passwordRef}
        />
        <FormInput
          icon={<BiLockAlt className='icon' />}
          placeholder={'password'}
          inputType={'password'}
          val={password}
          setVal={setPassword}
          required={true}
          showPasswordBtn={true}
          inputRef={passwordRef}
        />
        <button
          className='signup-next-btn'
          ref={signupBtnRef}
          onClick={handleSignup}
          type='submit'
          disabled={loading}
        >
          {loading ? (
            <TailSpin
              height='30'
              width='30'
              color='white'
              arialLabel='loading'
              className='spinner'
            />
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </div>
  )
}
const mapDispatchToProps = dispatch => {
  return {
    signupWithEmail: (email, password, payload) =>
      dispatch(signupWithEmail(email, password, payload)),
  }
}

export default connect(null, mapDispatchToProps)(EmailSignup)
