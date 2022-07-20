import React, { useState, useEffect } from 'react'
import './DropSet.scss'

const DropSet = ({
  startWeight,
  setStartWeight,
  endWeight,
  setEndWeight,
  weightDecrease,
  setWeightDecrease,
}) => {
  console.log('here 1')
  const isValid = val => {
    console.log('here 2')
    const response = { error: '' }

    if (val === '') return response

    if (isNaN(val)) response.error = 'Value is not a number'
    else if (val <= 0) response.error = 'Value is less than 0'
    else if (val % 1 !== 0) response.error = 'Value must be a whole number'
    return response
  }

  const handleWeightInput = (e, setVal) => {
    const newVal = e.target.value
    let { error } = isValid(newVal)
    if (error) return

    setVal(newVal)
  }

  return (
    <div className='drop-set'>
      <div className='weight-inputs'>
        <div className='start-weight'>
          <label>Start Weight:</label>
          <input
            type='number'
            className='start-weight-input'
            placeholder='80'
            value={startWeight}
            onChange={e => handleWeightInput(e, setStartWeight)}
          />
        </div>
        <div className='end-weight'>
          <label>End Weight:</label>
          <input
            type='number'
            className='end-weight-input'
            placeholder='40'
            value={endWeight}
            onChange={e => handleWeightInput(e, setEndWeight)}
          />
        </div>
      </div>
      <div className='weight-decrease'>
        <label>Amt. Decrease Per Set (lbs)</label>
        <input
          type='number'
          className='weight-decrease-input'
          placeholder='5'
          value={weightDecrease}
          onChange={e => handleWeightInput(e, setWeightDecrease)}
        />
      </div>
    </div>
  )
}

export default DropSet
