import React, { useState } from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../../util/useClickOutside'
import { addExerciseToWorkout } from '../../../redux/actions/workout/workout'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import './AddExerciseToWorkoutModal.scss'
import ExerciseSelectorDropdown from '../../CreateWorkout/ExerciseSelectorDropdown/ExerciseSelectorDropdown'
import ExercisePath from '../../CreateWorkout/ExercisePath/ExercisePath'

const AddExerciseToWorkoutModal = ({
  onClose,
  addExerciseToWorkout,
  setCurrWorkoutPath,
}) => {
  const [type, setType] = useState(null)
  const [sets, setSets] = useState(null)
  const [exerciseID, setExerciseID] = useState(null)

  const [showErrors, setShowErrors] = useState(false) // Only show errors on next button click
  const [error, setError] = useState('')

  const modalContent = useClickOutside(() => {
    onClose()
  })

  const handleAddExercise = () => {
    setShowErrors(false)

    let isError = false
    if (exerciseID !== 0 && !exerciseID) {
      isError = true
      setError('Please Select Exercise')
    } else if (!type) {
      isError = true
      setError('Please Select Exercise Type')
    } else if (error) {
      isError = true
    }

    if (isError) {
      setShowErrors(true)
    } else {
      const selectedExercise = {
        exerciseID,
        sets,
        type,
        id: uuidv4(),
      }
      addExerciseToWorkout(selectedExercise).then(updatedPath => {
        setCurrWorkoutPath(updatedPath)
        onClose()
      })
    }
  }

  return ReactDom.createPortal(
    <>
      <div className='add-exercise-to-workout-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='container'>
            <div className='settings-title'>Add Workout</div>
            {showErrors && error && <div className='error'>{error}</div>}
            <div className='exercise-item-container'>
              <ExerciseSelectorDropdown
                selectedExerciseID={exerciseID}
                setSelectedExerciseID={setExerciseID}
              />
              <ExercisePath
                sets={sets}
                setSets={setSets}
                type={type}
                setSelectedType={setType}
                setError={setError}
                selectedExerciseID={exerciseID}
              />
            </div>
            <div className='actions'>
              <button className='cancel-btn' onClick={onClose}>
                Cancel
              </button>
              <button className='confirm-btn' onClick={handleAddExercise}>
                Add Exercise
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addExerciseToWorkout: exerciseData =>
      dispatch(addExerciseToWorkout(exerciseData)),
  }
}

export default connect(null, mapDispatchToProps)(AddExerciseToWorkoutModal)
