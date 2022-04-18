import React from 'react'
import SettingsSectionTitle from '../../components/SettingsComponents/SettingsSectionTitle/SettingsSectionTitle'
import SettingsButton from '../../components/SettingsComponents/SettingsButton/SettingsButton'
import { useAuth } from '../../contexts/AuthContext'
import BackButton from '../../components/SettingsComponents/BackButton/BackButton'

const ManageAccount = () => {
  const { currUserData, currentUser } = useAuth()

  const { name, username } = currUserData
  const { email } = currentUser

  return (
    <div className='manage-account-page page'>
      <div className='settings-title'>Manage Account</div>
      <section className='personal-info settings-section'>
        <SettingsSectionTitle text={'personal information'} />
        <SettingsButton title={'name'} input={name} link={'update-name'} />
        <SettingsButton
          title={'username'}
          input={username}
          link={'update-username'}
        />
        <SettingsButton title={'email'} input={email} link={'update-email'} />
      </section>
      <section className='personal-info settings-section'>
        <SettingsSectionTitle text={'membership'} />
        <SettingsButton title={'membership'} input='Fitness +' link={'/'} />
      </section>
      <BackButton />
    </div>
  )
}

export default ManageAccount
