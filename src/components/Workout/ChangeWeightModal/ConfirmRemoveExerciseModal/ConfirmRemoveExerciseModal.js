import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { removeExerciseFromWorkout } from '../../../../redux/actions/workout/workout'
import useClickOutside from '../../../../util/useClickOutside'
import { TailSpin } from 'react-loader-spinner'
import './ConfirmRemoveExerciseModal.scss'

const ConfirmRemoveExerciseModal = ({
  onClose,
  removedExerciseIdx,
  removeExercise,
}) => {
  const [loading, setLoading] = useState(false)

  if (removedExerciseIdx === null) {
    // !ERROR
    onClose()
  }
  const modalContent = useClickOutside(() => {
    onClose()
  })

  const handleRemoveExercise = () => {
    setLoading(true)
    removeExercise(removedExerciseIdx).then(() => {
      setLoading(false)
      onClose()
    })
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
            <button className='cancel-btn' onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button
              className='confirm-btn'
              onClick={handleRemoveExercise}
              disabled={loading}
            >
              {loading ? (
                <TailSpin
                  height='30'
                  width='30'
                  color='white'
                  arialLabel='loading'
                  className='spinner'
                />
              ) : (
                'Remove'
              )}
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
