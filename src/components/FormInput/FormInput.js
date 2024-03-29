import React, { useState, useEffect } from 'react'
import './FormInput.scss'
import { AiOutlineCloseCircle } from 'react-icons/ai'
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
  inputRef,
  tabRef,
  tabIndex,
  autoCapitalize,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {icon && icon}
      {textarea ? (
        <textarea
          placeholder={placeholder}
          required={required}
          value={val}
          onChange={e => setVal(e.target.value)}
          ref={inputRef}
        />
      ) : (
        <input
          type={`${type}`}
          placeholder={placeholder}
          onChange={e => handleInput(e)}
          value={val}
          required={required}
          className={icon ? 'active-icon' : null}
          ref={inputRef}
          tabIndex={tabIndex}
          onKeyDown={e => {
            if (tabRef?.current && e.key === 'Enter') {
              e.preventDefault()
              tabRef.current.focus()
            }
          }}
          autoCapitalize={autoCapitalize ?? 'none'}
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
          <div onClick={() => setVal('')} className='clear-icon-container'>
            <AiOutlineCloseCircle className='clear-icon' />
          </div>
        )}
      </div>
    </label>
  )
}

export default FormInput
