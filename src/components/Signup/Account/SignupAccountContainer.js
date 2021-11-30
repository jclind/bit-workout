import React, { useState, useRef } from 'react'
import SignupAccount from './SignupAccount'
import { useAuth } from '../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const SignupContainer = () => {
  const { signup } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    // try {
    //   setError('')
    //   await signup(emailRef.current.value, passwordRef.current.value)
    //   navigate('/')
    // } catch (error) {
    //   console.log(error)
    //   setError('Failed to create an account')
    // }
  }

  return <SignupAccount handleSubmit={handleSubmit} />
}

export default SignupContainer
