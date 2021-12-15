import React from 'react'
import '../../assets/styles/components/workout/workout-complete.scss'
import ConfettiAnim from '../ConfettiAnim'
import { useWorkout } from '../../contexts/WorkoutContext'

const WorkoutComplete = () => {
  const { setIsWorkoutFinished } = useWorkout()

  const returnFromWorkout = async () => {
    await setIsWorkoutFinished(false)
  }

  return (
    <div className='workout-complete page'>
      <ConfettiAnim className='anim' />
      <div className='content'>
        <div className='title'>Workout Complete!</div>
        <div className='text'>Well done on completing your workout!</div>
        <button className='back-home-btn' onClick={returnFromWorkout}>
          Back Home
        </button>
      </div>
    </div>
  )
}

export default WorkoutComplete
