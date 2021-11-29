import React, { useState, useRef } from 'react'
import UpdateProfile from './UpdateProfile'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router'

const UpdateProfileContainer = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    const promises = []
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(emailRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        setError('Failed to update account')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <UpdateProfile
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
      emailRef={emailRef}
      currentUser={currentUser}
      passwordRef={passwordRef}
      passwordConfirmRef={passwordConfirmRef}
    />
  )
}

export default UpdateProfileContainer
