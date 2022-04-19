import React, { useRef, useState } from 'react'
import ForgotPassword from './ForgotPassword'
import { connect } from 'react-redux'
import { resetPassword } from '../../../redux/actions/auth/authStatus'

const ForgotPasswordContainer = ({ resetPassword }) => {
  const emailRef = useRef()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
      message={message}
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: email => dispatch(resetPassword(email)),
  }
}

export default connect(null, mapDispatchToProps)(ForgotPasswordContainer)
