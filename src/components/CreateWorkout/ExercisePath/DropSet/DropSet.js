import React from 'react'
import './DropSet.scss'

const DropSet = () => {
  return (
    <div className='drop-set'>
      <div className='weight-inputs'>
        <div className='start-weight'>
          <label>Start Weight:</label>
          <input
            type='number'
            className='start-weight-input'
            placeholder='80'
          />
        </div>
        <div className='end-weight'>
          <label>End Weight:</label>
          <input type='number' className='end-weight-input' placeholder='40' />
        </div>
      </div>
      <div className='weight-decrease'>
        <label>Amt. Decrease Per Set (lbs)</label>
        <input
          type='number'
          className='weight-decrease-input'
          placeholder='5'
        />
      </div>
    </div>
  )
}

export default DropSet
