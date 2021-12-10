import React, { useState, useEffect } from 'react'
import { useWorkout } from '../../contexts/WorkoutContext'
import WorkoutSelection from '../../components/Workout/WorkoutSelection'
import ActiveWorkoutContainer from '../../components/Workout/ActiveWorkoutContainer'
import { e1 } from '../../assets/data/e1'

const Workout = () => {
  const { workoutData, updateWorkout } = useWorkout()
  const [loading, setLoading] = useState(false)

  const { isWorkoutRunning } = workoutData

  const startWorkout = exercise => {
    const data = {
      isWorkoutRunning: true,
      runningWorkout: {
        remainingWorkout: { currIdx: 0, currSet: 1 },
        currWorkout: e1,
        timer: {
          isTimer: false,
          timerStart: null,
        },
      },
    }
    setLoading(true)
    updateWorkout(data).then(() => {
      setLoading(false)
    })
  }

  const stopWorkout = () => {
    const data = {
      isWorkoutRunning: false,
      runningWorkout: {
        remainingWorkout: null,
        currWorkout: null,
        timer: {
          isTimer: false,
          timerStart: null,
        },
      },
    }
    updateWorkout(data)
  }

  return (
    <>
      <div className='page'>
        {loading ? (
          'Loading thangs!!!'
        ) : (
          <>
            {isWorkoutRunning ? (
              <>
                <ActiveWorkoutContainer
                  workoutData={workoutData}
                  stopWorkout={stopWorkout}
                />
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
