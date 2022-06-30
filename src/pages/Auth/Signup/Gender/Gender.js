import React, { useState } from 'react'
import './Gender.scss'

const Gender = () => {
  const [gender, setGender] = useState(null)
  return (
    <div className='signup-page gender'>
      <div className='title'>Gender</div>
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
    </div>
  )
}

export default Gender
