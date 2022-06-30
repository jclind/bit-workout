import React, { useState } from 'react'
import BirthdayInput from '../../../../components/AuthForms/Signup/Personal/BirthdayInput/BirthdayInput'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import './Birthday.scss'

const Profile = () => {
  const [birthday, setBirthday] = useState('')

  const [startDate, setStartDate] = useState(new Date())

  const [isInputFocused, setIsInputFocused] = useState(false)

  return (
    <div className='signup-page profile'>
      <div className='title'>Date Of Birth</div>
      <div
        className='birthday-input-container'
        onFocus={() => setIsInputFocused(true)}
      >
        <input type='date' className='birthday-input' />

        {/* <DatePicker
          selected={startDate}
          onChange={date => setStartDate(date)}
        /> */}
      </div>
    </div>
  )
}

export default Profile
