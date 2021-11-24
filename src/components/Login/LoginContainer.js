import React, { useRef, useState } from 'react'
import Login from './Login'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginContainer = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch (error) {
      console.log(error)
      setError('Failed to sign in')
    }
    setLoading(false)
  }

  return (
    <Login
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      emailRef={emailRef}
      passwordRef={passwordRef}
    />
  )
}

export default LoginContainer
