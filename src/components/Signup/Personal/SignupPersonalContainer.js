import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import SignupPersonal from './SignupPersonal'

const SignupPersonalContainer = () => {
  const { signup } = useAuth()

  return <SignupPersonal />
}

export default SignupPersonalContainer
