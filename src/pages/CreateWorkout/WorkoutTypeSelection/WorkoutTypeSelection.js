import React, { useState } from 'react'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import './WorkoutTypeSelection.scss'

const WorkoutTypeSelection = () => {
  const [workoutType, setWorkoutType] = useState('')

  const handleNextClick = () => {}

  return (
    <div className='create-workout-page workout-type-selection'>
      <BackButton />
      <div className='title'>Workout Type</div>
      <div className='workout-type-container'>
        <div className='saved-container'>
          <button
            className={`saved ${workoutType === 'saved' && 'selected'}`}
            onClick={() => setWorkoutType('saved')}
          >
            Saved
          </button>
          <p className='description'>
            Workout will be saved to your personal workout collection for later
            re-use.
          </p>
        </div>
        <div className='temp-container'>
          <button
            className={`temp ${workoutType === 'temp' && 'selected'}`}
            onClick={() => setWorkoutType('temp')}
          >
            Single-Use
          </button>
          <p className='description'>
            Workout will be started after creation and won't be saved to your
            personal workout collection.
          </p>
        </div>
      </div>
      <button className='next-btn' onClick={handleNextClick}>
        NEXT
      </button>
    </div>
  )
}

export default WorkoutTypeSelection
