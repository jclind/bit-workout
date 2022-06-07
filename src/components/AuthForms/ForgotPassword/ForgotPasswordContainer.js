import React, { useState } from 'react'
import ForgotPassword from './ForgotPassword'
import { connect } from 'react-redux'
import { resetPassword } from '../../../redux/actions/auth/authStatus'
import './ForgotPassword.scss'

const ForgotPasswordContainer = ({ resetPassword }) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    setMessage('')
    setError('')
    setLoading(true)
    const err = await resetPassword(email)

    if (err) {
      setError(`Failed to reset password, ERROR: ${err.code}`)
      setLoading(false)
    } else {
      setMessage('Check your inbox for further instructions')
      setLoading(false)
    }
  }

  return (
    <div className='forgot-password-container'>
      <ForgotPassword
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
        email={email}
        setEmail={setEmail}
        message={message}
      />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: email => dispatch(resetPassword(email)),
  }
}

export default connect(null, mapDispatchToProps)(ForgotPasswordContainer)
