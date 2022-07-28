import React, { useState, useRef } from 'react'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import { AiOutlineWarning } from 'react-icons/ai'
import './RestTimeData.scss'
import { useNavigate } from 'react-router-dom'

const RestTimeData = () => {
  const createWorkoutData = JSON.parse(
    localStorage.getItem('createWorkoutData')
  )
  const restTimeData = createWorkoutData && createWorkoutData.restTimeData
  const [restTimeMinutes, setRestTimeMinutes] = useState(
    restTimeData ? restTimeData.restTime.minutes : 1
  )
  const [restTimeSeconds, setRestTimeSeconds] = useState(
    restTimeData ? restTimeData.restTime.seconds : 30
  )
  const [failedRestTimeMinutes, setFailedRestTimeMinutes] = useState(
    restTimeData ? restTimeData.failedRestTime.minutes : 5
  )
  const [failedRestTimeSeconds, setFailedRestTimeSeconds] = useState(
    restTimeData ? restTimeData.failedRestTime.seconds : 0
  )

  const restTimeMinutesRef = useRef()
  const restTimeSecondsRef = useRef()
  const failedRestTimeMinutesRef = useRef()
  const failedRestTimeSecondsRef = useRef()
  const nextBtnRef = useRef()

  const navigate = useNavigate()

  const [error, setError] = useState('')

  const handleMinutesChange = (e, setVal, ref) => {
    const newVal = e.target.value

    if (newVal === '') return setVal('')
    if (isNaN(newVal) || newVal >= 10 || newVal < 0 || newVal.length > 1) return

    setVal(newVal)
    if (ref) ref.current.select()
  }
  const handleSecondsChange = (e, setVal, ref) => {
    const newVal = e.target.value

    if (newVal === '') return setVal('')
    if (isNaN(newVal) || newVal >= 60 || newVal < 0 || newVal.length > 2) return

    setVal(newVal)
    if (ref && newVal.length === 2) {
      ref.current.select()
    }
  }

  const handleNextClick = () => {
    setError('')
    if (
      (!restTimeMinutes && !restTimeSeconds) ||
      (!failedRestTimeMinutes && !failedRestTimeSeconds)
    )
      return setError('All Inputs Must Be Filled')

    const restTimeData = {
      restTime: { minutes: restTimeMinutes, seconds: restTimeSeconds },
      failedRestTime: {
        minutes: failedRestTimeMinutes,
        seconds: failedRestTimeSeconds,
      },
    }
    const createWorkoutData = JSON.parse(
      localStorage.getItem('createWorkoutData')
    )
    const updatedCreateWorkoutData = { ...createWorkoutData, restTimeData }
    localStorage.setItem(
      'createWorkoutData',
      JSON.stringify({ ...updatedCreateWorkoutData })
    )

    navigate('/create-workout/workout-info')
  }

  return (
    <div className='create-workout-page rest-time-data'>
      <BackButton />
      <div className='title'>Workout Type</div>
      {error && (
        <div className='error' data-testid='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
      <div className='inputs-container'>
        <div className='rest-time'>
          <label>Rest Between Sets:</label>
          <div className='inputs'>
            <div
              className='minutes'
              onClick={() => restTimeMinutesRef.current.select()}
            >
              <input
                type='number'
                placeholder='1'
                value={restTimeMinutes}
                onChange={e =>
                  handleMinutesChange(e, setRestTimeMinutes, restTimeSecondsRef)
                }
                ref={restTimeMinutesRef}
              />
              <div className='text'>Mins.</div>
            </div>
            <div
              className='seconds'
              onClick={() => restTimeSecondsRef.current.select()}
            >
              <input
                type='number'
                placeholder='30'
                value={restTimeSeconds}
                onChange={e =>
                  handleSecondsChange(
                    e,
                    setRestTimeSeconds,
                    failedRestTimeMinutesRef
                  )
                }
                ref={restTimeSecondsRef}
              />
              <div className='text'>Secs.</div>
            </div>
          </div>
        </div>
        <div className='failed-rest-time'>
          <label>Rest Between Failed Sets:</label>
          <div className='inputs'>
            <div
              className='minutes'
              onClick={() => failedRestTimeMinutesRef.current.select()}
            >
              <input
                type='number'
                placeholder='1'
                value={failedRestTimeMinutes}
                onChange={e =>
                  handleMinutesChange(
                    e,
                    setFailedRestTimeMinutes,
                    failedRestTimeSecondsRef
                  )
                }
                ref={failedRestTimeMinutesRef}
              />
              <div className='text'>Mins.</div>
            </div>
            <div
              className='seconds'
              onClick={() => failedRestTimeSecondsRef.current.select()}
            >
              <input
                type='number'
                placeholder='30'
                value={failedRestTimeSeconds}
                ref={failedRestTimeSecondsRef}
                onChange={e => handleSecondsChange(e, setFailedRestTimeSeconds)}
              />
              <div className='text'>Secs.</div>
            </div>
          </div>
        </div>
      </div>
      <button className='next-btn' onClick={handleNextClick} ref={nextBtnRef}>
        NEXT
      </button>
    </div>
  )
}

export default RestTimeData
