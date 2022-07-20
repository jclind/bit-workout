import React, { useState } from 'react'
import ExercisePath from '../../../components/CreateWorkout/ExercisePath/ExercisePath'
import ExerciseSelectorDropdown from '../../../components/CreateWorkout/ExerciseSelectorDropdown/ExerciseSelectorDropdown'

const ExerciseItem = ({ exerciseData, setExerciseData }) => {
  const [isDescription, setIsDescription] = useState(false)

  const { exercise, description, path, id } = exerciseData

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

  return (
    <div className='exercise-item'>
      <ExerciseSelectorDropdown
        selectedExercise={exercise}
        setSelectedExercise={setSelectedExercise}
      />

      <ExercisePath setPath={setPath} />

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
