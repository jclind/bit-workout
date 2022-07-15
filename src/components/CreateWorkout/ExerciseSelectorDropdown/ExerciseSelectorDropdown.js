import React, { useState, useEffect } from 'react'
import ChooseExerciseBtn from '../ChooseExerciseBtn/ChooseExerciseBtn'
import ExerciseDropdown from '../ExerciseDropdown/ExerciseDropdown'
import useClickOutside from '../../../util/useClickOutside'
import './ExerciseSelectorDropdown.scss'

const ExerciseSelectorDropdown = ({
  selectedExercise,
  setSelectedExercise,
}) => {
  const [isDropdown, setIsDropdown] = useState(false)
  const toggleDropdown = () => setIsDropdown(!isDropdown)

  const handleSetSelectedExercise = exercise => {
    setSelectedExercise(exercise)
    toggleDropdown()
  }

  const [exerciseSearchVal, setExerciseSearchVal] = useState('')

  const exerciseContainer = useClickOutside(() => toggleDropdown())

  return (
    <div className='select-exercise-container' ref={exerciseContainer}>
      <ChooseExerciseBtn
        toggleDropdown={toggleDropdown}
        selectedExercise={selectedExercise}
      />
      <ExerciseDropdown
        isDropdown={isDropdown}
        exerciseSearchVal={exerciseSearchVal}
        setExerciseSearchVal={setExerciseSearchVal}
        selectExercise={handleSetSelectedExercise}
      />
    </div>
  )
}

export default ExerciseSelectorDropdown
