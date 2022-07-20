import React, { useState } from 'react'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import ExerciseTypeDropdown from '../ExerciseTypeDropdown/ExerciseTypeDropdown'
import DropSet from './DropSet/DropSet'
import './ExercisePath.scss'
import StraightSet from './StraightSet/StraightSet'
import TimerSet from './TimerSet/TimerSet'

const options = [
  { value: 'straight', label: 'Straight Sets' },
  { value: 'drop', label: 'Drop Sets' },
  { value: 'timed', label: 'Timed Sets' },
]

const ExercisePath = () => {
  const [exerciseType, setExerciseType] = useState(null)

  useEffect(() => {
    console.log(exerciseType)
  }, [exerciseType])

  const [straightSetPath, setStraightSetPath] = useState([
    {
      weight: null,
      reps: null,
      id: uuidv4(),
    },
  ])

  // Drop Set values
  const [startWeight, setStartWeight] = useState('')
  const [endWeight, setEndWeight] = useState('')
  const [weightDecrease, setWeightDecrease] = useState('')

  const [timerSetPath, setTimerSetPath] = useState([
    {
      weight: null,
      time: { minutes: null, seconds: null },
      id: uuidv4(),
    },
  ])

  const exerciseTypeElement = type => {
    if (!type) return null

    if (type.value === 'straight') {
      return <StraightSet path={straightSetPath} setPath={setStraightSetPath} />
    } else if (type.value === 'drop') {
      return (
        <DropSet
          startWeight={startWeight}
          setStartWeight={setStartWeight}
          endWeight={endWeight}
          setEndWeight={setEndWeight}
          weightDecrease={weightDecrease}
          setWeightDecrease={setWeightDecrease}
        />
      )
    } else if (type.value === 'timed') {
      return <TimerSet path={timerSetPath} setPath={setTimerSetPath} />
    }
    return null
  }

  return (
    <div className='exercise-path'>
      <div className='exercise-type-selector'>
        <ExerciseTypeDropdown
          options={options}
          exerciseType={exerciseType}
          setExerciseType={setExerciseType}
        />
      </div>
      {exerciseTypeElement(exerciseType)}
    </div>
  )
}

export default ExercisePath
