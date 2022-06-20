import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUpdatePassword } from '../../../redux/actions/auth/authStatus'
import Security from './Security'

const SecurityContainer = ({ updatePassword }) => {
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [passMatches, setPassMatches] = useState(true)

  const [oldPass, setOldPass] = useState('')
  const [newPass, setNewPass] = useState('')
  const [repNewPass, setRepNewPass] = useState('')

  const [showPassword, setShowPassword] = useState()

  const clearResetPasswordForm = () => {
    setOldPass('')
    setNewPass('')
    setRepNewPass('')
  }
  const handlePasswordSubmit = e => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPass !== repNewPass) {
      return setError('New Passwords Must Match')
    } else if (newPass === oldPass) {
      return setError('New Password Must Be Different Than Old.')
    }

    updatePassword(oldPass, newPass)
      .then(() => {
        setError('')

        setSuccess('Password Changed')
        setTimeout(() => {
          setSuccess('')
        }, 4000)
        clearResetPasswordForm()
        navigate(-1)
      })
      .catch(err => {
        const errCode = err.code
        setSuccess('')

        if (errCode === 'auth/wrong-password') {
          setError('Incorrect Password, Try Again.')
        } else {
          setError('Something went wrong, try re-logging in')
        }
      })
  }
  useEffect(() => {
    if (newPass !== repNewPass && repNewPass) {
      return setPassMatches(false)
    }
    return setPassMatches(true)
  }, [repNewPass, newPass])

  return (
    <Security
      oldPass={oldPass}
      setOldPass={setOldPass}
      newPass={newPass}
      setNewPass={setNewPass}
      repNewPass={repNewPass}
      setRepNewPass={setRepNewPass}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      handlePasswordSubmit={handlePasswordSubmit}
      error={error}
      success={success}
      passMatches={passMatches}
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updatePassword: (oldPassword, newPassword) =>
      dispatch(handleUpdatePassword(oldPassword, newPassword)),
  }
}

export default connect(null, mapDispatchToProps)(SecurityContainer)
