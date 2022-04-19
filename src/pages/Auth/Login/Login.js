import React, { useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router'
import Login from '../../../components/AuthForms/Login/Login'
import './Login.scss'
import { connect } from 'react-redux'
import { login } from '../../../redux/actions/auth/authStatus'

const LoginPage = ({ login, userAuth }) => {
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailVal, passwordVal)
      navigate('/')
    } catch (error) {
      console.log(error)
      setError('Failed to sign in')
    }
    setLoading(false)
  }

  if (location.pathname === '/login' && userAuth) {
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
      setPasswordVal={setPasswordVal}
    />
  )
}
const mapStateToProps = state => {
  return {
    userAuth: state.auth.userAuth,
  }
}
const mapPropsToDispatch = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password)),
  }
}

export default connect(mapStateToProps, mapPropsToDispatch)(LoginPage)
