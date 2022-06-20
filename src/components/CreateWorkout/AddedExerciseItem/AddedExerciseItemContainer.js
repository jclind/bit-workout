import React, { useState, useEffect } from 'react'
import useClickOutside from '../../../util/useClickOutside'
import AddedExerciseItem from './AddedExerciseItem'

const AddedExerciseItemContainer = ({
  item,
  changeAddedExerciseData,
  deleteAddedExercise,
}) => {
  const id = item.id

  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')

  useEffect(() => {
    if (reps && reps !== item.reps) {
      changeAddedExerciseData({ reps }, id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reps])
  useEffect(() => {
    if (sets && sets !== item.sets) {
      changeAddedExerciseData({ sets }, id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sets])

  const [isDropdown, setIsDropdown] = useState(false)
  const [exerciseSearchVal, setExerciseSearchVal] = useState('')
  const [selectedExercise, setSelectedExercise] = useState(item.exercise)

  const exerciseContainer = useClickOutside(() => {
    setIsDropdown(false)
  })

  const selectExercise = ex => {
    changeAddedExerciseData({ exercise: ex }, id)
    setSelectedExercise(ex)
    toggleDropdown()
  }

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown)
    setExerciseSearchVal('')
  }
  return (
    <AddedExerciseItem
      id={id}
      selectedExercise={selectedExercise}
      selectExercise={selectExercise}
      exerciseContainer={exerciseContainer}
      toggleDropdown={toggleDropdown}
      isDropdown={isDropdown}
      exerciseSearchVal={exerciseSearchVal}
      setExerciseSearchVal={setExerciseSearchVal}
      reps={reps}
      setReps={setReps}
      sets={sets}
      setSets={setSets}
      deleteAddedExercise={deleteAddedExercise}
    />
  )
}

export default AddedExerciseItemContainer
