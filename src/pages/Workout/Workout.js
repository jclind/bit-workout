import React, { useState, useEffect } from 'react'
import { useWorkout } from '../../contexts/WorkoutContext'
import WorkoutSelection from '../../components/Workout/WorkoutSelection'
// import ActiveWorkoutContainer from '../../components/Workout/ActiveWorkoutContainer'

const Workout = () => {
  const { workoutData, updateWorkout } = useWorkout()
  const [loading, setLoading] = useState(false)

  const { isWorkoutRunning } = workoutData

  const startWorkout = exercise => {
    const data = { isWorkoutRunning: true }
    setLoading(true)
    updateWorkout(data).then(() => {
      console.log(workoutData)
      setLoading(false)
    })
  }
  const stopWorkout = () => {
    const data = { isWorkoutRunning: false }
    updateWorkout(data)
  }
  return (
    <>
      <div className='page'>
        WORKOUT PAGE
        {loading ? (
          'Loading thangs!!!'
        ) : (
          <>
            {isWorkoutRunning ? (
              <>
                bingo
                <button className='submit-btn' onClick={stopWorkout}>
                  Stop Workout
                </button>
                {/* <ActiveWorkoutContainer /> */}
              </>
            ) : (
              <WorkoutSelection startWorkout={startWorkout} />
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Workout
