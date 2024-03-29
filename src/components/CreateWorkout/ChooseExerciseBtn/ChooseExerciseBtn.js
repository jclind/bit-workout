import React from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { exerciseList } from '../../../assets/data/exerciseList'
import './ChooseExerciseBtn.scss'

const ChooseExerciseBtn = ({ toggleDropdown, selectedExerciseID }) => {
  const selectedExercise = exerciseList.find(ex => ex.id === selectedExerciseID)
  return (
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
  )
}

export default ChooseExerciseBtn
