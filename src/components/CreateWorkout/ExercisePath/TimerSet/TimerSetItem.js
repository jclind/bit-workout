import React, { useState, useEffect, useRef } from 'react'

const TimerSetItem = ({ path, set, idx, setPathData }) => {
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
    if (newVal >= 6) {
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
          <div className='minutes'>
            <input
              type='number'
              className='minutes-input'
              placeholder='1'
              value={minutes}
              onChange={handleSetMinutes}
            />
            <label className='minutes-label'>Mins.</label>
          </div>
          <div className='seconds'>
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
        <div className='weight'>
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
      </div>
    </div>
  )
}

export default TimerSetItem
