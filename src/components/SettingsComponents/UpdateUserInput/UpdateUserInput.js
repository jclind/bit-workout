import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import './UpdateUserInput.scss'
import UpdateUserInputActions from './UpdateUserInputActions'

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
  loading,
}) => {
  return (
    <div className='update-user-input'>
      <UpdateUserInputActions
        activeSave={activeSave}
        handleSave={handleSave}
        loading={loading}
      />
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
            <AiOutlineCloseCircle className='icon' />
          </div>
        )}
      </div>
      {maxCharacters ? (
        <div className='characters'>{`${numCharacters} / ${maxCharacters}`}</div>
      ) : (
        <br />
      )}
    </div>
  )
}

export default UpdateUserInput
