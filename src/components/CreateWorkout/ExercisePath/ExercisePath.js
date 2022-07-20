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

const ExercisePath = ({ setSelectedType, path, type, setPath, setError }) => {
  const [exerciseType, setExerciseType] = useState(type || null)
  const [exercisePath, setExercisePath] = useState(path || [])

  useEffect(() => {
    setExercisePath([]) // Important for clearing path when type changes to avoid errors
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
        <StraightSet
          exercisePath={exercisePath}
          setExercisePath={setExercisePath}
          setError={setError}
        />
      )
    } else if (type === 'drop') {
      return (
        <DropSet
          exercisePath={exercisePath}
          setExercisePath={setExercisePath}
          setError={setError}
        />
      )
    } else if (type === 'timed') {
      return (
        <TimerSet
          exercisePath={exercisePath}
          setExercisePath={setExercisePath}
          setError={setError}
        />
      )
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
