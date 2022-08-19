import React, { useState } from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../../../util/useClickOutside'
import './ConfirmRemoveExerciseModal.scss'

const ConfirmRemoveExerciseModal = () => {
  const modalContent = useClickOutside(() => {
    onClose()
  })
  return ReactDom.createPortal(
    <>
      <div className='add-exercise-to-workout-modal overlay'>
        <div className='modal-content' ref={modalContent}></div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default ConfirmRemoveExerciseModal
