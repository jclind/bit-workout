import React, { useState } from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../../util/useClickOutside'

const ConfirmDeleteWorkout = ({
  onClose,
  workoutID,
  deleteWorkout,
  removeWorkout,
}) => {
  const [error, setError] = useState('')

  const modalContent = useClickOutside(() => {
    onClose()
  })

  const handleDeleteWorkout = () => {
    setError('')
    if (workoutID) {
      deleteWorkout(workoutID).then(res => {
        if (res.err) {
          return setError(res.error)
        } else if (res.status !== 'success') {
          return setError('Something went wrong, please try again.')
        }
        removeWorkout(workoutID)
        onClose()
      })
    } else {
      setError(
        'WorkoutID not provided to confirmation modal, please try again.'
      )
    }
  }
  return ReactDom.createPortal(
    <>
      <div className='confirm-delete-workout-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'>Confirm Delete Workout</div>
          <br />
          {error && (
            <div className='error' style={{ width: '100%' }}>
              {error}
            </div>
          )}
          <br />
          <div className='actions'>
            <button className='cancel-btn' onClick={onClose}>
              Cancel
            </button>
            <button className='confirm-btn' onClick={handleDeleteWorkout}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default ConfirmDeleteWorkout
