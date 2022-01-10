import React from 'react'
import ReactDom from 'react-dom'
import '../assets/styles/components/logout-confirm.scss'

const LogoutConfirm = ({ onClose, logout }) => {
  return ReactDom.createPortal(
    <>
      <div className='logout-confirm-modal overlay'>
        <div className='modal-content'>
          <div className='title'>Are You Sure?</div>
          <div className='sub-text'>
            You currently have a workout running. Logging out will remove all
            current workout progress.
          </div>
          <div className='btns'>
            <button className='cancel-btn btn' onClick={onClose}>
              Cancel
            </button>
            <button className='logout-btn btn' onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default LogoutConfirm
