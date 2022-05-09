import React, { useState, useEffect } from 'react'
import { BsFillTagFill } from 'react-icons/bs'
import { FiChevronDown } from 'react-icons/fi'
import FormInput from '../../FormInput/FormInput'
import { exerciseList } from '../../../assets/data/exerciseList'
import './AddedExerciseItem.scss'
import useClickOutside from '../../../util/useClickOutside'

const AddedExerciseItem = ({ item, changeAddedExerciseData }) => {
  const [reps, setReps] = useState('')
  const [sets, setSets] = useState('')

  const [isDropdown, setIsDropdown] = useState(false)
  const [exerciseSearchVal, setExerciseSearchVal] = useState('')
  const [selectedExercise, setSelectedExercise] = useState(item.exercise)

  const exerciseContainer = useClickOutside(() => {
    setIsDropdown(false)
  })

  const selectExercise = ex => {
    const id = item.id
    changeAddedExerciseData({ exercise: ex }, id)
    setSelectedExercise(ex)
    toggleDropdown()
  }

  const toggleDropdown = () => {
    setIsDropdown(!isDropdown)
  }

  return (
    <div className='added-exercise-item'>
      <div className='select-exercise-container' ref={exerciseContainer}>
        <button
          type='button'
          className='select-exercise btn'
          onClick={toggleDropdown}
        >
          <div className='selector-text'>
            {selectedExercise ? (
              <>
                <div className='img-container'>
                  <img src={selectedExercise.imageURL} alt='' />
                </div>
                <div className='name'>
                  {selectedExercise.name}{' '}
                  <span className='weights'>
                    {selectedExercise.weights ? '(Weights)' : '(No Weights)'}
                  </span>
                </div>
              </>
            ) : (
              <div className='text'>Choose An Exercise</div>
            )}

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
              <div
                className='dropdown-cell exercise-cell'
                onClick={() => selectExercise(ex)}
              >
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
