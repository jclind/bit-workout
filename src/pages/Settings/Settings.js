import React, { useState } from 'react'
import SettingsSectionTitle from '../../components/SettingsComponents/SettingsSectionTitle/SettingsSectionTitle'
import SettingsButton from '../../components/SettingsComponents/SettingsButton/SettingsButton'
import accountIcon from '../../assets/images/icons/account.svg'
import lockIcon from '../../assets/images/icons/lock.svg'
import logoutIcon from '../../assets/images/icons/logout.svg'
import helpIcon from '../../assets/images/icons/help.svg'
import feedbackIcon from '../../assets/images/icons/feedback.svg'
import BackButton from '../../components/SettingsComponents/BackButton/BackButton'
import { connect } from 'react-redux'
import { AiOutlineRight } from 'react-icons/ai'

import './Settings.scss'
import { logout } from '../../redux/actions/auth/authStatus'
import { Link } from 'react-router-dom'

const Settings = ({ logout }) => {
  const [error, setError] = useState(false)

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
        <SettingsButton
          title={'Feedback'}
          icon={feedbackIcon}
          link={'/account/settings/feedback'}
        />
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
      <Link to='/' className='version'>
        Version v0.3.0-alpha <AiOutlineRight />
      </Link>
    </div>
  )
}

const mapStateToDispatch = dispatch => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(null, mapStateToDispatch)(Settings)
