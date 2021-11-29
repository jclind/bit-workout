import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      navigate('/login')
    } catch {
      setError('Failed to log out')
    }
  }
  console.log(currentUser.uid)

  return (
    <>
      <section>
        <h2>Profile</h2>
        {error && <div>{error}</div>}
        <strong>Email:</strong> {currentUser.email}
        <Link to='/update-profile'>Update Profile</Link>
      </section>
      <div>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </>
  )
}

export default Dashboard
