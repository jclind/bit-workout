import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { exerciseList } from '../../../assets/data/exerciseList'
import useClickOutside from '../../../util/useClickOutside'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { connect } from 'react-redux'
import { getSingleExercise } from '../../../redux/actions/workout/workout'
import { v4 as uuidv4 } from 'uuid'
import './AddExerciseToWorkoutModal.scss'
import ExerciseSelectorDropdown from '../../CreateWorkout/ExerciseSelectorDropdown/ExerciseSelectorDropdown'
import ExercisePath from '../../CreateWorkout/ExercisePath/ExercisePath'

const AddExerciseToWorkoutModal = ({
  onClose,
  currExerciseIdx,
  currSetIdx,
  workout,
  weights,
  getSingleExercise,
}) => {
  const [selectedExercise, setSelectedExercise] = useState({
    exerciseID: null,
    description: '',
    sets: null,
    type: null,
    id: uuidv4(),
    error: '',
  })

  const modalContent = useClickOutside(() => {
    onClose()
  })
  console.log(workout)

  const setSelectedExerciseID = exerciseID => {
    const updatedData = { ...selectedExercise, exerciseID }
    console.log(updatedData)
    setSelectedExercise(updatedData)
  }
  const setSets = sets => {
    const updatedData = { ...selectedExercise, sets }
    console.log(updatedData)
    setSelectedExercise(updatedData)
  }
  const setType = type => {
    const updatedData = { ...selectedExercise, type }
    console.log(updatedData)
    setSelectedExercise(updatedData)
  }

  return ReactDom.createPortal(
    <>
      <div className='add-exercise-to-workout-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='settings-title'>Add Workout</div>
          <div className='exercise-item-container'>
            <ExerciseSelectorDropdown
              selectedExerciseID={selectedExercise.exerciseID}
              setSelectedExerciseID={setSelectedExerciseID}
            />
            <ExercisePath
              sets={selectedExercise.sets}
              setSets={setSets}
              type={selectedExercise.type}
              setSelectedType={setType}
              setError={() => {}}
              selectedExerciseID={selectedExercise.exerciseID}
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleExercise: exerciseID => dispatch(getSingleExercise(exerciseID)),
  }
}

export default connect(null, mapDispatchToProps)(AddExerciseToWorkoutModal)
