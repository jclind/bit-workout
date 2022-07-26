import React, { useState, useEffect } from 'react'
import { calculatePlates } from '../../../../util/calculatePlates'
import { AiOutlineRight } from 'react-icons/ai'
import { timeToMS } from '../../../../util/timeToMS'
import { formatTime } from '../../../../util/formatTime'

const TimedSetExercise = ({
  currActiveWorkoutExercise,
  currExercise,
  currSetIdx,
  setIsWorkoutPathModalOpen,
}) => {
  const sets = currActiveWorkoutExercise.sets
  const currSet = sets[currSetIdx - 1]
  const numSets = sets.length
  const currSetWeight = currSet.weight

  const { name: exerciseName, imageURL, exerciseID } = currExercise

  const plateWeights = calculatePlates(45, currSetWeight)

  const time = currSet.time
  const timeMS = timeToMS(time.minutes, time.seconds)

  const [isCountDown, setIsCountDown] = useState(false)
  const [timerVal, setTimerVal] = useState(formatTime(timeMS))
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  let countDownTimer
  let exerciseTimer
  const handleTimerStartStop = () => {
    const startExerciseTimer = () => {
      let timerStart = new Date().getTime()

      exerciseTimer = setInterval(() => {
        // Get current time and subtract start time to get total elapsed time
        const elapsed = new Date().getTime() - timerStart

        // Format elapsed time to milliseconds
        const elapsedMS = Math.round(elapsed / 1000) * 1000
        // Get time left on timer
        let timeLeft = timeMS - elapsedMS

        if (timeLeft < 0) {
          timeLeft = 0
        }

        setTimerVal(Math.round(timeLeft / 1000))
        if (timeLeft <= 0) {
          clearInterval(exerciseTimer)
          setIsTimerRunning(false)
        }
      }, 100)
    }

    if (!isTimerRunning) {
      console.log('I"M HERE')
      setIsCountDown(true)
      setIsTimerRunning(true)

      let timerStart = new Date().getTime()

      countDownTimer = setInterval(() => {
        // Get current time and subtract start time to get total elapsed time
        const elapsed = new Date().getTime() - timerStart

        // Format elapsed time to milliseconds
        const elapsedMS = Math.round(elapsed / 1000) * 1000
        // Get time left on timer
        let timeLeft = 10000 - elapsedMS

        if (timeLeft < 0) {
          timeLeft = 0
        }

        setTimerVal(Math.round(timeLeft / 1000))
        if (timeLeft <= 0) {
          clearInterval(countDownTimer)
          setIsCountDown(false)
          startExerciseTimer()
        }
      }, 100)
    } else {
      console.log(countDownTimer, exerciseTimer)
      clearInterval(countDownTimer)
      clearInterval(exerciseTimer)
      setTimerVal('0:00')
      setIsTimerRunning(false)
      setIsCountDown(false)
    }
  }

  return (
    <>
      <div className='rep-set-text'>{`Set ${currSetIdx} of ${numSets}, Reps for given time`}</div>
      <div className='workout-data'>
        <div
          className='exercise-weight'
          // onClick={() => setIsPlatesModalOpen(true)}
        >
          <span>{currSetWeight} lbs</span>
          {/* <AiFillInfoCircle className='icon' /> */}
        </div>
        <div className='exercise-img-container'>
          <img src={imageURL} alt={exerciseName} className='exercise-img' />
        </div>
        <button
          className='view-workout-path'
          onClick={() => setIsWorkoutPathModalOpen(true)}
        >
          Workout Path <AiOutlineRight className='icon' />
        </button>
        <div className='timer'>
          <div className='text'>{isCountDown && 'Get Ready:'}</div>
          <div className='time'>{timerVal}</div>
        </div>
      </div>
      <div className='options'>
        <button className='submit-btn' onClick={handleTimerStartStop}>
          {isTimerRunning ? 'Skip Timer' : 'Start Timer'}
        </button>
      </div>
    </>
  )
}

export default TimedSetExercise
