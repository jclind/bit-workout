import React, { useState, useRef } from 'react'
import SignupAccount from './SignupAccount'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const SignupContainer = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch (error) {
      console.log(error)
      setError('Failed to create an account')
    }
    setLoading(false)
  }

  return (
    <SignupAccount
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      emailRef={emailRef}
      passwordRef={passwordRef}
    />
  )
}

export default SignupContainer
