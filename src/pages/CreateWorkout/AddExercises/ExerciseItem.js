import React, { useState } from 'react'
import { useEffect } from 'react'
import ExercisePath from '../../../components/CreateWorkout/ExercisePath/ExercisePath'
import ExerciseSelectorDropdown from '../../../components/CreateWorkout/ExerciseSelectorDropdown/ExerciseSelectorDropdown'

const ExerciseItem = ({ exerciseData, setExerciseData, showErrors }) => {
  const [isDescription, setIsDescription] = useState(false)

  const { exercise, description, error, id } = exerciseData

  const setPath = val => {
    const prop = 'path'
    setExerciseData(prop, val, id)
  }
  const setSelectedExercise = val => {
    const prop = 'exercise'
    setExerciseData(prop, val, id)
  }
  const setDescription = val => {
    const prop = 'description'
    setExerciseData(prop, val, id)
  }
  const setError = err => {
    const prop = 'error'
    setExerciseData(prop, err, id)
  }

  return (
    <div className='exercise-item'>
      {error && showErrors ? <div className='error'>{error}</div> : null}
      <ExerciseSelectorDropdown
        selectedExercise={exercise}
        setSelectedExercise={setSelectedExercise}
      />

      <ExercisePath setPath={setPath} setError={setError} />

      <div className='description-container'>
        {isDescription && (
          <textarea
            className='description'
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows='5'
            placeholder='Enter Description'
          ></textarea>
        )}
        <button
          className='add-description-btn'
          onClick={() => setIsDescription(!isDescription)}
        >
          {isDescription ? '- Remove Description' : '+ Add Description'}
        </button>
      </div>
    </div>
  )
}

export default ExerciseItem
