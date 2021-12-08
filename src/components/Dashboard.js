import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import NavbarContainer from './Navbar/NavbarContainer'

const Dashboard = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { currentUser, logout, currUserData } = useAuth()
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

  const { email } = currentUser
  const { username, name, gender, birthday, height, weight } = currUserData

  return (
    <>
      <div className='page'>
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Profile</h2>
          {error && <div>{error}</div>}
          <div>
            <strong>Email:</strong> {email}
          </div>
          <div>
            <strong>Username:</strong> {username}
          </div>
          <div>
            <strong>Name:</strong> {name}
          </div>
          <div>
            <strong>Gender:</strong> {gender}
          </div>
          <div>
            <strong>Birthday:</strong> {birthday}
          </div>
          <div>
            <strong>Height:</strong> {`${height.feet}ft, ${height.inches}in`}
          </div>
          <div>
            <strong>Weight:</strong> {weight}
          </div>
          <Link to='/update-profile'>Update Profile</Link>
        </section>
      </div>

      <NavbarContainer />
    </>
  )
}

export default Dashboard
