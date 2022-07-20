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

const ExercisePath = () => {
  const [exerciseType, setExerciseType] = useState(null)

  useEffect(() => {
    console.log(exerciseType)
  }, [exerciseType])

  const ExerciseTypeElement = ({ type }) => {
    if (!type) return null

    if (type.value === 'straight') {
      return <StraightSet />
    } else if (type.value === 'drop') {
      return <DropSet />
    } else if (type.value === 'timed') {
      return <TimerSet />
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
      <ExerciseTypeElement type={exerciseType} />
    </div>
  )
}

export default ExercisePath
