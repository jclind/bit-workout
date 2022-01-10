import React, { useState } from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../util/useClickOutside'
import '../../assets/styles/components/workout/change-weight-modal.scss'
import FormInput from '../FormInput'
import weightIcon from '../../assets/images/icons/weight.svg'
import { useWorkout } from '../../contexts/WorkoutContext'
import { exerciseList } from '../../assets/data/exerciseList'

const ChangeWeightModal = ({ onClose, exerciseID }) => {
  const [newWeight, setNewWeight] = useState('')
  const [error, setError] = useState('')

  const { updateWorkout, workoutData } = useWorkout()

  const currExerciseData = exerciseList.find(ex => ex.id === exerciseID)

  const { name } = currExerciseData

  // const { name, id } = currExercise

  const handleSave = async () => {
    setError('')
    if (!isNaN(newWeight)) {
      if (newWeight > 0 && newWeight < 1000) {
        if (newWeight % 5 === 0) {
          const weightsArray = workoutData.weights
          const currWeight = weightsArray.findIndex(
            w => w.exerciseID === exerciseID
          )
          weightsArray[currWeight].weight = Math.round(newWeight)
          await updateWorkout({
            weights: weightsArray,
          })

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
            icon={weightIcon}
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
            <div className='save-btn' onClick={handleSave}>
              Save Weight
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default ChangeWeightModal
