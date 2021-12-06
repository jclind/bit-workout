import React from 'react'
import SettingsSectionTitle from '../../components/SettingsComponents/SettingsSectionTitle'
import SettingsButton from '../../components/SettingsComponents/SettingsButton'

const ManageAccount = () => {
  return (
    <div className='manage-account-page page'>
      <div className='settings-title'>Manage Account</div>
      <section className='personal-info settings-section'>
        <SettingsSectionTitle text={'personal information'} />
        <SettingsButton title={'name'} input='Jesse Lind' link={'/'} />
        <SettingsButton title={'username'} input='test' link={'/'} />
        <SettingsButton title={'email'} input='test@gmail.com' link={'/'} />
        <SettingsButton title={'phone'} input='NA' link={'/'} />
      </section>
      <section className='personal-info settings-section'>
        <SettingsSectionTitle text={'membership'} />
        <SettingsButton title={'membership'} input='Fitness +' link={'/'} />
      </section>
    </div>
  )
}

export default ManageAccount
