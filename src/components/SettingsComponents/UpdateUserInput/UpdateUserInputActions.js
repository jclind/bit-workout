import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'

const UpdateUserInputActions = ({ activeSave, handleSave, loading }) => {
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
        disabled={loading}
      >
        {loading ? (
          <TailSpin
            height='20'
            width='20'
            color='white'
            arialLabel='loading'
            className='spinner'
          />
        ) : (
          'save'
        )}
      </button>
    </div>
  )
}

export default UpdateUserInputActions
