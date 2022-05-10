import React, { useState, useEffect } from 'react'
import './FormInput.scss'
import deleteIcon from '../../assets/images/icons/delete.svg'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const FormInput = ({
  icon,
  placeholder,
  inputType,
  val,
  setVal,
  required,
  error,
  showPasswordBtn,
  textarea,
}) => {
  const [type, setType] = useState(inputType)
  const [clear, setClear] = useState(false)
  const [passwordShow, setPasswordShow] = useState(false)

  useEffect(() => {
    if (showPasswordBtn) {
      if (passwordShow) {
        setType('text')
      } else {
        setType('password')
      }
    }
  }, [passwordShow])

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
      {textarea ? (
        <textarea
          placeholder={placeholder}
          required={required}
          value={val}
          onChange={e => setVal(e.target.value)}
        />
      ) : (
        <input
          type={`${type}`}
          placeholder={placeholder}
          onChange={e => handleInput(e)}
          value={val}
          required={required}
          className={icon ? 'active-icon' : null}
        />
      )}

      <div className='icons'>
        {showPasswordBtn && (
          <div
            className='show-password-btn'
            onClick={() => setPasswordShow(!passwordShow)}
          >
            {passwordShow ? (
              <AiOutlineEye className='eye-icon icon' />
            ) : (
              <AiOutlineEyeInvisible className='eye-icon icon' />
            )}
          </div>
        )}
        {clear && (
          <div onClick={() => setVal('')} className='delete-icon'>
            <img src={deleteIcon} alt='clear' />
          </div>
        )}
      </div>
    </label>
  )
}

export default FormInput
