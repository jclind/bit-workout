import React from 'react'
import { useNavigate } from 'react-router-dom'

const UpdateUserInputActions = ({ activeSave, handleSave }) => {
  const navigate = useNavigate()
  return (
    <div className='action-buttons'>
      <button className='cancel' type='button' onClick={() => navigate(-1)}>
        cancel
      </button>
      <button
        className={activeSave ? 'save active' : 'save'}
        onClick={handleSave}
        type='submit'
      >
        save
      </button>
    </div>
  )
}

export default UpdateUserInputActions
