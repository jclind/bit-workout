import React from 'react'
import ExercisePath from '../../../components/CreateWorkout/ExercisePath/ExercisePath'
import ExerciseSelectorDropdown from '../../../components/CreateWorkout/ExerciseSelectorDropdown/ExerciseSelectorDropdown'

const ExerciseItem = ({ exerciseData, setExerciseData }) => {
  const {
    exercise,
    reps,
    sets,
    restTime,
    failedRestTime,
    description,
    path,
    id,
  } = exerciseData

  const setSelectedExercise = val => {
    const prop = 'exercise'
    setExerciseData(prop, val, id)
  }

  return (
    <div className='exercise-item'>
      <ExerciseSelectorDropdown
        selectedExercise={exercise}
        setSelectedExercise={setSelectedExercise}
      />
      <ExercisePath />
    </div>
  )
}

export default ExerciseItem
