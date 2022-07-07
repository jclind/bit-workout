import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PageIndicator from '../PageIndicator/PageIndicator'
import { AiOutlineWarning } from 'react-icons/ai'
import './BarbellWeight.scss'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import { saveSignupData } from '../Signup'

const BarbellWeight = () => {
  const [weight, setWeight] = useState(() => {
    const savedSignupData = JSON.parse(localStorage.getItem('signup'))
    if (savedSignupData && savedSignupData.barbellWeight) {
      return savedSignupData.barbellWeight
    }

    return ''
  })
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const weightRef = useRef()
  const nextBtnRef = useRef()

  useEffect(() => {
    if (weightRef && weightRef.current) {
      weightRef.current.focus()
    }
  }, [weightRef])

  useEffect(() => {
    setError('')
  }, [weight])

  const handleWeightChange = e => {
    const newVal = e.target.value

    if (newVal === '') {
      return setWeight('')
    }

    if (isNaN(newVal)) return
    // Don't allow decimal place
    if (newVal % 1 !== 0) return

    if (Number(newVal) > 200) return

    setWeight(newVal)
    if (newVal % 1 !== 0) {
      return nextBtnRef.current.focus()
    }
  }

  const handleNextClick = () => {
    setError('')
    if (!weight) return setError('Please Enter Weight')
    if (weight < 5 || weight > 200)
      return setError('Please Enter Weight Between 5-200')

    saveSignupData('barbellWeight', weight)
    navigate('/signup/username')
  }

  return (
    <div className='signup-page barbell-weight'>
      <PageIndicator currPage={6} />
      <BackButton />
      <div className='title'>Barbell Weight</div>
      <p className='description'>
        Enter the weight of the barbell you will be using for your weighted
        workouts
      </p>
      {error && (
        <div className='error'>
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
          inputMode='numeric'
          ref={weightRef}
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

export default BarbellWeight
