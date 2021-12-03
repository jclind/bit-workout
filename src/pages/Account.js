import React, { useState, useEffect } from 'react'
import UserAvatarAndTitle from '../components/AccountComponents/UserAvatarAndTitle'
import '../assets/styles/pages/account.scss'
import { useAuth } from '../contexts/AuthContext'
import NavbarContainer from '../components/Navbar/NavbarContainer'

const Account = () => {
  const [userData, setUserData] = useState()
  const [loading, setLoading] = useState('true')

  const [name, setName] = useState('')

  const { getUserData, currentUser } = useAuth()

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

  useEffect(() => {
    if (userData) {
      setName(userData.name)
    }
  }, [userData])

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className='account-page'>
          <UserAvatarAndTitle name={name} membership={'Free Member'} />
        </div>
      )}

      <NavbarContainer />
    </>
  )
}

export default Account
