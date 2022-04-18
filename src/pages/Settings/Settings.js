import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import SettingsSectionTitle from '../../components/SettingsComponents/SettingsSectionTitle/SettingsSectionTitle'
import SettingsButton from '../../components/SettingsComponents/SettingsButton/SettingsButton'
import accountIcon from '../../assets/images/icons/account.svg'
import lockIcon from '../../assets/images/icons/lock.svg'
import logoutIcon from '../../assets/images/icons/logout.svg'
import helpIcon from '../../assets/images/icons/help.svg'
import bugIcon from '../../assets/images/icons/bug.svg'
import feedbackIcon from '../../assets/images/icons/feedback.svg'
import BackButton from '../../components/SettingsComponents/BackButton/BackButton'

import './Settings.scss'

const Settings = () => {
  const [error, setError] = useState(false)
  const { logout } = useAuth()

  async function handleLogout() {
    setError('')
    try {
      await logout()
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <div className='settings-page page'>
      {error && <div>{error}</div>}
      <div className='settings-title'>Settings</div>
      <section className='account-section settings-section'>
        <SettingsSectionTitle text={'Account'} />
        <SettingsButton
          title={'Manage Account'}
          icon={accountIcon}
          link={'manage-account'}
        />
        <SettingsButton title={'Security'} icon={lockIcon} link={'security'} />
      </section>
      <section className='support-section settings-section'>
        <SettingsSectionTitle text={'support'} />
        <SettingsButton title={'Report A Problem'} icon={bugIcon} link={'/'} />
        <SettingsButton title={'Feedback'} icon={feedbackIcon} link={'/'} />
        <SettingsButton title={'Help'} icon={helpIcon} link={'/'} />
      </section>
      <section className='login-section settings-section'>
        <SettingsSectionTitle text={'login'} />
        <SettingsButton
          title={'Logout'}
          icon={logoutIcon}
          action={handleLogout}
        />
      </section>
      <BackButton />
    </div>
  )
}

export default Settings
