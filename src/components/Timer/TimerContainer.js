import React, { useState, useEffect, useRef } from 'react'
import { formatTime } from '../../util/formatTime'
import Timer from './Timer'
import './Timer.scss'
import { connect } from 'react-redux'
import { updateWorkout } from '../../redux/actions/workout/workout'

const TimerContainer = ({ timerStart, restTime, updateWorkout, uid }) => {
  const [timerVal, setTimerVal] = useState()

  const skipRestBtn = useRef()

  useEffect(() => {
    const clearTimer = timer => {
      clearInterval(timer)
      updateWorkout(
        {
          'runningWorkout.timer.isTimer': false,
        },
        uid
      )
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
      // Get current time and subtrack start time to get total elapsed time
      const elapsed = new Date().getTime() - timerStart

      // Format elapsed time to milliseconds
      const elapsedMS = Math.round(elapsed / 1000) * 1000
      // Get time left on timer
      const timeLeft = restTime - elapsedMS

      setTimerVal(formatTime(timeLeft))
      if (timeLeft <= 0) {
        clearTimer(timer)
      }
    }, 100)
    skipTimer(skipRestBtn, timer)
  }, [timerStart, restTime, updateWorkout, uid])

  return <Timer timerVal={timerVal} skipRestBtn={skipRestBtn} />
}

const mapStateToProps = state => {
  return {
    uid: state.auth.userAuth ? state.auth.userAuth.uid : null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateWorkout: (data, uid) => dispatch(updateWorkout(data, uid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimerContainer)
