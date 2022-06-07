import React, { useState } from 'react'
import FormInput from '../../../../FormInput/FormInput'
import './BirthdayInput.scss'
const BirthdayInput = ({ icon, placeholder, val, setVal, required }) => {
  const [focus, setFocus] = useState(false)
  return (
    <>
      <div
        className='birthday-input-container'
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      >
        {!focus && !val ? (
          <div className='birthday-placeholder'>{placeholder}</div>
        ) : null}
        <FormInput
          icon={icon}
          inputType='date'
          val={val}
          setVal={setVal}
          required={required}
        />
      </div>
    </>
  )
}

export default BirthdayInput
