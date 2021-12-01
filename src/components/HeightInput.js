import React, { useState, useEffect, useRef } from 'react'
import '../assets/styles/components/height-input.scss'

const HeightInput = ({ icon, placeholder, val, setVal }) => {
  const [focus, setFocus] = useState(false)

  const [feet, setFeet] = useState(val.feet)
  const [inches, setInches] = useState(val.inches)

  const feetRef = useRef()
  const inchesRef = useRef()

  useEffect(() => {
    setVal({ feet, inches })
  }, [feet, inches])

  const handleFeetChange = e => {
    let currVal = e.target.value
    if (currVal >= 10) {
      currVal = currVal % 10
    }

    if (isNaN(currVal) && currVal) return
    if ((currVal < 4 || currVal > 8) && currVal) return

    setFeet(currVal)
    if (currVal !== '') {
      inchesRef.current.focus()
    }
  }
  const handleInchesChange = e => {
    let currVal = e.target.value

    if (isNaN(currVal) && currVal) return
    if ((currVal < 0 || currVal > 11) && currVal !== 1) return

    setInches(currVal)

    if (
      ((currVal > 1 && currVal <= 11) || Number(currVal) === 0) &&
      currVal !== ''
    ) {
      inchesRef.current.blur()
    }
  }
  const handleFocus = e => {
    const currVal = e.target.value
    if (currVal) {
      e.target.select()
    }
  }

  return (
    <>
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
                onFocus={e => handleFocus(e)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    inchesRef.current.blur()
                  }
                }}
                value={inches}
                ref={inchesRef}
              />
              <span>in</span>
            </div>
          </div>
        </label>
      </div>
    </>
  )
}

export default HeightInput
