import React, { useState, useEffect } from 'react'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import { AiOutlineWarning } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'
import './WorkoutTypeSelection.scss'
import {
  createWorkout,
  startWorkout,
} from '../../../redux/actions/workout/workout'
import { connect } from 'react-redux'
import { timeToMS } from '../../../util/timeToMS'
import { useLocation, useNavigate } from 'react-router-dom'

const WorkoutTypeSelection = ({ startWorkout, createWorkout }) => {
  const [workoutType, setWorkoutType] = useState('')

  const [error, setError] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  // If the user is not routing from previous create workout page, re-route to first create workout page
  useEffect(() => {
    if (location?.state?.prev !== 'workout-info') {
      navigate('/create-workout')
    }
  }, [])

  const handleNextClick = () => {
    if (!workoutType) return setError('Please Select A Workout Type')

    const createWorkoutData = JSON.parse(
      localStorage.getItem('createWorkoutData')
    )
    if (
      !createWorkoutData ||
      createWorkoutData.addedExercises.length <= 0 ||
      !createWorkoutData.restTimeData
    ) {
      // ! Add more validation in the future

      return setError('Please Enter / Re-enter Workout Data On Previous Page')
    }
    const workoutPath = createWorkoutData.addedExercises
    const { restTime, failedRestTime } = createWorkoutData.restTimeData
    const { title, description } = createWorkoutData
    const workoutData = {
      id: uuidv4(),
      restTime: timeToMS(restTime.minutes, restTime.seconds),
      failSetRestTime: timeToMS(failedRestTime.minutes, failedRestTime.seconds),
      dateCreated: new Date().getTime(),
      lastSetFailed: false,
      name: title,
      description,
      path: workoutPath,
    }
    if (workoutType === 'temp') {
      return startWorkout(workoutData).then(() => {
        localStorage.removeItem('createWorkoutData')
        navigate('/workout')
      })
    } else if (workoutType === 'saved') {
      return createWorkout(workoutData).then(() => {
        localStorage.removeItem('createWorkoutData')
        navigate('/workout')
      })
    }
    return setError(
      'Something went wrong, try refreshing or re-entering workout data.'
    )
  }

  return (
    <div className='create-workout-page workout-type-selection'>
      <BackButton />
      <div className='title'>Workout Type</div>
      {error && (
        <div className='error' data-testid='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
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

const mapDispatchToProps = dispatch => {
  return {
    startWorkout: workoutData => dispatch(startWorkout(workoutData)),
    createWorkout: workoutData => dispatch(createWorkout(workoutData)),
  }
}

export default connect(null, mapDispatchToProps)(WorkoutTypeSelection)
