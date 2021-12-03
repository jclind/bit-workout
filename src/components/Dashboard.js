import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import NavbarContainer from './Navbar/NavbarContainer'

const Dashboard = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { currentUser, logout, getUserData } = useAuth()
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
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const data = await getUserData(currentUser)
      setUserData(data)
      return setLoading(false)
    }
    if (!userData) {
      fetchData()
    }
  }, [])

  const { email } = currentUser

  // const { username, name, gender, birthday, height, weight } = currUserData
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <section style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>Profile</h2>
            {error && <div>{error}</div>}
            <div>
              <strong>Email:</strong> {email}
            </div>
            <div>
              <strong>Username:</strong> {userData.username}
            </div>
            <div>
              <strong>Name:</strong> {userData.name}
            </div>
            <div>
              <strong>Gender:</strong> {userData.gender}
            </div>
            <div>
              <strong>Birthday:</strong> {userData.birthday}
            </div>
            <div>
              <strong>Height:</strong>{' '}
              {`${userData.height.feet}ft, ${userData.height.inches}in`}
            </div>
            <div>
              <strong>Weight:</strong> {userData.weight}
            </div>
            <Link to='/update-profile'>Update Profile</Link>
          </section>
          <div>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </>
      )}

      <NavbarContainer />
    </>
  )
}

export default Dashboard
