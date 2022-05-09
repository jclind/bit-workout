import React, { useState } from 'react'
import { BsFillTagFill } from 'react-icons/bs'
import { FiChevronDown } from 'react-icons/fi'
import FormInput from '../../FormInput/FormInput'
import { exerciseList } from '../../../assets/data/exerciseList'
import './AddedExerciseItem.scss'

const AddedExerciseItem = ({ item }) => {
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')

  const [isDropdown, setIsDropdown] = useState(true)
  const [exerciseSearchVal, setExerciseSearchVal] = useState('')

  return (
    <div className='added-exercise-item'>
      <div className='select-exercise-container'>
        <button type='button' className='select-exercise btn'>
          <div className='selector-text'>
            <div className='text'>
              {item.exercise ? 'FIX ME' : 'Choose An Exercise'}
            </div>
            <FiChevronDown className='icon' />
          </div>
        </button>
        <div className={isDropdown ? 'dropdown visible' : 'dropdown'}>
          <label className='dropdown-cell'>Choose An Exercise</label>
          <div className='dropdown-cell'>
            <input
              className='search-input'
              placeholder='Find Exercise'
              value={exerciseSearchVal}
              onChange={e => setExerciseSearchVal(e.target.value)}
            />
          </div>
          {exerciseList.slice(0, 8).map(ex => {
            if (
              exerciseSearchVal &&
              !ex.name.toLowerCase().includes(exerciseSearchVal.toLowerCase())
            ) {
              return null
            }
            return (
              <div className='dropdown-cell exercise-cell'>
                <div className='img-container'>
                  <img src={ex.imageURL} alt='' />
                </div>
                <div className='name'>
                  {ex.name}{' '}
                  <span className='weights'>
                    {ex.weights ? '(Weights)' : '(No Weights)'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='inputs'>
        <div className='reps-input-container'>
          <div className='label'>Num Reps:</div>
          <FormInput
            val={reps}
            setVal={setReps}
            placeholder={'5'}
            inputType='number'
          />
        </div>
        <div className='sets-input-container'>
          <div className='label'>Num Sets:</div>
          <FormInput
            val={sets}
            setVal={setSets}
            placeholder={'5'}
            inputType='number'
          />
        </div>
      </div>
    </div>
  )
}

export default AddedExerciseItem
