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
    console.log(1)
    if (workoutID) {
      console.log(2)
      deleteWorkout(workoutID).then(res => {
        if (res.err) {
          console.log(3, res)
          return setError(res.error)
        } else if (res.status !== 'success') {
          console.log(4)
          return setError('Something went wrong, please try again.')
        }
        console.log(5, workoutID)
        removeWorkout(workoutID)
        console.log(6)
        onClose()
      })
    } else {
      console.log(7)
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
