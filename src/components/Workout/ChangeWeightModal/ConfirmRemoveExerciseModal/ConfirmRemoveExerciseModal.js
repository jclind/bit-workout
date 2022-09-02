import React from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { removeExerciseFromWorkout } from '../../../../redux/actions/workout/workout'
import useClickOutside from '../../../../util/useClickOutside'
import './ConfirmRemoveExerciseModal.scss'

const ConfirmRemoveExerciseModal = ({
  onClose,
  removedExerciseIdx,
  removeExerciseFromWorkout,
  currWorkoutPath,
  setCurrWorkoutPath,
  removeExercise,
}) => {
  // const []

  if (removedExerciseIdx === null) {
    // !ERROR
    onClose()
  }
  const modalContent = useClickOutside(() => {
    onClose()
  })

  const handleRemoveExercise = () => {
    removeExercise(removedExerciseIdx).then(() => {
      onClose()
    })

    // removeExerciseFromWorkout(removedExerciseIdx).then(updatedPath => {
    //   console.log(updatedPath)
    //   setCurrWorkoutPath(updatedPath)
    //   onClose()
    // })
  }

  return ReactDom.createPortal(
    <>
      <div className='confirm-remove-exercise-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='settings-title'>Remove Exercise</div>
          <p className='description'>
            Are you sure you want to remove this exercise from your current
            workout?
          </p>
          <div className='actions'>
            <button className='cancel-btn' onClick={onClose}>
              Cancel
            </button>
            <button className='confirm-btn' onClick={handleRemoveExercise}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

const mapDispatchToProps = dispatch => {
  return {
    removeExerciseFromWorkout: exerciseIdx =>
      dispatch(removeExerciseFromWorkout(exerciseIdx)),
  }
}

export default connect(null, mapDispatchToProps)(ConfirmRemoveExerciseModal)
