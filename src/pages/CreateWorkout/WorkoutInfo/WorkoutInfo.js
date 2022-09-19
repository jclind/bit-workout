import React, { useState } from 'react'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import { AiOutlineWarning } from 'react-icons/ai'
import './WorkoutInfo.scss'
import { connect } from 'react-redux'
import { getSingleExercise } from '../../../redux/actions/workout/workout'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const WorkoutData = ({ getSingleExercise }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [error, setError] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  // If the user is not routing from previous create workout page, re-route to first create workout page
  useEffect(() => {
    if (location?.state?.prev !== 'rest-time') {
      navigate('/create-workout')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNextClick = () => {
    const createWorkoutData = JSON.parse(
      localStorage.getItem('createWorkoutData')
    )
    const exercises = createWorkoutData.addedExercises

    let finalTitle = ''
    if (!title) {
      exercises.slice(0, 3).forEach((ex, idx, currArr) => {
        let exerciseName
        try {
          exerciseName = getSingleExercise(ex.exerciseID).name
        } catch (err) {
          return setError(err)
        }
        finalTitle += exerciseName
        if (idx !== currArr.length - 1) {
          finalTitle += ', '
        }
      })
    } else {
      finalTitle = title
    }

    localStorage.setItem(
      'createWorkoutData',
      JSON.stringify({ ...createWorkoutData, title: finalTitle, description })
    )
    navigate('/create-workout/selection', { state: { prev: 'workout-info' } })
  }
  return (
    <div className='create-workout-page workout-info-page'>
      <BackButton />
      <div className='title'>Workout Info</div>
      <p className='description'>
        Optionally add title and description for workout:
      </p>
      {error && (
        <div className='error' data-testid='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
      <div className='inputs-container'>
        <div className='workout-title'>
          <input
            type='text'
            placeholder={'Title'}
            onChange={e => {
              setTitle(e.target.value.substring(0, 100))
            }}
            value={title}
          />
        </div>
        <div className='workout-description'>
          <textarea
            type='text'
            placeholder={'Description'}
            onChange={e => setDescription(e.target.value.substring(0, 320))}
            value={description}
            rows='6'
          />
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
    getSingleExercise: exerciseID => dispatch(getSingleExercise(exerciseID)),
  }
}

export default connect(null, mapDispatchToProps)(WorkoutData)
