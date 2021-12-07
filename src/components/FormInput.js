import React, { useState, useEffect } from 'react'
import '../assets/styles/components/form-input.scss'
import deleteIcon from '../assets/images/icons/delete.svg'
const FormInput = ({
  icon,
  placeholder,
  inputType,
  val,
  setVal,
  required,
  error,
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
    setVal(currVal)
  }

  return (
    <label
      htmlFor=''
      className={
        error
          ? 'form-input-label form-label input-error'
          : 'form-input-label form-label'
      }
    >
      {icon && <img src={icon} alt={placeholder} className='icon' />}
      <input
        type={`${inputType}`}
        placeholder={placeholder}
        onChange={e => handleInput(e)}
        value={val}
        required={required}
        className={icon ? 'active-icon' : null}
      />
      {clear && (
        <div onClick={() => setVal('')} className='delete-icon'>
          <img src={deleteIcon} />
        </div>
      )}
    </label>
  )
}

export default FormInput
