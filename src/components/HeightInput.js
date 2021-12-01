import React, { useState, useRef } from 'react'
import '../assets/styles/components/height-input.scss'

const HeightInput = ({ icon, placeholder }) => {
  const [feet, setFeet] = useState('')
  const [inches, setInches] = useState('')

  const feetRef = useRef()
  const inchesRef = useRef()

  const handleFeetChange = e => {
    let currVal = e.target.value
    if (currVal >= 10) {
      currVal = currVal % 10
    }
    console.log(currVal)

    if (isNaN(currVal) && currVal) return
    if ((currVal < 4 || currVal > 8) && currVal) return

    setFeet(currVal)
    if (currVal !== '') {
      inchesRef.current.focus()
    }
  }
  const handleInchesChange = e => {
    let currVal = e.target.value
    console.log('1')
    if (isNaN(currVal)) return
    console.log('2')
    if ((currVal < 0 || currVal > 11) && currVal !== 1) return
    console.log('3')

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
      <label className='form-label height-input-label'>
        <img src={icon} alt={placeholder} className='icon' />
        <div className='height-inputs'>
          <div className='feet-input'>
            <input
              type='number'
              placeholder='4'
              onChange={e => handleFeetChange(e)}
              onFocus={e => handleFocus(e)}
              value={feet}
              ref={feetRef}
            />
            <span>ft</span>
          </div>
          <div className='inches-input'>
            <input
              type='number'
              placeholder='0'
              onChange={e => handleInchesChange(e)}
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
    </>
  )
}

export default HeightInput
