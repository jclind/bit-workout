import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PageIndicator from '../PageIndicator/PageIndicator'
import { AiOutlineWarning } from 'react-icons/ai'
import './Height.scss'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import { saveSignupData } from '../Signup'

const Height = () => {
  const [feet, setFeet] = useState(() => {
    const savedSignupData = JSON.parse(localStorage.getItem('signup'))
    if (savedSignupData && savedSignupData.height) {
      return savedSignupData.height.feet
    }

    return ''
  })
  const [inches, setInches] = useState(() => {
    const savedSignupData = JSON.parse(localStorage.getItem('signup'))
    if (savedSignupData && savedSignupData.height) {
      return savedSignupData.height.inches
    }

    return ''
  })

  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
  }, [feet, inches])

  const feetRef = useRef()
  const inchesRef = useRef()

  useEffect(() => {
    if (feetRef && feetRef.current) {
      feetRef.current.focus()
    }
  }, [feetRef])

  const nextBtnRef = useRef()

  const navigate = useNavigate()

  const handleFeetChange = e => {
    const newVal = e.target.value.trim()

    if (newVal === '') {
      return setFeet('')
    }
    if (isNaN(newVal)) return

    if (newVal < 2 || newVal > 8) return

    setFeet(newVal)
    inchesRef.current.focus()
  }
  const handleInchesChange = e => {
    const newVal = e.target.value.trim()

    if (newVal === '') {
      return setInches('')
    }
    if (isNaN(newVal)) return

    if (newVal > 12) return

    setInches(newVal)

    if (newVal > 1) {
      return nextBtnRef.current.focus()
    }
  }

  const handleNextClick = () => {
    setError('')
    if (!feet || !inches) {
      return setError('Please Enter Feet and Inches')
    }

    saveSignupData('height', { feet, inches })
    navigate('/signup/weight')
  }

  return (
    <div className='signup-page height'>
      <PageIndicator currPage={4} />
      <BackButton />
      <div className='title'>Height</div>
      {error && (
        <div className='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
      <div className='height-input-container'>
        <div className='feet'>
          <input
            type='text'
            placeholder={'5'}
            onChange={e => handleFeetChange(e)}
            value={feet}
            inputMode='numeric'
            ref={feetRef}
          />
          <span className='text'>ft</span>
        </div>
        <div className='inches'>
          <input
            type='text'
            placeholder={'9'}
            onChange={e => handleInchesChange(e)}
            value={inches}
            ref={inchesRef}
            inputMode='numeric'
          />
          <span className='text'>in</span>
        </div>
      </div>
      <button
        className='signup-next-btn'
        ref={nextBtnRef}
        onClick={handleNextClick}
      >
        NEXT
      </button>
    </div>
  )
}
export default Height
