import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineClose, AiOutlineWarning } from 'react-icons/ai'
import moment from 'moment'
import './Birthday.scss'
import PageIndicator from '../PageIndicator/PageIndicator'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import { saveSignupData } from '../Signup'

const Profile = () => {
  const [month, setMonth] = useState(() => {
    const savedSignupData = JSON.parse(localStorage.getItem('signup'))
    if (savedSignupData && savedSignupData.birthday) {
      return savedSignupData.birthday.month
    }

    return ''
  })
  const [day, setDay] = useState(() => {
    const savedSignupData = JSON.parse(localStorage.getItem('signup'))
    if (savedSignupData && savedSignupData.birthday) {
      return savedSignupData.birthday.day
    }

    return ''
  })
  const [year, setYear] = useState(() => {
    const savedSignupData = JSON.parse(localStorage.getItem('signup'))
    if (savedSignupData && savedSignupData.birthday) {
      return savedSignupData.birthday.year
    }

    return ''
  })

  const [error, setError] = useState('')

  const monthRef = useRef()
  const dayRef = useRef()
  const yearRef = useRef()

  const nextBtnRef = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    if (monthRef && monthRef.current) {
      monthRef.current.focus()
    }
  }, [monthRef])

  useEffect(() => {
    setError('')
  }, [month, day, year])

  const handleMonthChange = e => {
    const newVal = e.target.value

    if (newVal === '') {
      setMonth('')
    }

    if (newVal.length === 1 && newVal === '0') {
      setMonth('0')
    }

    // Don't allow non-number inputs
    if (isNaN(newVal) || newVal.length > 2) return

    // Only allow 12 months
    if (newVal > 12) return

    if ((newVal > 1 || newVal === '01') && newVal < 10) {
      setMonth(`0${Number(newVal)}`)
      return dayRef.current.focus()
    }
    if (newVal >= 10) {
      setMonth(newVal)
      return dayRef.current.focus()
    }
    setMonth(newVal)
  }
  const handleDayChange = e => {
    const newVal = e.target.value

    if (newVal === '') {
      setDay('')
    }

    if (newVal.length === 1 && newVal === '0') {
      setDay('0')
    }

    // Don't allow non-number inputs
    if (isNaN(newVal)) return

    if (newVal > 31) {
      return
    }

    if (newVal > 3 || (newVal.length === 2 && Number(newVal) <= 3)) {
      if (Number(newVal) >= 10) {
        setDay(`${Number(newVal)}`)
      } else {
        setDay(`0${Number(newVal)}`)
      }
      return yearRef.current.focus()
    }

    setDay(newVal)
  }
  const handleYearChange = e => {
    const newVal = e.target.value

    if (newVal === '') {
      setYear('')
    }
    // Don't allow non-number inputs
    if (isNaN(newVal)) return

    const currYear = new Date().getFullYear()

    if (newVal > currYear - 10) return

    if (newVal > currYear - 100 && newVal < currYear - 10) {
      setYear(newVal)
      yearRef.current.blur()
      return nextBtnRef.current.focus()
    }

    setYear(newVal)
  }

  const validateDate = (month, day, year) => {
    return moment(`${month}/${day}/${year}`, 'MM/DD/YYYY', true).isValid()
  }
  const clearInputs = () => {
    setMonth('')
    setDay('')
    setYear('')
    monthRef.current.focus()
  }

  const handleNextClick = () => {
    setError('')
    const isDateValid = validateDate(month, day, year)
    if (!isDateValid) {
      return setError('Date Not Valid')
    }

    saveSignupData('birthday', { month, day, year })
    navigate('/signup/height')
  }

  return (
    <div className='signup-page birthday'>
      <PageIndicator currPage={3} />
      <BackButton />
      <div className='title'>Date Of Birth</div>
      {error && (
        <div className='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
      <div className='birthday-input-container'>
        <div className='month'>
          <input
            type='text'
            placeholder={'MM'}
            onChange={e => handleMonthChange(e)}
            value={month}
            inputMode='numeric'
            ref={monthRef}
            data-testid='month'
          />
        </div>
        <div className='day'>
          <input
            type='text'
            placeholder={'DD'}
            onChange={e => handleDayChange(e)}
            value={day}
            ref={dayRef}
            inputMode='numeric'
            data-testid='day'
          />
        </div>
        <div className='year'>
          <input
            type='text'
            placeholder={'YYYY'}
            onChange={e => handleYearChange(e)}
            value={year}
            ref={yearRef}
            inputMode='numeric'
            data-testid='year'
          />
        </div>
        {month || day || year ? (
          <button className='clear-inputs-btn' onClick={clearInputs}>
            <AiOutlineClose className='icon' />
          </button>
        ) : null}
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

export default Profile
