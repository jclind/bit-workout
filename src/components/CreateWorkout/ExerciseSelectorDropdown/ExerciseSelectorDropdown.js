import React, { useState } from 'react'
import ChooseExerciseBtn from '../ChooseExerciseBtn/ChooseExerciseBtn'
import ExerciseDropdown from '../ExerciseDropdown/ExerciseDropdown'
import useClickOutside from '../../../util/useClickOutside'
import './ExerciseSelectorDropdown.scss'

const ExerciseSelectorDropdown = ({
  selectedExerciseID,
  setSelectedExerciseID,
}) => {
  const [isDropdown, setIsDropdown] = useState(false)
  const toggleDropdown = () => setIsDropdown(!isDropdown)

  const handleSetSelectedExercise = exercise => {
    setSelectedExerciseID(exercise.id)
    setIsDropdown(false)
  }

  const [exerciseSearchVal, setExerciseSearchVal] = useState('')

  const exerciseContainer = useClickOutside(() => setIsDropdown(false))

  return (
    <div className='select-exercise-container' ref={exerciseContainer}>
      <ChooseExerciseBtn
        toggleDropdown={toggleDropdown}
        selectedExerciseID={selectedExerciseID}
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
