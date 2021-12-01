import React, { useContext, useState } from 'react'
import { SignupContext } from '../../../pages/Signup'
import FormInput from '../../FormInput'
import birthdayIcon from '../../../assets/images/icons/birthday.svg'
import heightIcon from '../../../assets/images/icons/height.svg'
import weightIcon from '../../../assets/images/icons/weight.svg'
import BirthdayInput from '../../BirthdayInput'
import HeightInput from '../../HeightInput'
import WeightInput from '../../WeightInput'

const SignupPersonal = () => {
  const {
    handleSubmit,
    birthdayVal,
    setBirthdayVal,
    heightVal,
    setHeightVal,
    weightVal,
    setWeightVal,
  } = useContext(SignupContext)

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
          <HeightInput
            icon={heightIcon}
            placeholder='height'
            val={heightVal}
            setVal={setHeightVal}
          />
          <WeightInput
            icon={weightIcon}
            placeholder='Weight'
            inputType={'number'}
            val={weightVal}
            setVal={setWeightVal}
            required={true}
          />
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
