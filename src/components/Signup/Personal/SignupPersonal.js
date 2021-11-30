import React, { useContext, useState } from 'react'
import { SignupContext } from '../../../pages/Signup'
import FormInput from '../../FormInput'
import birthdayIcon from '../../../assets/images/icons/birthday.svg'
import BirthdayInput from '../../BirthdayInput'
import HeightInput from '../../HeightInput'

const SignupPersonal = () => {
  const { handleSubmit, birthdayVal, setBirthdayVal } =
    useContext(SignupContext)

  const [startDate, setStartDate] = useState(new Date())

  return (
    <>
      <div className='content signup-personal-info'>
        <form action='' onSubmit={handleSubmit}>
          <h3 className='sub-text'>Please enter the following information:</h3>
          <div className='gender-inputs'>
            <div className='female'>Female</div>
            <div className='male'>Male</div>
          </div>
          <BirthdayInput
            icon={birthdayIcon}
            placeholder='birthday'
            val={birthdayVal}
            setVal={setBirthdayVal}
            required={true}
          />
          <HeightInput />
          {/* <input
            type='text'
            onFocus={e => {
              e.target.type = 'date'
            }}
            min='1900-01-01'
            max={`${new Date().getFullYear()}-12-31`}
            placeholder='birthday'
          /> */}
        </form>
      </div>
    </>
  )
}

export default SignupPersonal
