import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { TailSpin } from 'react-loader-spinner'
import './ConfirmLogoutModal.scss'

const LogoutConfirm = ({ onClose, logout }) => {
  const [loading, setLoading] = useState(false)

  const handleLogout = () => {
    setLoading(true)
    logout()
      .then(() => {
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        // !ERROR
      })
  }

  return ReactDom.createPortal(
    <>
      <div className='logout-confirm-modal overlay'>
        <div className='modal-content'>
          <div className='title'>Are You Sure?</div>
          <div className='sub-text'>
            You currently have a workout running, are you sure you want to
            logout?
          </div>
          <div className='actions'>
            <button className='cancel-btn' onClick={onClose}>
              Cancel
            </button>
            <button className='confirm-btn' onClick={handleLogout}>
              {loading ? (
                <TailSpin
                  height='30'
                  width='30'
                  color='white'
                  arialLabel='loading'
                  className='spinner'
                />
              ) : (
                'Logout'
              )}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default LogoutConfirm
