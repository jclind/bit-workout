import React, { useState } from 'react'
import ReactDom from 'react-dom'
import './PlatesModal.scss'
import useClickOutside from '../../../util/useClickOutside'
import ChangeWeightModal from '../ChangeWeightModal/ChangeWeightModal'
import { BiEdit } from 'react-icons/bi'

const PlatesModal = ({ weights, onClose, currExercise, exerciseWeight }) => {
  const [isChangeWeightModalOpen, setIsChangeWeightModalOpen] = useState(false)

  const modalContent = useClickOutside(() => {
    if (!isChangeWeightModalOpen) {
      onClose()
    }
  })

  return ReactDom.createPortal(
    <>
      <div className='plates-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'>Total Weight:</div>
          <div
            className='total-weight'
            onClick={() => setIsChangeWeightModalOpen(true)}
          >
            {exerciseWeight} lbs <BiEdit className='edit-icon' />
          </div>

          <div className='title'>Plates:</div>
          <div className='sub-text'>(On each side)</div>

          <div className='weights'>
            {weights.map((weight, idx) => {
              if (weight.amount > 0) {
                return (
                  <div className='weight' key={idx}>
                    <div className='name'>{weight.name} lbs :</div>
                    <div className='amount'>x{weight.amount}</div>
                  </div>
                )
              }
              return false
            })}
          </div>
        </div>
      </div>
      {isChangeWeightModalOpen ? (
        <ChangeWeightModal
          exerciseID={currExercise.id}
          onClose={() => {
            setIsChangeWeightModalOpen(false)
          }}
          currExercise={currExercise}
        />
      ) : null}
    </>,
    document.getElementById('portal')
  )
}

export default PlatesModal
