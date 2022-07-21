import React, { useState } from 'react'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import { AiOutlineWarning } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'
import './WorkoutTypeSelection.scss'

const WorkoutTypeSelection = () => {
  const [workoutType, setWorkoutType] = useState('')

  const [error, setError] = useState('')

  const handleNextClick = () => {
    if (!workoutType) return setError('Please Select A Workout Type')

    if (workoutType === 'temp') {
      const workoutPath = JSON.parse(localStorage.getItem('addedExercises'))
      if (!workoutPath || workoutPath.length < 0) {
        // ! Add more validation in the future

        return setError('Please Enter / Re-enter Workout Data On Previous Page')
      }
      const newWorkout = {
        id: uuidv4(),
        restTime: null,
        failSetRestTime: null,
        authorUID: null,
        dateCreated: null,
        lastSetFailed: null,
        name: null,
        path: workoutPath,
      }

      // startSingleUseWorkout()
    } else if (workoutType === 'saved') {
      // const newWorkout = {
      //   id: uuidv4(),
      //   // name: workoutName,
      //   // restTime: restTimeMS > 0 ? restTimeMS : 90000,
      //   // failSetRestTime: failedRestTimeMS > 0 ? failedRestTimeMS : 300000,
      //   lastSetFailed: false,
      //   // path: addedExercises.map(ex => {
      //   //   return {
      //   //     id: uuidv4(),
      //   //     exerciseID: ex.exercise.id,
      //   //     reps: ex.reps,
      //   //     sets: ex.sets,
      //   //   }
      //   // }),
      // }
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

export default WorkoutTypeSelection
