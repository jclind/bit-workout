import React, { useRef, useState } from 'react'
import ForgotPassword from './ForgotPassword'
import { useNavigate } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'

const ForgotPasswordContainer = () => {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      // await login(emailRef.current.value, passwordRef.current.value)
      setMessage('Check your inbox for further instructions')
    } catch (error) {
      console.log(error)
      setError('Failed to sign in')
    }
    setLoading(false)
  }

  return (
    <ForgotPassword
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      emailRef={emailRef}
    />
  )
}

export default ForgotPasswordContainer
