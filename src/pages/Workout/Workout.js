import React, { useState } from 'react'
import { useWorkout } from '../../contexts/WorkoutContext'
import WorkoutSelection from '../../components/Workout/WorkoutSelection'
// import ActiveWorkoutContainer from '../../components/Workout/ActiveWorkoutContainer'

const Workout = () => {
  const { workoutData, updateWorkout } = useWorkout()
  const [loading, setLoading] = useState(false)

  const { isWorkoutRunning } = workoutData

  const startWorkout = exercise => {
    const data = { prop: 'isWorkoutRunning', val: true }
    setLoading(true)
    updateWorkout(data).then(() => {
      setLoading(false)
    })
  }
  const stopWorkout = () => {
    const data = [{ prop: 'isWorkoutRunning', val: false }]
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
