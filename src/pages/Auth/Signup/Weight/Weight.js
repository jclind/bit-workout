import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PageIndicator from '../PageIndicator/PageIndicator'
import { AiOutlineWarning } from 'react-icons/ai'
import './Weight.scss'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import { saveSignupData } from '../Signup'

const Weight = () => {
  const [weight, setWeight] = useState(() => {
    const savedSignupData = JSON.parse(localStorage.getItem('signup'))
    if (savedSignupData && savedSignupData.weight) {
      return savedSignupData.weight
    }

    return ''
  })
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    setError('')
  }, [weight])

  const weightRef = useRef()
  const nextBtnRef = useRef()

  useEffect(() => {
    if (weightRef && weightRef.current) {
      weightRef.current.focus()
    }
  }, [weightRef])

  const handleWeightChange = e => {
    const newVal = e.target.value

    if (newVal === '' || newVal === '0') {
      return setWeight('')
    }

    if (isNaN(newVal)) return

    if (Number(newVal) > 999) return

    setWeight(newVal)
    if (newVal % 1 !== 0 || newVal.length > 4) {
      return nextBtnRef.current.focus()
    }
  }

  const handleNextClick = () => {
    setError('')
    if (!weight) return setError('Please Enter Weight')
    if (weight < 50 || weight > 999)
      return setError('Please Enter Weight Between 50-999')

    saveSignupData('weight', weight)
    navigate('/signup/barbell-weight')
  }

  return (
    <div className='signup-page weight'>
      <PageIndicator currPage={5} />
      <BackButton />
      <div className='title'>Your Weight</div>
      {error && (
        <div className='error' data-testid='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
      <div className='weight-input-container'>
        <input
          type='text'
          placeholder={'Weight'}
          onChange={handleWeightChange}
          value={weight}
          inputMode='decimal'
          ref={weightRef}
          data-testid='weight'
        />
        <span className='text'>lbs.</span>
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

export default Weight
