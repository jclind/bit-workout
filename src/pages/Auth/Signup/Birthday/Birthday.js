import React, { useState, useRef } from 'react'
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

  const handleMonthChange = e => {
    const newVal = e.target.value

    if (newVal === '') {
      setMonth('')
    }

    // Don't allow non-number inputs
    console.log(isNaN(newVal))
    if (isNaN(newVal)) {
      return setMonth('')
    }

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
    const newVal = e

    if (!newVal) {
      setMonth('')
    }
    // Don't allow non-number inputs
    if (newVal && isNaN(newVal)) return

    if (newVal > 31) {
      return
    }

    setMonth(newVal)
  }
  const handleYearChange = e => {}

  return (
    <div className='signup-page birthday'>
      <div className='title'>Date Of Birth</div>
      <div className='birthday-input-container'>
        <span>{month}</span>
        <div className='month'>
          <input
            type='text'
            placeholder={'MM'}
            onChange={e => handleMonthChange(e)}
            value={month}
            inputMode='number'
          />
        </div>
        <div className='day'>
          <input
            type='text'
            placeholder={'DD'}
            onChange={e => handleDayChange(e)}
            value={day}
            ref={dayRef}
            inputMode='number'
          />
        </div>
        <div className='year'>
          <input
            type='text'
            placeholder={'YYYY'}
            onChange={e => handleYearChange(e)}
            value={year}
            ref={yearRef}
            inputMode='number'
          />
        </div>
      </div>
    </div>
  )
}

export default Profile
