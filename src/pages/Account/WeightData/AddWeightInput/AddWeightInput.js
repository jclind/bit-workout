import React from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import './AddWeightInput.scss'

const AddWeightInput = ({
  weight,
  date,
  setDate,
  handleWeightChange,
  latestWeightEntry,
  handleAddWeight,
}) => {
  return (
    <div className='add-weight-input page'>
      <div className='settings-title'>Add Weight</div>
      <div className='inputs'>
        <label className='weight'>
          <div className='text'>Weight</div>
          <input
            type='number'
            value={weight}
            onChange={handleWeightChange}
            placeholder={latestWeightEntry}
          />
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
      <button className='add-weight-btn btn' onClick={handleAddWeight}>
        <AiOutlineCheck className='icon' />
      </button>
      <BackButton />
    </div>
  )
}

export default AddWeightInput
