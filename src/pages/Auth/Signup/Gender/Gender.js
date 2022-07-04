import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignupContext } from '../Signup'
import { AiOutlineWarning } from 'react-icons/ai'
import PageIndicator from '../PageIndicator/PageIndicator'
import './Gender.scss'
import { useEffect } from 'react'

const Gender = () => {
  const [gender, setGender] = useState(null)

  const [error, setError] = useState('')

  const navigate = useNavigate()

  const { saveSignupData } = useContext(SignupContext)

  const handleNextClick = () => {
    console.log(gender)
    setError('')
    if (gender === null) {
      return setError('Please Select Gender')
    }

    saveSignupData('gender', gender)
    navigate('/signup/birthday')
  }

  useEffect(() => {
    setError('')
  }, [gender])

  return (
    <div className='signup-page gender'>
      <PageIndicator currPage={1} />
      <div className='title'>Gender</div>
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
      <button className='signup-next-btn' onClick={handleNextClick}>
        NEXT
      </button>
    </div>
  )
}

export default Gender
