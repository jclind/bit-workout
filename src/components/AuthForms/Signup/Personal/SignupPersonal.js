import React, { useState, useContext, useRef } from 'react'
import { SignupContext } from '../../../../pages/Auth/Signup/Signup'
import birthdayIcon from '../../../../assets/images/icons/birthday.svg'
import heightIcon from '../../../../assets/images/icons/height.svg'
import weightIcon from '../../../../assets/images/icons/weight.svg'
import BirthdayInput from './BirthdayInput/BirthdayInput'
import HeightInputContainer from './HeightInput/HeightInputContainer'
import WeightInput from './WeightInput/WeightInput'
import { AiOutlineWarning } from 'react-icons/ai'

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

  const [error, setError] = useState('')

  const weightInputRef = useRef('')
  const signupBtnRef = useRef('')

  const handleSubmit = e => {
    e.preventDefault()

    if (!genderVal) {
      return setError('Please select gender')
    }
    if (!birthdayVal) {
      return setError('Please enter birthday')
    }
    if (!heightVal) {
      return setError('Please enter height')
    } else if (!heightVal.feet) {
      return setError('Please enter height feet')
    } else if (!heightVal.inches) {
      return setError('Please enter height inches')
    }
    if (!weightVal) {
      return setError('Please enter weight')
    } else if (weightVal <= 40) {
      return setError('Please enter a weight greater than 40lbs')
    } else if (weightVal >= 1000) {
      return setError('Please enter a weight less than 100lbs')
    }

    handleSignup()
  }

  return (
    <>
      <div className='content signup-personal-info'>
        {error && (
          <div className='form-error'>
            <AiOutlineWarning className='icon' />
            {error}
          </div>
        )}
        <form action='' onSubmit={handleSubmit}>
          <h3 className='sub-text'>Please enter the following information:</h3>
          <div className='gender-inputs'>
            <button
              type='button'
              className={genderVal === 'female' ? 'female selected' : 'female'}
              onClick={() => setGenderVal('female')}
              tabIndex={1}
            >
              Female
            </button>
            <button
              type='button'
              className={genderVal === 'male' ? 'male selected' : 'male'}
              onClick={() => setGenderVal('male')}
              tabIndex={2}
            >
              Male
            </button>
          </div>
          <div className='inputs'>
            <BirthdayInput
              icon={birthdayIcon}
              placeholder='birthday'
              val={birthdayVal}
              setVal={setBirthdayVal}
              required={true}
              tabIndex={3}
            />
            <HeightInputContainer
              icon={heightIcon}
              placeholder='height'
              val={heightVal}
              setVal={setHeightVal}
              weightInputRef={weightInputRef}
            />
            <WeightInput
              icon={weightIcon}
              placeholder='Weight, lbs'
              inputType={'number'}
              val={weightVal}
              setVal={setWeightVal}
              required={true}
              weightInputRef={weightInputRef}
              signupBtnRef={signupBtnRef}
            />
          </div>
          <button type='submit' className='submit-btn' ref={signupBtnRef}>
            Complete Sign Up
          </button>
        </form>
      </div>
    </>
  )
}

export default SignupPersonal
