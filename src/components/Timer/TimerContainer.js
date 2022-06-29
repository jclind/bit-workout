import React, { useState, useEffect, useRef } from 'react'
import useSound from 'use-sound'
import timerFinishedSound from '../../assets/sounds/timer-finished.mp3'
import { formatTime } from '../../util/formatTime'
import Timer from './Timer'
import './Timer.scss'
import { connect } from 'react-redux'
import { updateWorkout } from '../../redux/actions/workout/workout'

const TimerContainer = ({
  timerStart,
  restTime,
  failSetRestTime,
  lastSetFailed,
  updateWorkout,
}) => {
  const [timerVal, setTimerVal] = useState()

  const [play] = useSound(timerFinishedSound)

  const skipRestBtn = useRef()

  useEffect(() => {
    const clearTimer = timer => {
      clearInterval(timer)
      updateWorkout({
        'runningWorkout.timer.isTimer': false,
      })
    }

    const skipTimer = (ref, timer) => {
      const handler = () => {
        if (timer) {
          clearTimer(timer)
        }
      }
      ref.current.addEventListener('click', handler)

      return () => {
        ref.current.removeEventListener('click', handler)
      }
    }

    let timer = setInterval(() => {
      // Get current time and subtract start time to get total elapsed time
      const elapsed = new Date().getTime() - timerStart

      // Format elapsed time to milliseconds
      const elapsedMS = Math.round(elapsed / 1000) * 1000
      // Get time left on timer
      let timeLeft = lastSetFailed
        ? failSetRestTime - elapsedMS
        : restTime - elapsedMS
      if (timeLeft < 0) {
        timeLeft = 0
      }

      setTimerVal(formatTime(timeLeft))
      if (timeLeft <= 0) {
        clearTimer(timer)
      }
    }, 100)
    skipTimer(skipRestBtn, timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerStart, restTime, updateWorkout])

  return (
    <Timer
      timerVal={timerVal}
      skipRestBtn={skipRestBtn}
      lastSetFailed={lastSetFailed}
    />
  )
}

const mapStateToProps = state => {
  const runningWorkout = state.workout.workoutData.runningWorkout
  return {
    restTime: runningWorkout.currWorkout.restTime,
    failSetRestTime: runningWorkout.currWorkout.failSetRestTime,
    lastSetFailed: runningWorkout.currWorkout.lastSetFailed,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateWorkout: data => dispatch(updateWorkout(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerContainer)
