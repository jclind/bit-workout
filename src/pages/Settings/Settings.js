import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import SettingsSectionTitle from '../../components/SettingsComponents/SettingsSectionTitle'
import SettingsButton from '../../components/SettingsComponents/SettingsButton'
import accountIcon from '../../assets/images/icons/account.svg'
import lockIcon from '../../assets/images/icons/lock.svg'
import logoutIcon from '../../assets/images/icons/logout.svg'
import '../../assets/styles/pages/settings.scss'

const Settings = () => {
  const [error, setError] = useState(false)
  const { logout } = useAuth()
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

  return (
    <div className='settings-page'>
      <div className='settings-title'>Settings</div>
      <section className='account-section settings-section'>
        <SettingsSectionTitle text={'Account'} />
        <SettingsButton
          title={'Manage Account'}
          icon={accountIcon}
          link={'manage-account'}
        />
        <SettingsButton title={'Security'} icon={lockIcon} link={'/'} />
      </section>
      <section className='login-section settings-section'>
        <SettingsSectionTitle text={'login'} />
        <SettingsButton
          title={'Logout'}
          icon={logoutIcon}
          action={handleLogout}
        />
      </section>
    </div>
  )
}

export default Settings
