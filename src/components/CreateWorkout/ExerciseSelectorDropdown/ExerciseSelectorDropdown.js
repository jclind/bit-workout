import React, { useState, useRef } from 'react'
import ChooseExerciseBtn from '../ChooseExerciseBtn/ChooseExerciseBtn'
import ExerciseDropdown from '../ExerciseDropdown/ExerciseDropdown'
import useClickOutside from '../../../util/useClickOutside'
import './ExerciseSelectorDropdown.scss'
import { useEffect } from 'react'

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

  const searchInputRef = useRef('')

  useEffect(() => {
    if (isDropdown && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isDropdown])

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
        searchInputRef={searchInputRef}
      />
    </div>
  )
}

export default ExerciseSelectorDropdown
