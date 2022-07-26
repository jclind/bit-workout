import React, { useState, useEffect, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const TimerSetItem = ({ set, idx, setPathData, removeSet }) => {
  const [minutes, setMinutes] = useState(() => {
    return set && set.time.minutes ? set.time.minutes : ''
  })
  const [seconds, setSeconds] = useState(() => {
    return set && set.time.seconds ? set.time.seconds : ''
  })
  const [weight, setWeight] = useState(() => {
    return set && set.weight ? set.weight : ''
  })

  useEffect(() => {
    if (minutes || seconds) {
      setPathData('time', { minutes, seconds }, idx)
    }
  }, [minutes, seconds])
  useEffect(() => {
    if (weight) {
      setPathData('weight', weight, idx)
    }
  }, [weight])

  const minutesRef = useRef()
  const secondsRef = useRef()
  const weightRef = useRef()

  const isValid = val => {
    const response = { error: '' }

    if (val === '') return response

    if (isNaN(val)) response.error = 'Value is not a number'
    else if (val < 0) response.error = 'Value is less than 0'
    else if (val % 1 !== 0) response.error = 'Value must be a whole number'
    return response
  }
  const handleSetMinutes = e => {
    const newVal = e.target.value
    const { error } = isValid(newVal)
    if (error) return

    if (newVal >= 10) return
    if (newVal > 0) {
      setMinutes(newVal)
      secondsRef.current.focus()
    }

    setMinutes(newVal)
  }
  const handleSetSeconds = e => {
    const newVal = e.target.value
    const { error } = isValid(newVal)
    if (error) return

    if (newVal >= 60 || newVal.length >= 3) return
    if (newVal >= 6 || newVal.length === 2) {
      setSeconds(newVal)
      weightRef.current.focus()
    }

    setSeconds(newVal)
  }
  const handleSetWeight = e => {
    const newVal = e.target.value
    const { error } = isValid(newVal)
    if (error) return

    if (newVal >= 1000) return
    setWeight(newVal)
  }

  return (
    <div className='path-item'>
      <label className='set-label'>Set {idx + 1}</label>
      <div className='data'>
        <div className='time'>
          <div className='minutes' onClick={() => minutesRef.current.select()}>
            <input
              type='number'
              className='minutes-input'
              placeholder='1'
              value={minutes}
              onChange={handleSetMinutes}
              ref={minutesRef}
            />
            <label className='minutes-label'>Mins.</label>
          </div>
          <div className='seconds' onClick={() => secondsRef.current.select()}>
            <input
              type='number'
              className='seconds-input'
              placeholder='00'
              value={seconds}
              onChange={handleSetSeconds}
              ref={secondsRef}
            />
            <label className='seconds-label'>Secs.</label>
          </div>
        </div>
        <div className='weight' onClick={() => weightRef.current.select()}>
          <input
            className='weight-input'
            placeholder='45'
            type='number'
            value={weight}
            onChange={handleSetWeight}
            ref={weightRef}
          />
          <label className='weight-label'>Lbs</label>
        </div>
        <button className='delete-item-btn' onClick={() => removeSet(set.id)}>
          <AiOutlineClose className='icon' />
        </button>
      </div>
    </div>
  )
}

export default TimerSetItem
