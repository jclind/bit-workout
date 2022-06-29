import React, { useEffect } from 'react'
import ActiveWorkout from './ActiveWorkout'
import TimerContainer from '../../Timer/TimerContainer'
import useSound from 'use-sound'
import timerFinishedSound from '../../../assets/sounds/timer-finished.mp3'
import './ActiveWorkout.scss'
import { connect } from 'react-redux'

const WorkoutContainer = ({ isTimer, timerStart }) => {
  const [play] = useSound(timerFinishedSound)

  useEffect(() => {
    if (!isTimer) {
      play()
    }
  }, [isTimer])
  return (
    <>
      {isTimer && timerStart ? (
        <TimerContainer timerStart={timerStart} />
      ) : (
        <ActiveWorkout />
      )}
    </>
  )
}

const mapStateToProps = state => {
  const runningWorkout = state.workout.workoutData.runningWorkout
  const timer = runningWorkout.timer
  return {
    isTimer: timer.isTimer,
    timerStart: timer.timerStart,
  }
}

export default connect(mapStateToProps, null)(WorkoutContainer)
