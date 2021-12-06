import React, { useState, useEffect } from 'react'
import deleteIcon from '../../assets/images/icons/delete.svg'
import '../../assets/styles/components/settings/update-user-input.scss'

const UpdateUserInput = ({ placeholder, val, setVal, maxCharacters }) => {
  const [unsavedVal, setUnsavedVal] = useState(val)
  const [numCharacters, setNumCharacters] = useState('')
  const handleInput = e => {
    const currVal = e.target.value
    setUnsavedVal(currVal)
  }

  useEffect(() => {
    setNumCharacters(unsavedVal.length)
  }, [unsavedVal])

  return (
    <div className='update-user-input'>
      <div className='input-container'>
        <input
          type='text'
          placeholder={placeholder}
          value={unsavedVal}
          onInput={e => handleInput(e)}
          maxlength={maxCharacters}
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
    </div>
  )
}

export default UpdateUserInput
