import React, { useState } from 'react'
import { useEffect } from 'react'

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

const ExercisePath = ({ setSelectedType, setPath, setError }) => {
  const [exerciseType, setExerciseType] = useState(null)
  const [exercisePath, setExercisePath] = useState([])

  useEffect(() => {
    setSelectedType(exerciseType)
  }, [exerciseType])
  useEffect(() => {
    setPath(exercisePath)
  }, [exercisePath])

  // Drop Set values

  const exerciseTypeElement = type => {
    if (!type) return null

    if (type === 'straight') {
      return (
        <StraightSet setExercisePath={setExercisePath} setError={setError} />
      )
    } else if (type === 'drop') {
      return <DropSet setExercisePath={setExercisePath} setError={setError} />
    } else if (type === 'timed') {
      return <TimerSet setExercisePath={setExercisePath} setError={setError} />
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
