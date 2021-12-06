import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import deleteIcon from '../../assets/images/icons/delete.svg'
import '../../assets/styles/components/settings/update-user-input.scss'

const UpdateUserInput = ({ placeholder, val, setVal, maxCharacters }) => {
  const [unsavedVal, setUnsavedVal] = useState(val)
  const [numCharacters, setNumCharacters] = useState('')
  const [activeSave, setActiveSave] = useState(false)

  const navigate = useNavigate()

  const handleInput = e => {
    const currVal = e.target.value
    setUnsavedVal(currVal)
  }
  const handleSave = () => {
    if (unsavedVal === val || unsavedVal === '') return

    const capitalizedText = unsavedVal
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')

    setVal(capitalizedText)
    // navigate(-1)
  }

  useEffect(() => {
    if (unsavedVal === val || unsavedVal === '') {
      setActiveSave(false)
    } else {
      setActiveSave(true)
    }

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
      <div className='action-buttons'>
        <button className='cancel' onClick={() => navigate(-1)}>
          cancel
        </button>
        <button
          className={activeSave ? 'save active' : 'save'}
          onClick={handleSave}
        >
          save
        </button>
      </div>
    </div>
  )
}

export default UpdateUserInput
