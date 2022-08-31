import React, { useState } from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../../util/useClickOutside'
import { addExerciseToWorkout } from '../../../redux/actions/workout/workout'
import { connect } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import './AddExerciseToWorkoutModal.scss'
import ExerciseSelectorDropdown from '../../CreateWorkout/ExerciseSelectorDropdown/ExerciseSelectorDropdown'
import ExercisePath from '../../CreateWorkout/ExercisePath/ExercisePath'

const AddExerciseToWorkoutModal = ({ onClose, addExerciseToWorkout }) => {
  const [selectedExercise, setSelectedExercise] = useState({
    exerciseID: null,
    description: '',
    sets: null,
    type: null,
    id: uuidv4(),
  })

  const [showErrors, setShowErrors] = useState(false) // Only show errors on next button click
  const [error, setError] = useState('')

  const modalContent = useClickOutside(() => {
    onClose()
  })

  const updateSelectedExercise = (prop, val) => {
    setShowErrors(false)
    let updatedData = { ...selectedExercise }
    updatedData[prop] = val
    setSelectedExercise(updatedData)
  }

  const handleAddExercise = () => {
    setShowErrors(false)

    let isError = false
    if (selectedExercise.exerciseID !== 0 && !selectedExercise.exerciseID) {
      isError = true
      setError('Please Select Exercise')
    } else if (!selectedExercise.type) {
      isError = true
      setError('Please Select Exercise Type')
    } else if (error) {
      isError = true
    }

    if (isError) {
      setShowErrors(true)
    } else {
      addExerciseToWorkout(selectedExercise).then(() => {
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
                selectedExerciseID={selectedExercise.exerciseID}
                setSelectedExerciseID={exerciseID =>
                  updateSelectedExercise('exerciseID', exerciseID)
                }
              />
              <ExercisePath
                sets={selectedExercise.sets}
                setSets={sets => updateSelectedExercise('sets', sets)}
                type={selectedExercise.type}
                setSelectedType={type => updateSelectedExercise('type', type)}
                setError={setError}
                selectedExerciseID={selectedExercise.exerciseID}
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
