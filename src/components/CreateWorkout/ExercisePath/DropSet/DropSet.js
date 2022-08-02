import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './DropSet.scss'

const DropSet = ({ setExercisePath, setError, idx }) => {
  const localData = JSON.parse(localStorage.getItem('createWorkoutData'))
    ?.addedExercises[idx]
  const localSetData = localData?.sets
  const [startWeight, setStartWeight] = useState(() => {
    if (localSetData && localSetData.length > 0) {
      return localSetData[0].weight
    }
    return ''
  })
  const [endWeight, setEndWeight] = useState(() => {
    if (localSetData && localSetData.length > 0) {
      return localSetData[localSetData.length - 1].weight
    }
    return ''
  })
  const [weightDecrease, setWeightDecrease] = useState(() => {
    if (localSetData && localSetData.length > 1) {
      const difference = localSetData[0].weight - localSetData[1].weight
      return difference
    }
    return ''
  })
  console.log(localData, localSetData)

  const isInputValid = val => {
    const response = { error: '' }

    if (val === '') return response

    if (isNaN(val)) response.error = 'Value is not a number'
    else if (val <= 0) response.error = 'Value is less than 0'
    else if (val % 1 !== 0) response.error = 'Value must be a whole number'
    return response
  }
  const handleWeightInput = (e, setVal) => {
    const newVal = e.target.value
    let { error } = isInputValid(newVal)
    if (error) return

    setVal(newVal)
  }

  const createDropSetPath = (start, end, decrease) => {
    const path = []

    let counter = start
    while (counter > end) {
      path.push({
        weight: counter,
        id: uuidv4(),
      })
      counter -= decrease
    }

    path.push({
      weight: end,
      id: uuidv4(),
    })

    return path
  }
  const checkForError = (start, end, decrease) => {
    const response = { error: '' }

    const startEndDifference = start - end

    if (!start) response.error = 'No Start Weight Given'
    else if (!end) response.error = 'No End Weight Given'
    else if (!decrease) response.error = 'No Decreased Weight Given'
    else if (start % 5 !== 0 || end % 5 !== 0 || decrease % 5 !== 0)
      response.error = 'All Weight Values Must Be Multiples Of 5'
    else if (startEndDifference <= 0)
      response.error = 'Start Weight Must Be Greater Than End Weight'
    else if (startEndDifference < decrease)
      response.error =
        'Weight Decrease Cannot Be Less Than Start And End Weight Difference'

    return response
  }
  useEffect(() => {
    const { error } = checkForError(
      Number(startWeight),
      Number(endWeight),
      Number(weightDecrease)
    )

    if (error) {
      setError(error)
    } else {
      setError('')
      setExercisePath(
        createDropSetPath(
          Number(startWeight),
          Number(endWeight),
          Number(weightDecrease)
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startWeight, endWeight, weightDecrease])

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
