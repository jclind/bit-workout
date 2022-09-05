import React, { useState, useEffect } from 'react'
import UpdateUserInput from './UpdateUserInput'

const UpdateUserInputContainer = ({
  placeholder,
  input,
  val,
  setVal,
  maxCharacters,
  loading,
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
      const re = /\S+@\S+\.\S+/
      const isValidEmailAddress = re.test(unsavedVal)

      if (!isValidEmailAddress) {
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
      loading={loading}
    />
  )
}

export default UpdateUserInputContainer
