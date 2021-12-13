import React, { useState } from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../util/useClickOutside'
import '../../assets/styles/components/workout/change-weight-modal.scss'
import FormInput from '../FormInput'
import weightIcon from '../../assets/images/icons/weight.svg'

const ChangeWeightModal = ({ onClose, currExercise }) => {
  const [newWeight, setNewWeight] = useState()

  const modalContent = useClickOutside(() => {
    onClose()
  })

  const { name, exerciseWeight } = currExercise

  return ReactDom.createPortal(
    <>
      <div className='change-weight-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'>Change {name} Weight</div>
          <FormInput
            icon={weightIcon}
            placeholder={'Enter Weight'}
            inputType={'number'}
            val={newWeight}
            setVal={setNewWeight}
            className='form-input'
          />
          <div className='buttons'>
            <div className='cancel-btn'>Cancel</div>
            <div className='save-btn'>Save Weight</div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default ChangeWeightModal
