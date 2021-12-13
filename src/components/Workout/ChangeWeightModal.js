import React from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../util/useClickOutside'
import '../../assets/styles/components/workout/change-weight-modal.scss'

const ChangeWeightModal = ({ onClose }) => {
  const modalContent = useClickOutside(() => {
    onClose()
  })
  return ReactDom.createPortal(
    <>
      <div className='change-weight-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'>Hello</div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default ChangeWeightModal
