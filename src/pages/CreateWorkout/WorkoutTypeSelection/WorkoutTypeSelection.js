import React from 'react'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import './WorkoutTypeSelection.scss'

const WorkoutTypeSelection = () => {
  return (
    <div className='create-workout-page workout-type-selection'>
      <BackButton />
      <div className='title'>Select Workout Type</div>
    </div>
  )
}

export default WorkoutTypeSelection
