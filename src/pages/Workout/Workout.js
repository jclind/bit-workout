import React from 'react'
import { useWorkout } from '../../contexts/WorkoutContext'
import WorkoutSelection from '../../components/Workout/WorkoutSelection'
import ActiveWorkoutContainer from '../../components/Workout/ActiveWorkoutContainer'
import WorkoutComplete from '../../components/Workout/WorkoutComplete'

const Workout = () => {
  const { workoutData, isWorkoutFinished } = useWorkout()

  const { isWorkoutRunning } = workoutData

  return (
    <>
      <div className='page'>
        {isWorkoutFinished ? (
          <WorkoutComplete />
        ) : isWorkoutRunning ? (
          <>
            <ActiveWorkoutContainer />
          </>
        ) : (
          <WorkoutSelection />
        )}
      </div>
    </>
  )
}

export default Workout
