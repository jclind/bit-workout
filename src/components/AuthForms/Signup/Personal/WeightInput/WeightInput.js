import React, { useState, useEffect } from 'react'
import './WeightInput.scss'
import deleteIcon from '../../../../../assets/images/icons/delete.svg'

const WeightInput = ({
  icon,
  placeholder,
  val,
  setVal,
  required,
  weightInputRef,
  signupBtnRef,
}) => {
  const [clear, setClear] = useState(false)

  useEffect(() => {
    if (val) {
      return setClear(true)
    }
    return setClear(false)
  }, [val])

  const handleInput = e => {
    const currVal = e.target.value

    if (isNaN(currVal) && currVal) return
    if (currVal > 999) return

    setVal(currVal)
    if (currVal >= 100) {
      signupBtnRef.current.focus()
    }
  }
  return (
    <label htmlFor='' className='form-weight-label form-label'>
      <img src={icon} alt={placeholder} className='icon' />
      <input
        type={'text'}
        placeholder={placeholder}
        onInput={e => handleInput(e)}
        value={val}
        required={required}
        data-lpignore='true'
        pattern='\d*'
        ref={weightInputRef}
      />
      {clear && (
        <div onClick={() => setVal('')} className='delete-icon'>
          <img src={deleteIcon} alt='clear' />
        </div>
      )}
    </label>
  )
}

export default WeightInput
