import React, { useState } from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../../util/useClickOutside'
import './ConfirmSetFailedModal.scss'
import { failSet } from '../../../redux/actions/workout/workout'
import { connect } from 'react-redux'
import { useEffect } from 'react'

const ConfirmSetFailedModal = ({
  onClose,
  failSet,
  currWeight,
  weightExerciseId,
  numSets,
  numReps,
}) => {
  const [weightCount, setWeightCount] = useState(() => {
    if (currWeight === 5) {
      return 0
    } else if (currWeight === 10) {
      return 5
    }
    return 10
  })
  const [repCount, setRepCount] = useState(0)
  const modalContent = useClickOutside(() => {
    onClose()
  })
  const [newWeight, setNewWeight] = useState(currWeight - weightCount)
  useEffect(() => {
    if (currWeight - weightCount >= 5) {
      setNewWeight(currWeight - weightCount)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weightCount])

  const incrementWeightCount = () => {
    if (newWeight > 5) {
      setWeightCount(weightCount + 5)
    }
  }
  const decrementWeightCount = () => {
    if (weightCount > 0) {
      setWeightCount(weightCount - 5)
    }
  }

  const incrementRepCount = () => {
    if (repCount < numReps - 1) {
      setRepCount(repCount + 1)
    }
  }
  const decrementRepCount = () => {
    if (repCount > 0) {
      setRepCount(repCount - 1)
    }
  }
  const handleFailSet = () => {
    failSet(currWeight - weightCount, weightExerciseId, numSets, repCount)
      .then(() => {
        onClose()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return ReactDom.createPortal(
    <>
      <div className='confirm-set-failed-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'>Confirm Failed Set:</div>
          {currWeight > 5 && (
            <div className='counter'>
              <div className='counter-label'>Decrease weight by: </div>
              <div className='decrease-weight-counter'>
                <button className='decrease' onClick={decrementWeightCount}>
                  -5
                </button>
                <div className='count'>{weightCount} lbs</div>
                <button className='increase' onClick={incrementWeightCount}>
                  +5
                </button>
              </div>
              <div className='new-exercise-weight'>
                (New Weight: <strong>{newWeight}</strong>)
              </div>
            </div>
          )}
          <div className='reps-completed-container'>
            <div className='counter-label'>Number of completed reps: </div>
            <div className='reps-completed-counter'>
              <button className='decrease' onClick={decrementRepCount}>
                -
              </button>
              <div className='count'>{repCount} Reps</div>
              <button className='increase' onClick={incrementRepCount}>
                +
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
    failSet: (newWeight, exerciseID, currSetTotal, completedReps) =>
      dispatch(failSet(newWeight, exerciseID, currSetTotal, completedReps)),
  }
}

export default connect(null, mapDispatchToProps)(ConfirmSetFailedModal)
