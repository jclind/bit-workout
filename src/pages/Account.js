import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import UserAvatarAndTitle from '../components/AccountComponents/UserAvatarAndTitle'
import '../assets/styles/pages/account.scss'
import { useAuth } from '../contexts/AuthContext'
import NavbarContainer from '../components/Navbar/NavbarContainer'
import InfoTile from '../components/AccountComponents/InfoTile'
import rightIcon from '../assets/images/icons/right.svg'

const Account = () => {
  const [userData, setUserData] = useState()
  const [loading, setLoading] = useState('true')

  const [name, setName] = useState('')
  const [height, setHeight] = useState({ feet: '', inches: '' })
  const [weight, setWeight] = useState('')

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
      setHeight(prevState => ({
        ...prevState,
        feet: userData.height.feet,
        inches: userData.height.inches,
      }))
      setWeight(userData.weight)
    }
  }, [userData])

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className='account-page'>
          <UserAvatarAndTitle name={name} membership={'Free Member'} />
          <div className='info-tiles'>
            <InfoTile
              title={'height'}
              text={`${height.feet}' ${height.inches}"`}
            />
            <InfoTile title={'weight'} text={weight} subtext={'lbs'} />
          </div>
          <Link to='/account/settings' className='settings-btn-container'>
            <img src={rightIcon} alt='right' className='icon' />
            <button className='settings-btn'>Account Settings</button>
          </Link>
        </div>
      )}

      <NavbarContainer />
    </>
  )
}

export default Account
