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
  currRepTotal,
  currWorkout,
  currIdx,
}) => {
  const [weightCount, setWeightCount] = useState(10)
  const [repCount, setRepCount] = useState(0)
  const modalContent = useClickOutside(() => {
    onClose()
  })

  const incrementWeightCount = () => {
    setWeightCount(weightCount + 5)
  }
  const decrementWeightCount = () => {
    if (weightCount > 0) {
      setWeightCount(weightCount - 5)
    }
  }

  const incrementRepCount = () => {
    if (repCount < currRepTotal) {
      setRepCount(repCount + 1)
    }
  }
  const decrementRepCount = () => {
    if (repCount > 0) {
      setRepCount(repCount - 1)
    }
  }
  const handleFailSet = () => {
    // let updatedPath = [...currWorkout.path]
    // updatedPath[currIdx].

    failSet(currWeight - weightCount, weightExerciseId, currSetTotal, repCount)
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
          <div className='counter'>
            <div className='counter-label'>Decrease weight by: </div>
            <div className='new-exercise-weight'>
              (New Weight: <strong>{currWeight - weightCount}</strong>)
            </div>
            <div className='decrease-weight-counter'>
              <button className='decrease' onClick={decrementWeightCount}>
                -5
              </button>
              <div className='count'>{weightCount}lbs</div>
              <button className='increase' onClick={incrementWeightCount}>
                +5
              </button>
            </div>
          </div>
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
