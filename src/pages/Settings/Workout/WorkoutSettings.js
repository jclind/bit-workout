import React, { useState } from 'react'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import SettingsButton from '../../../components/SettingsComponents/SettingsButton/SettingsButton'
import SettingsSectionTitle from '../../../components/SettingsComponents/SettingsSectionTitle/SettingsSectionTitle'
import { AiOutlineSound } from 'react-icons/ai'
import { connect } from 'react-redux'
import { updateUserAccountData } from '../../../redux/actions/auth/authStatus'
import { toast } from 'react-toastify'

const WorkoutSettings = ({ updateUserAccountData, isChime }) => {
  const [isChimeChecked, setIsChimeChecked] = useState(isChime)

  const handleToggleChime = () => {
    const updatedIsChecked = !isChimeChecked
    setIsChimeChecked(updatedIsChecked)
    updateUserAccountData({
      prop: 'settings.workout.isChime',
      val: updatedIsChecked,
    }).catch(err => {
      toast('Something Went Wrong', { type: 'error' })
    })
  }

  return (
    <div className='workout-settings-page page'>
      <div className='settings-title'>Workout Settings</div>
      <section className='workout-chime settings-section'>
        <SettingsSectionTitle text={'workout chime'} />
        <SettingsButton
          title={'chime'}
          icon={<AiOutlineSound className='icon' />}
          isChecked={isChimeChecked}
          switchFunction={handleToggleChime}
        />
      </section>
      <BackButton />
    </div>
  )
}
const mapStateToProps = state => {
  const workoutSettings = state.auth?.userAccountData?.settings?.workout
  const isChime = workoutSettings ? workoutSettings.isChime : true

  return {
    isChime,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateUserAccountData: data => dispatch(updateUserAccountData(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutSettings)
