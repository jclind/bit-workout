import React from 'react'
import { exerciseList } from '../../../assets/data/exerciseList'
import './ExerciseDropdown.scss'

const ExerciseDropdown = ({
  isDropdown,
  exerciseSearchVal,
  setExerciseSearchVal,
  selectExercise,
  searchInputRef,
}) => {
  return (
    <div className={isDropdown ? 'dropdown visible' : 'dropdown'}>
      <label className='dropdown-cell'>Choose An Exercise</label>
      <div className='dropdown-cell'>
        <input
          className='search-input'
          placeholder='Find Exercise'
          value={exerciseSearchVal}
          onChange={e => setExerciseSearchVal(e.target.value)}
          ref={searchInputRef}
        />
      </div>
      <div className='exercise-cells'>
        {exerciseList.slice(0, 50).map(ex => {
          const exerciseMatchesSearchVal =
            ex.name.toLowerCase().includes(exerciseSearchVal.toLowerCase()) ||
            ex.name.toLowerCase() === 'other'
          if (exerciseSearchVal && !exerciseMatchesSearchVal) {
            return null
          }
          return (
            <div
              className='dropdown-cell exercise-cell'
              onClick={() => selectExercise(ex)}
              key={ex.id}
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
  )
}

export default ExerciseDropdown
