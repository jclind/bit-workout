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

  const handleSubmit = async e => {
    e.preventDefault()

    setError('')
    setLoading(true)
    const err = await login(emailVal, passwordVal)

    if (err) {
      setError(`ERROR: ${err.code}`)
      setLoading(false)
    } else {
      setLoading(false)
      navigate('/')
    }
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
