import React, { useState, useRef } from 'react'
import { calculatePlates } from '../../../../util/calculatePlates'
import { AiOutlineRight } from 'react-icons/ai'
import { timeToMS } from '../../../../util/timeToMS'
import { formatTime } from '../../../../util/formatTime'
import RepInputModal from '../RepInputModal/RepInputModal'
import PlatesModal from '../../PlatesModal/PlatesModal'
import { AiFillInfoCircle, AiOutlinePlusCircle } from 'react-icons/ai'

const TimedSetExercise = ({
  currActiveWorkoutExercise,
  currExercise,
  currSetIdx,
  setIsWorkoutPathModalOpen,
  completeSet,
  addWarmup,
}) => {
  const [isRepInputModalOpen, setIsRepInputModalOpen] = useState(false)
  const [isPlatesModalOpen, setIsPlatesModalOpen] = useState(false)

  const sets = currActiveWorkoutExercise.sets
  const currSet = sets[currSetIdx - 1]
  const numSets = sets.length
  const currSetWeight = currSet?.weight

  const exerciseIsWeighted = currExercise.weights

  const { name: exerciseName, imageURL, id: exerciseID } = currExercise

  const plateWeights = calculatePlates(45, currSetWeight)

  const time = currSet?.time
  const timeMS = timeToMS(time?.minutes, time?.seconds)

  const [isCountDown, setIsCountDown] = useState(false)
  const [timerVal, setTimerVal] = useState(formatTime(timeMS))
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isTimerFinished, setIsTimerFinished] = useState(false)

  let countDownTimer = useRef(null)
  let exerciseTimer = useRef(null)
  const handleStartTimer = () => {
    const startExerciseTimer = () => {
      if (exerciseTimer.current) return

      let timerStart = new Date().getTime()

      exerciseTimer.current = setInterval(() => {
        // Get current time and subtract start time to get total elapsed time
        const elapsed = new Date().getTime() - timerStart

        // Format elapsed time to milliseconds
        const elapsedMS = Math.round(elapsed / 1000) * 1000
        // Get time left on timer
        let timeLeft = timeMS - elapsedMS

        if (timeLeft < 0) {
          timeLeft = 0
        }
        setTimerVal(formatTime(timeLeft))
        if (timeLeft <= 0) {
          clearInterval(exerciseTimer.current)
          setIsTimerRunning(false)
          setIsRepInputModalOpen(true)
          setIsTimerFinished(true)
        }
      }, 100)
    }

    if (!isTimerRunning && !countDownTimer.current) {
      setIsCountDown(true)
      setIsTimerRunning(true)

      let timerStart = new Date().getTime()

      countDownTimer.current = setInterval(() => {
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
          clearInterval(countDownTimer.current)
          setIsCountDown(false)
          startExerciseTimer()
        }
      }, 100)
    }
  }
  const handleSkipTimer = () => {
    if (countDownTimer.current) {
      clearInterval(countDownTimer.current)
    }
    countDownTimer.current = null
    if (exerciseTimer.current) {
      clearInterval(exerciseTimer.current)
    }
    exerciseTimer.current = null

    setIsCountDown(false)
    setIsTimerRunning(false)
    setTimerVal(formatTime(timeMS))
    setIsRepInputModalOpen(true)
  }

  return (
    <>
      <div className='rep-set-text'>{`Set ${currSetIdx} of ${numSets}, Reps for given time`}</div>
      {exerciseIsWeighted &&
      currSetIdx === 1 &&
      !isTimerRunning &&
      !isRepInputModalOpen ? (
        <button
          className='add-warmup'
          onClick={() => {
            addWarmup(currSetWeight)
          }}
        >
          <AiOutlinePlusCircle className='icon' />
          Add Warmup Sets
        </button>
      ) : null}
      <div className='workout-data'>
        <div
          className='exercise-weight'
          onClick={() => {
            if (exerciseIsWeighted) {
              setIsPlatesModalOpen(true)
            }
          }}
        >
          {exerciseIsWeighted ? (
            <>
              <span>{currSetWeight} lbs</span>
              <AiFillInfoCircle className='icon' />
            </>
          ) : (
            'No Weights'
          )}
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
      </div>
      <div className='options'>
        <div className='timer'>
          <div className='text'>
            {isCountDown ? 'Get Ready:' : 'Exercise Time:'}
          </div>
          <div className='time'>{timerVal}</div>
        </div>
        {isTimerRunning ? (
          <button className='submit-btn grayed' onClick={handleSkipTimer}>
            Skip Timer
          </button>
        ) : !isTimerFinished ? (
          <button className='submit-btn' onClick={handleStartTimer}>
            Start Timer
          </button>
        ) : (
          <button
            className='submit-btn'
            onClick={() => setIsRepInputModalOpen(true)}
          >
            Enter Completed Reps
          </button>
        )}
      </div>
      {isRepInputModalOpen ? (
        <RepInputModal
          onClose={() => {
            setIsRepInputModalOpen(false)
          }}
          completeSet={completeSet}
          numSets={numSets}
          exerciseID={exerciseID}
          weight={currSetWeight}
        />
      ) : null}
      {isPlatesModalOpen ? (
        <PlatesModal
          weights={plateWeights}
          onClose={() => {
            setIsPlatesModalOpen(false)
          }}
          currExercise={currExercise}
          exerciseWeight={currSetWeight}
          weightIsChangeable={false}
        />
      ) : null}
    </>
  )
}

export default TimedSetExercise
