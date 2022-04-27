import React, { useState } from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../../util/useClickOutside'
import './ConfirmSetFailedModal.scss'
import { failSet } from '../../../redux/actions/workout/workout'
import { connect } from 'react-redux'

const ConfirmSetFailedModal = ({
  onClose,
  failSet,
  currWeight,
  weightExerciseId,
  currSetTotal,
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
    failSet(currWeight - weightCount, weightExerciseId, currSetTotal)
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

const mapDispatchToProps = dispatch => {
  return {
    failSet: (newWeight, exerciseID, currSetTotal) =>
      dispatch(failSet(newWeight, exerciseID, currSetTotal)),
  }
}

export default connect(null, mapDispatchToProps)(ConfirmSetFailedModal)
