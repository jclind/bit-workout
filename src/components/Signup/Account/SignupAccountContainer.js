import React, { useState, useRef } from 'react'
import SignupAccount from './SignupAccount'
import { useNavigate } from 'react-router-dom'

const SignupContainer = () => {
  const accountForm = useRef()
  const navigate = useNavigate()

  function handleAccountSubmit(e) {
    e.preventDefault()
    navigate('/signup/personal-info')
  }

  return (
    <SignupAccount
      handleAccountSubmit={handleAccountSubmit}
      accountForm={accountForm}
    />
  )
}

export default SignupContainer
