import React, { useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation, Navigate } from 'react-router'
import Login from '../components/Login/Login'
import '../assets/styles/pages/login.scss'

const LoginPage = () => {
  const [emailVal, setEmailVal] = useState('')
  const [passwordVal, setPasswordVal] = useState('')
  const { login, currentUser } = useAuth()
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

  if (location.pathname === '/login' && currentUser) {
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

export default LoginPage
