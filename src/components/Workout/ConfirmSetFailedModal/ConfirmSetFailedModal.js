import React, { useState } from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../../util/useClickOutside'
import './ConfirmSetFailedModal.scss'

const ConfirmSetFailedModal = ({
  onClose,
  failSet,
  currWeight,
  weightExerciseId,
  uid,
  weights,
}) => {
  const [weightCount, setWeightCount] = useState(10)
  const modalContent = useClickOutside(() => {
    onClose()
  })

  const increment = () => {
    setWeightCount(weightCount + 5)
  }
  const decrement = () => {
    if (weightCount > 0) {
      setWeightCount(weightCount - 5)
    }
  }

  const handleFailSet = () => {
    failSet(weights, currWeight - weightCount, weightExerciseId, uid)
      .then(() => {
        onClose()
      })
      .catch(err => {
        console.log(err)
      })
  }

  console.log(currWeight)
  return ReactDom.createPortal(
    <>
      <div className='confirm-set-failed-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'>Confirm Failed Set:</div>
          <div className='counter'>
            <div className='counter-label'>Decrease weight by: </div>
            <div className='new-exercise-weight'>
              (New Weight: <strong>{currWeight - weightCount}</strong>)
            </div>
            <div className='decrease-weight-counter'>
              <button className='decrease' onClick={decrement}>
                -5
              </button>
              <div className='count'>{weightCount}lbs</div>
              <button className='increase' onClick={increment}>
                +5
              </button>
            </div>
          </div>
          <div className='actions'>
            <button className='cancel-btn' onClick={onClose}>
              Cancel
            </button>
            <button className='confirm-btn' onClick={handleFailSet}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default ConfirmSetFailedModal
