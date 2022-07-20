import React, { useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const StraightSetPathItem = ({ path, set, idx, setPathData, removeSet }) => {
  const repsRef = useRef()

  const setReps = e => {
    const path = 'reps'
    const newVal = e.target.value

    if (newVal === '') return setPathData(path, '', idx)
    else if (isNaN(newVal) || newVal === '0') return
    if (newVal > 999) return

    setPathData(path, newVal, idx)
  }

  return (
    <div className='path-item'>
      <label className='set-label'>Set {idx + 1}</label>
      <div className='reps' onClick={() => repsRef.current.select()}>
        <input
          className='reps-input'
          value={set.reps || ''}
          placeholder='8'
          type='number'
          onChange={setReps}
          ref={repsRef}
        />
        <label className='reps-label'>Reps</label>
      </div>
      <button className='delete-item-btn' onClick={() => removeSet(set.id)}>
        <AiOutlineClose className='icon' />
      </button>
    </div>
  )
}

export default StraightSetPathItem
