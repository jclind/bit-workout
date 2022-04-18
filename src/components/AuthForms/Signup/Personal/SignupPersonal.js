import React, { useContext } from 'react'
import { SignupContext } from '../../../../pages/Auth/Signup/Signup'
import birthdayIcon from '../../../../assets/images/icons/birthday.svg'
import heightIcon from '../../../../assets/images/icons/height.svg'
import weightIcon from '../../../../assets/images/icons/weight.svg'
import BirthdayInput from './BirthdayInput/BirthdayInput'
import HeightInputContainer from '../../../HeightInput/HeightInputContainer'
import WeightInput from './WeightInput/WeightInput'

const SignupPersonal = () => {
  const {
    genderVal,
    setGenderVal,
    handleSignup,
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
        <form action='' onSubmit={handleSignup}>
          <h3 className='sub-text'>Please enter the following information:</h3>
          <div className='gender-inputs'>
            <div
              className={genderVal === 'female' ? 'female selected' : 'female'}
              onClick={() => setGenderVal('female')}
            >
              Female
            </div>
            <div
              className={genderVal === 'male' ? 'male selected' : 'male'}
              onClick={() => setGenderVal('male')}
            >
              Male
            </div>
          </div>
          <div className='inputs'>
            <BirthdayInput
              icon={birthdayIcon}
              placeholder='birthday'
              val={birthdayVal}
              setVal={setBirthdayVal}
              required={true}
            />
            <HeightInputContainer
              icon={heightIcon}
              placeholder='height'
              val={heightVal}
              setVal={setHeightVal}
            />
            <WeightInput
              icon={weightIcon}
              placeholder='Weight, lbs'
              inputType={'number'}
              val={weightVal}
              setVal={setWeightVal}
              required={true}
            />
          </div>
          <button type='submit' className='submit-btn'>
            Complete Sign Up
          </button>
        </form>
      </div>
    </>
  )
}

export default SignupPersonal
