import React, { useState } from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../../util/useClickOutside'
import './ChangeWeightModal.scss'
import FormInput from '../../FormInput/FormInput'
import { IoBarbellOutline } from 'react-icons/io5'
import { connect } from 'react-redux'
import { updateWorkout } from '../../../redux/actions/workout/workout'

const ChangeWeightModal = ({
  onClose,
  currExercise,
  uid,
  workoutData,
  updateWorkout,
}) => {
  const [newWeight, setNewWeight] = useState('')
  const [error, setError] = useState('')

  const { name } = currExercise

  const handleSave = workoutData => {
    setError('')
    if (!isNaN(newWeight)) {
      if (newWeight > 0 && newWeight < 1000) {
        if (newWeight % 5 === 0) {
          const weightsArray = workoutData.weights
          const currWeightIdx = weightsArray.findIndex(
            w => w.exerciseID === currExercise.id
          )
          if (currWeightIdx !== -1) {
            weightsArray[currWeightIdx].weight = Math.round(newWeight)
          } else {
            weightsArray.push({
              exerciseID: currExercise.id,
              weight: Math.round(newWeight),
            })
          }

          updateWorkout(
            {
              weights: weightsArray,
            },
            uid
          )

          onClose()
        } else {
          setError('Weight must be a multiple of 5')
        }
      } else {
        setError('Weight must be between 0 and 1000')
      }
    } else {
      setError('Value must be a number and between 0 and 1000')
    }
  }
  const modalContent = useClickOutside(() => {
    setError('')
    onClose()
  })

  return ReactDom.createPortal(
    <>
      <div className='change-weight-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'>Change {name} Weight</div>
          <div className='sub-text'>
            This weight will be recorded for following {name} workouts.
          </div>
          {error && <div className='error-text'>{error}</div>}
          <FormInput
            icon={<IoBarbellOutline className='icon' />}
            placeholder={'Enter Weight'}
            inputType={'number'}
            val={newWeight}
            setVal={setNewWeight}
            className='form-input'
          />
          <div className='buttons'>
            <div className='cancel-btn' onClick={onClose}>
              Cancel
            </div>
            <div className='save-btn' onClick={() => handleSave(workoutData)}>
              Save Weight
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

const mapStateToProps = state => {
  return {
    uid: state.auth.userAuth ? state.auth.userAuth.uid : null,
    workoutData: state.workout.workoutData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateWorkout: (data, uid) => dispatch(updateWorkout(data, uid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeWeightModal)
