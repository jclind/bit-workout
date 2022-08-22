import React, { useState } from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../../../util/useClickOutside'
import './ConfirmRemoveExerciseModal.scss'

const ConfirmRemoveExerciseModal = ({
  onClose,
  removedExerciseIdx,
  workout,
}) => {
  if (removedExerciseIdx === null) {
    // !ERROR
    onClose()
  }
  const modalContent = useClickOutside(() => {
    onClose()
  })

  // const removedExercise = workout?.path[removedExerciseIdx]

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
            <button className='confirm-btn' onClick={() => {}}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default ConfirmRemoveExerciseModal
