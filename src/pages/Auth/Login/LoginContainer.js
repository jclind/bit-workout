import React, { useState, useRef } from 'react'
import { useNavigate, Navigate } from 'react-router'
import Login from './Login'
import './Login.scss'
import { connect } from 'react-redux'
import { login } from '../../../redux/actions/auth/authStatus'

const LoginPage = ({ login, isSignedIn }) => {
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    setError('')
    setLoading(true)

    if (!emailVal) {
      setLoading(false)
      return setError('Please Enter Email')
    }
    if (!passwordVal) {
      setLoading(false)
      return setError('Please Enter Password')
    }

    const err = await login(emailVal, passwordVal)

    if (err) {
      setError(`ERROR: ${err.code}`)
      setLoading(false)
    } else {
      setLoading(false)
      navigate('/')
    }
  }

  const passwordInputRef = useRef('')

  if (isSignedIn) {
    return <Navigate to='/' />
  }

  return (
    <Login
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      emailVal={emailVal}
      setEmailVal={setEmailVal}
      passwordVal={passwordVal}
      passwordInputRef={passwordInputRef}
      setPasswordVal={setPasswordVal}
    />
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
    login: (email, password) => dispatch(login(email, password)),
  }
}

export default connect(mapStateToProps, mapPropsToDispatch)(LoginPage)
