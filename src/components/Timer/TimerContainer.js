import React, { useState, useEffect } from 'react'
import { formatTime } from '../../util/formatTime'
import Timer from './Timer'

const TimerContainer = ({ timerStart, restTime, setIsTimer }) => {
  const [timerVal, setTimerVal] = useState()

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
        clearInterval(timer)
        setIsTimer(false)
      }
    }, 100)
  }, [])

  return <Timer timerVal={timerVal} />
}

export default TimerContainer
