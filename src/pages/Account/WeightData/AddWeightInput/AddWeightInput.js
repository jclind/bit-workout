import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import { AiOutlineWarning } from 'react-icons/ai'
import { TailSpin } from 'react-loader-spinner'
import './AddWeightInput.scss'

const AddWeightInput = ({
  weight,
  date,
  setDate,
  handleWeightChange,
  latestWeightEntry,
  handleAddWeight,
  loading,
  error,
}) => {
  return (
    <div className='add-weight-input page'>
      <div className='settings-title'>Add Weight</div>
      {error && (
        <div className='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
      <div className='inputs'>
        <label className='weight'>
          <div className='text'>Weight</div>
          <input
            type='number'
            value={weight}
            onChange={handleWeightChange}
            placeholder={latestWeightEntry}
          />
          <div className='after'>lbs</div>
        </label>
        <label className='date'>
          <div className='text'>Date</div>
          <input
            type='date'
            defaultValue={date}
            onChange={e => setDate(e.target.value)}
          />
        </label>
      </div>
      <button
        className='add-weight-btn btn'
        onClick={handleAddWeight}
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
          <AiOutlineCheck className='icon' />
        )}
      </button>
      <BackButton />
    </div>
  )
}

export default AddWeightInput
