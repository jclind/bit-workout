import React, { useState, useEffect } from 'react'
import UpdateUserInput from './UpdateUserInput'

const UpdateUserInputContainer = ({
  placeholder,
  input,
  val,
  setVal,
  maxCharacters,
  setError,
}) => {
  const [unsavedVal, setUnsavedVal] = useState(val)
  const [numCharacters, setNumCharacters] = useState('')
  const [activeSave, setActiveSave] = useState(false)

  const handleInput = e => {
    const currVal = e.target.value
    setUnsavedVal(currVal)
  }

  const handleSave = () => {
    setError('')
    if (unsavedVal === val || unsavedVal === '')
      return setError('New value cannot be empty / equal original value')

    if (input === 'email') {
      const isValidEmailAddress = String(unsavedVal)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      if (isValidEmailAddress) {
        return setError('invalid email')
      }
    }
    setVal(unsavedVal)
  }

  useEffect(() => {
    if (unsavedVal === val || unsavedVal === '') {
      setActiveSave(false)
    } else {
      setActiveSave(true)
    }
    setNumCharacters(unsavedVal.length)
  }, [unsavedVal, val])

  return (
    <UpdateUserInput
      input={input}
      placeholder={placeholder}
      val={val}
      unsavedVal={unsavedVal}
      setUnsavedVal={setUnsavedVal}
      numCharacters={numCharacters}
      maxCharacters={maxCharacters}
      handleInput={handleInput}
      activeSave={activeSave}
      handleSave={handleSave}
    />
  )
}

export default UpdateUserInputContainer
