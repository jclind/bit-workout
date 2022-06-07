import React from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../../util/useClickOutside'
import './StopWorkoutModal.scss'

const StopWorkoutModal = ({ onClose, stopWorkout }) => {
  const modalContent = useClickOutside(() => {
    onClose()
  })

  return ReactDom.createPortal(
    <>
      <div className='stop-workout-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'>Confirm Stop Workout</div>
          <p className='text'>
            Workout data will be tracked up to the last set you completed.
          </p>
          <div className='actions'>
            <button className='cancel-btn' onClick={onClose}>
              Cancel
            </button>
            <button className='confirm-btn' onClick={stopWorkout}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default StopWorkoutModal
