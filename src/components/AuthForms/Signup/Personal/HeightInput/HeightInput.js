import React from 'react'
import deleteIcon from '../../../../../assets/images/icons/delete.svg'

const HeightInput = ({
  focus,
  setFocus,
  feet,
  setFeet,
  inches,
  setInches,
  placeholder,
  icon,
  handleFeetChange,
  handleInchesChange,
  handleFocus,
  feetRef,
  inchesRef,
  clear,
}) => {
  return (
    <div
      className='height-input-container'
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
    >
      {!focus && !feet && !inches ? (
        <div className='height-placeholder'>{placeholder}</div>
      ) : null}
      <label className='form-label height-input-label'>
        <img src={icon} alt={placeholder} className='icon' />
        <div className='height-inputs'>
          <div className='feet-input'>
            <input
              type='text'
              placeholder='4'
              step='1'
              min='0'
              onChange={e => handleFeetChange(e)}
              onFocus={e => handleFocus(e)}
              value={feet}
              pattern='\d*'
              ref={feetRef}
            />
            <span>ft</span>
          </div>
          <div className='inches-input'>
            <input
              type='text'
              placeholder='0'
              step='1'
              min='0'
              onInput={e => handleInchesChange(e)}
              onFocus={e => {
                handleFocus(e)
                if (!feet && !focus) feetRef.current.focus()
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  inchesRef.current.blur()
                }
              }}
              value={inches}
              ref={inchesRef}
              pattern='\d*'
            />
            <span>in</span>
          </div>
        </div>
        {clear && (
          <div
            onClick={() => {
              setFeet('')
              setInches('')
            }}
            className='delete-icon'
          >
            <img src={deleteIcon} alt='clear' />
          </div>
        )}
      </label>
    </div>
  )
}

export default HeightInput
