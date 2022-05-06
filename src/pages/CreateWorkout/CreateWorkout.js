import React, { useState } from 'react'
import FormInput from '../../components/FormInput/FormInput'
import BackButton from '../../components/SettingsComponents/BackButton/BackButton'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import './CreateWorkout.scss'

const CreateWorkout = () => {
  const [workoutName, setWorkoutName] = useState('')
  const [restTimeMinutes, setRestTimeMinutes] = useState('')
  const [restTimeSeconds, setRestTimeSeconds] = useState('')

  const [failedRestTimeMinutes, setFailedRestTimeMinutes] = useState('')
  const [failedRestTimeSeconds, setFailedRestTimeSeconds] = useState('')

  const [searchExerciseVal, setSearchExerciseVal] = useState('')

  // !CREATE MODAL FOR SEARCHING EXERCISES

  return (
    <div className='create-workout page'>
      <div className='settings-title'>Create Workout</div>
      <form className='create-workout-form'>
        <div className='name-input-container'>
          <div className='label'>Workout Name:</div>
          <FormInput
            val={workoutName}
            setVal={setWorkoutName}
            placeholder={'Enter Name'}
          />
        </div>
        <div className='rest-time'>
          <div className='label'>Rest Between Sets</div>
          <div className='inputs-container'>
            <FormInput
              placeholder='Minutes'
              inputType='number'
              val={restTimeMinutes}
              setVal={setRestTimeMinutes}
            />
            <FormInput
              placeholder='Seconds'
              inputType='number'
              val={restTimeSeconds}
              setVal={setRestTimeSeconds}
            />
          </div>
        </div>
        <div className='fail-set-rest-time'>
          <div className='label'>Rest Between Failed Sets</div>
          <div className='inputs-container'>
            <FormInput
              placeholder='Minutes'
              inputType='number'
              val={failedRestTimeMinutes}
              setVal={setFailedRestTimeMinutes}
            />
            <FormInput
              placeholder='Seconds'
              inputType='number'
              val={failedRestTimeSeconds}
              setVal={setFailedRestTimeSeconds}
            />
          </div>
        </div>
        {/* <div className='select-exercise-container'>
          <div className='label'>Add Exercise To Workout</div>
          <FormInput
            val={searchExerciseVal}
            setVal={setSearchExerciseVal}
            placeholder='Search For Exercise'
          />
        </div> */}
        <div className='select-exercise-container'>
          <button type='button' className='select-exercise'>
            <AiOutlinePlusCircle className='icon' /> <span>Add Exercise</span>
          </button>
        </div>
      </form>
      <BackButton />
    </div>
  )
}

export default CreateWorkout
