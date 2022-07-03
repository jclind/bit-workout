import React, { useState, useEffect, useRef } from 'react'
import BirthdayInput from '../../../../components/AuthForms/Signup/Personal/BirthdayInput/BirthdayInput'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import './Birthday.scss'

const Profile = () => {
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')

  const monthRef = useRef()
  const dayRef = useRef()
  const yearRef = useRef()

  const nextBtnRef = useRef()

  useEffect(() => {
    if (monthRef && monthRef.current) {
      monthRef.current.focus()
    }
  }, [monthRef])

  const [test, setTest] = useState('')
  const handleMonthChange = e => {
    const newVal = e.target.value

    if (newVal === '') {
      setMonth('')
    }

    // Don't allow non-number inputs
    if (isNaN(newVal)) return

    // Only allow 12 months
    if (newVal > 12) return

    if (newVal > 1) {
      setMonth(Number(newVal))
      return dayRef.current.focus()
    }
    if (newVal >= 10) {
      setMonth(newVal)
      return dayRef.current.focus()
    }
  }
  const handleDayChange = e => {
    const newVal = e.target.value

    if (newVal === '') {
      setDay('')
    }
    // Don't allow non-number inputs
    if (isNaN(newVal)) return

    if (newVal > 31) {
      return
    }

    if (newVal > 3) {
      setDay(newVal)
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

    if (newVal > currYear - 100 && newVal > currYear - 10) {
      setYear(newVal)
      return nextBtnRef.current.focus()
    }

    setYear(newVal)
  }

  return (
    <div className='signup-page birthday'>
      <div className='title'>Date Of Birth</div>
      {test}
      <div className='birthday-input-container'>
        <div className='month'>
          <input
            type='text'
            placeholder={'MM'}
            onChange={e => handleMonthChange(e)}
            value={month}
            inputMode='numeric'
            ref={monthRef}
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
          />
        </div>
      </div>
      <button className='signup-next-btn' ref={nextBtnRef}>
        NEXT
      </button>
    </div>
  )
}

export default Profile
