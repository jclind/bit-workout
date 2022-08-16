import React from 'react'
import SettingsSectionTitle from '../../components/SettingsComponents/SettingsSectionTitle/SettingsSectionTitle'
import SettingsButton from '../../components/SettingsComponents/SettingsButton/SettingsButton'
import BackButton from '../../components/SettingsComponents/BackButton/BackButton'
import { connect } from 'react-redux'

const ManageAccount = ({ name, username, email }) => {
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

const mapStateToProps = state => {
  const userAccountData = state.auth.userAccountData
  return {
    name: userAccountData.name,
    username: userAccountData.username,
    email: userAccountData.email,
  }
}

export default connect(mapStateToProps)(ManageAccount)
