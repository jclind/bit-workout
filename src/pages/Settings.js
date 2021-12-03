import React from 'react'
import SettingsButton from '../components/SettingsComponents/SettingsButton'
import SettingsSectionTitle from '../components/SettingsComponents/SettingsSectionTitle'
import accountIcon from '../assets/images/icons/account.svg'
import '../assets/styles/pages/settings.scss'

const Settings = () => {
  return (
    <div className='settings-page'>
      <div className='settings-title'>Settings</div>
      <section className='account-section'>
        <SettingsSectionTitle text={'Account'} />
        <SettingsButton text={'Manage Account'} icon={accountIcon} link={'/'} />
      </section>
    </div>
  )
}

export default Settings
