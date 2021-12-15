import React, { useState, useEffect, useRef } from 'react'
import { formatTime } from '../../util/formatTime'
import Timer from './Timer'
import '../../assets/styles/components/workout/workout-timer.scss'
import { useWorkout } from '../../contexts/WorkoutContext'

const TimerContainer = ({ timerStart, restTime, setIsTimer }) => {
  const [timerVal, setTimerVal] = useState()

  const { updateWorkout } = useWorkout()

  const skipRestBtn = useRef()

  const clearTimer = timer => {
    clearInterval(timer)
    setIsTimer(false)
    updateWorkout({
      'runningWorkout.timer.isTimer': false,
    })
  }

  const skipTimer = (ref, timer) => {
    const handler = e => {
      console.log('IM HERE POELE')
      if (timer) {
        clearTimer(timer)
      }
    }
    ref.current.addEventListener('click', handler)

    return () => {
      ref.current.removeEventListener('click', handler)
    }
  }

  useEffect(() => {
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
  }, [])

  return <Timer timerVal={timerVal} skipRestBtn={skipRestBtn} />
}

export default TimerContainer
