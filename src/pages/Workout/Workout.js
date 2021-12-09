import React from 'react'
import { useWorkout } from '../../contexts/WorkoutContext'
import WorkoutSelection from '../../components/Workout/WorkoutSelection'

const Workout = () => {
  const { workoutData, updateWorkout } = useWorkout()

  const { isWorkoutRunning } = workoutData

  const startWorkout = exercise => {
    const data = { prop: 'isWorkoutRunning', val: true }
    updateWorkout(data)
  }
  const stopWorkout = () => {
    const data = { prop: 'isWorkoutRunning', val: false }
    updateWorkout(data)
  }
  return (
    <>
      <div className='page'>
        WORKOUT PAGE
        {isWorkoutRunning ? (
          <>
            '🗿'
            <button className='submit-button' onClick={stopWorkout}>
              Stop Workout
            </button>
          </>
        ) : (
          <WorkoutSelection startWorkout={startWorkout} />
        )}
      </div>
    </>
  )
}

export default Workout
