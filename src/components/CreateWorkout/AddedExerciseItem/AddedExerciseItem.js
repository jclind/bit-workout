import React from 'react'
import { FiChevronDown } from 'react-icons/fi'
import FormInput from '../../FormInput/FormInput'
import { exerciseList } from '../../../assets/data/exerciseList'
import './AddedExerciseItem.scss'

const ChooseExerciseBtn = ({ toggleDropdown, selectedExercise }) => {
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

const ExerciseDropdown = ({
  isDropdown,
  exerciseSearchVal,
  setExerciseSearchVal,
  selectExercise,
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
        />
      </div>
      <div className='exercise-cells'>
        {exerciseList.slice(0, 50).map(ex => {
          const exerciseMatchesSearchVal = ex.name
            .toLowerCase()
            .includes(exerciseSearchVal.toLowerCase())
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
const RepSetSelection = ({ reps, setReps, sets, setSets }) => {
  return (
    <div className='inputs'>
      <div className='reps-input-container'>
        <div className='label'>Num Reps:</div>
        <FormInput
          val={reps}
          setVal={val => {
            if (val % 1 !== 0 || val < 0) return
            setReps(val)
          }}
          placeholder={'5'}
          inputType='number'
        />
      </div>
      <div className='sets-input-container'>
        <div className='label'>Num Sets:</div>
        <FormInput
          val={sets}
          setVal={val => {
            if (val % 1 !== 0 || val < 0) return
            setSets(val)
          }}
          placeholder={'5'}
          inputType='number'
        />
      </div>
    </div>
  )
}

const AddedExerciseItem = ({
  id,
  selectedExercise,
  selectExercise,
  exerciseContainer,
  toggleDropdown,
  isDropdown,
  exerciseSearchVal,
  setExerciseSearchVal,
  reps,
  setReps,
  sets,
  setSets,
  deleteAddedExercise,
}) => {
  return (
    <div className='added-exercise-item'>
      <div className='select-exercise-container' ref={exerciseContainer}>
        <ChooseExerciseBtn
          toggleDropdown={toggleDropdown}
          selectedExercise={selectedExercise}
        />
        <ExerciseDropdown
          isDropdown={isDropdown}
          exerciseSearchVal={exerciseSearchVal}
          setExerciseSearchVal={setExerciseSearchVal}
          selectExercise={selectExercise}
        />
      </div>
      <RepSetSelection
        reps={reps}
        setReps={setReps}
        sets={sets}
        setSets={setSets}
      />
      <button
        type='button'
        className='remove-exercise-btn btn'
        onClick={() => deleteAddedExercise(id)}
      >
        Remove From List
      </button>
    </div>
  )
}

export default AddedExerciseItem
