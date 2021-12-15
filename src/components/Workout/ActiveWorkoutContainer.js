import React, { useState, useEffect } from 'react'
import { useWorkout } from '../../contexts/WorkoutContext'
import ActiveWorkout from './ActiveWorkout'
import TimerContainer from '../Timer/TimerContainer'
import '../../assets/styles/components/workout/active-workout.scss'

const WorkoutContainer = () => {
  const { workoutData, currExercise, updateWorkout } = useWorkout()

  const {
    runningWorkout: {
      timer: { isTimer, timerStart },
      currWorkout: { restTime },
    },
  } = workoutData

  const setIsTimer = val => {
    updateWorkout({
      'runningWorkout.timer.isTimer': val,
    })
  }

  return (
    <>
      {isTimer && timerStart ? (
        <TimerContainer
          timerStart={timerStart}
          restTime={restTime}
          setIsTimer={setIsTimer}
        />
      ) : (
        <ActiveWorkout />
      )}
    </>
  )
}

export default WorkoutContainer
