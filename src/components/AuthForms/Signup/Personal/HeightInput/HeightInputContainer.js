import React, { useState, useEffect, useRef } from 'react'
import HeightInput from './HeightInput'
import './HeightInput.scss'

const HeightInputContainer = ({ icon, placeholder, val, setVal }) => {
  const [focus, setFocus] = useState(false)
  const [clear, setClear] = useState(false)

  const [feet, setFeet] = useState(val.feet)
  const [inches, setInches] = useState(val.inches)

  const feetRef = useRef()
  const inchesRef = useRef()

  useEffect(() => {
    if (feet || inches) {
      setClear(true)
    } else {
      setClear(false)
    }

    return setVal({ feet, inches })
  }, [feet, inches, setVal])

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

  const childProps = {
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
    setClear,
  }
  return <HeightInput {...childProps} />
}

export default HeightInputContainer
