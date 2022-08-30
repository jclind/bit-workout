import React, { useState } from 'react'
import SettingsSectionTitle from '../../components/SettingsComponents/SettingsSectionTitle/SettingsSectionTitle'
import SettingsButton from '../../components/SettingsComponents/SettingsButton/SettingsButton'
import BackButton from '../../components/SettingsComponents/BackButton/BackButton'
import ConfirmLogoutModal from '../../components/SettingsComponents/ConfirmLogoutModal/ConfirmLogoutModal'
import { connect } from 'react-redux'
import {
  AiOutlineRight,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineInfoCircle,
  AiOutlineQuestionCircle,
  AiOutlineExport,
} from 'react-icons/ai'

import './Settings.scss'
import { logout } from '../../redux/actions/auth/authStatus'
import { Link } from 'react-router-dom'
import { current_version_number } from '../../assets/data/releaseNotes'

const Settings = ({ logout, isWorkoutRunning }) => {
  const [isConfirmLogoutModalOpen, setIsConfirmLogoutModalOpen] =
    useState(false)
  const [error, setError] = useState(false)

  async function handleLogout() {
    setError('')

    if (isWorkoutRunning) {
      setIsConfirmLogoutModalOpen(true)
    } else {
      try {
        await logout()
      } catch {
        setError('Failed to log out')
      }
    }
  }

  return (
    <>
      <div className='settings-page page'>
        {error && <div className='error'>{error}</div>}
        <div className='settings-title'>Settings</div>
        <section className='account-section settings-section'>
          <SettingsSectionTitle text={'Account'} />
          <SettingsButton
            title={'Manage Account'}
            icon={<AiOutlineUser className='settings-button-icon icon' />}
            link={'manage-account'}
          />
          <SettingsButton
            title={'Security'}
            icon={<AiOutlineLock className='settings-button-icon icon' />}
            link={'security'}
          />
        </section>
        <section className='workout-section settings-section'>
          <SettingsSectionTitle text={'workout'} />
          <SettingsButton
            title={'Workout Settings'}
            icon={<AiOutlineSetting className='settings-button-icon icon' />}
            link={'/account/settings/workout-settings'}
          />
        </section>
        <section className='support-section settings-section'>
          <SettingsSectionTitle text={'support'} />
          <SettingsButton
            title={'Feedback'}
            icon={<AiOutlineInfoCircle className='settings-button-icon icon' />}
            link={'/account/settings/feedback'}
          />
          <SettingsButton
            title={'Help'}
            icon={
              <AiOutlineQuestionCircle className='settings-button-icon icon' />
            }
            link={'/'}
          />
        </section>
        <section className='login-section settings-section'>
          <SettingsSectionTitle text={'login'} />
          <SettingsButton
            title={'Logout'}
            icon={<AiOutlineExport className='settings-button-icon icon' />}
            action={handleLogout}
          />
        </section>
        <BackButton />
        <Link to='/account/settings/release-notes' className='version'>
          Version {current_version_number} <AiOutlineRight />
        </Link>
      </div>
      {isConfirmLogoutModalOpen && (
        <ConfirmLogoutModal
          onClose={() => setIsConfirmLogoutModalOpen(false)}
          logout={logout}
        />
      )}
    </>
  )
}
const mapStateToProps = state => {
  const isWorkoutRunning = state.workout.workoutData.runningWorkout
  return {
    isWorkoutRunning,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
