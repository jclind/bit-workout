import React from 'react'

const StraightSetPathItem = ({ path, set, idx, setPathData }) => {
  const setReps = e => {
    const path = 'reps'
    const newVal = e.target.value

    if (newVal === '') return setPathData(path, '', idx)
    else if (isNaN(newVal) || newVal === '0') return
    if (newVal > 999) return

    setPathData(path, newVal, idx)
  }
  // const setWeight = e => {
  //   const path =
  // }

  // ! Need a better system for weight. Maybe add different kinds of exercises (Increase weight (by amount per set), decrease weight, stay the same, high rep) Maybe by percentage of max weight lifted per workout?

  return (
    <div className='path-item'>
      <label className='set-label'>Set {idx + 1}</label>
      <div className='reps'>
        <input
          className='reps-input'
          value={set.reps || ''}
          placeholder='8'
          type='number'
          onChange={setReps}
        />
        <label className='reps-label'>Reps</label>
      </div>

      {/* <div className='weight'>
        <input
          className='weight-input'
          value={set.weight || ''}
          placeholder='45'
          type='number'
          onChange={setWeight}
        />
        <label className='weight-label'>Lbs</label>
      </div> */}
    </div>
  )
}

export default StraightSetPathItem
