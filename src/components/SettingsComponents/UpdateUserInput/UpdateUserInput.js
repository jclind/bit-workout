import React from 'react'
import { useNavigate } from 'react-router-dom'
import deleteIcon from '../../../assets/images/icons/delete.svg'
import './UpdateUserInput.scss'

const UpdateUserInput = ({
  input,
  placeholder,
  val,
  unsavedVal,
  setUnsavedVal,
  numCharacters,
  maxCharacters,
  handleInput,
  activeSave,
  handleSave,
}) => {
  const navigate = useNavigate()

  return (
    <div className='update-user-input'>
      <div className='input-container'>
        <input
          type={input ? input : 'text'}
          placeholder={placeholder}
          value={unsavedVal}
          onInput={e => handleInput(e)}
          maxLength={maxCharacters}
          required={true}
        />
        {val && (
          <div className='clear-icon-container'>
            <img
              src={deleteIcon}
              alt='clear input'
              className='clear'
              onClick={() => {
                setUnsavedVal('')
              }}
            />
          </div>
        )}
      </div>
      <div className='characters'>{`${numCharacters} / ${maxCharacters}`}</div>
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
    </div>
  )
}

export default UpdateUserInput
