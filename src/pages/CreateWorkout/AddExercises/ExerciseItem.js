import React, { useState } from 'react'
import ExercisePath from '../../../components/CreateWorkout/ExercisePath/ExercisePath'
import ExerciseSelectorDropdown from '../../../components/CreateWorkout/ExerciseSelectorDropdown/ExerciseSelectorDropdown'

const ExerciseItem = ({
  exerciseData,
  setExerciseData,
  deleteExercise,
  showErrors,
}) => {
  const { exercise, description, error, id } = exerciseData

  const [isDescription, setIsDescription] = useState(() => {
    if (description) return true

    return false
  })

  const setPath = val => {
    const prop = 'path'
    setExerciseData(prop, val, id)
  }
  const setSelectedType = val => {
    const prop = 'type'
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

      <ExercisePath
        setPath={setPath}
        setError={setError}
        setSelectedType={setSelectedType}
      />

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
      <button
        type='button'
        className='remove-exercise-btn btn'
        onClick={() => deleteExercise(id)}
      >
        Remove From List
      </button>
    </div>
  )
}

export default ExerciseItem
