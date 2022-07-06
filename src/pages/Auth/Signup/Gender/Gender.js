import React, { useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignupContext } from '../Signup'
import { AiOutlineWarning } from 'react-icons/ai'
import PageIndicator from '../PageIndicator/PageIndicator'
import './Gender.scss'
import { useEffect } from 'react'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'

const Gender = () => {
  const [gender, setGender] = useState(() => {
    const savedSignupData = JSON.parse(localStorage.getItem('signup'))
    if (savedSignupData && savedSignupData.gender) {
      return savedSignupData.gender
    }

    return null
  })

  const [error, setError] = useState('')

  const navigate = useNavigate()

  const { saveSignupData } = useContext(SignupContext)

  const handleNextClick = () => {
    setError('')
    if (gender === null) {
      return setError('Please Select Gender')
    }

    saveSignupData('gender', gender)
    navigate('/signup/birthday')
  }

  const nextBtnRef = useRef()

  useEffect(() => {
    setError('')
    if (gender) {
      nextBtnRef.current.focus()
    }
  }, [gender])

  return (
    <div className='signup-page gender'>
      <PageIndicator currPage={2} />
      <BackButton link='/auth' />
      <h3 className='title'>Gender</h3>
      {error && (
        <div className='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
      <div className='gender-selection-container'>
        <button
          className={`female ${gender === 'female' && 'selected'}`}
          onClick={() => setGender('female')}
        >
          Female
        </button>
        <button
          className={`male ${gender === 'male' && 'selected'}`}
          onClick={() => setGender('male')}
        >
          Male
        </button>
      </div>
      <button
        className='signup-next-btn'
        onClick={handleNextClick}
        ref={nextBtnRef}
      >
        NEXT
      </button>
    </div>
  )
}

export default Gender
