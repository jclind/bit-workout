import React from 'react'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
]

const ExerciseTypeDropdown = () => {
  return (
    <div className='exercise-type-dropdown-container'>
      <Select
        options={options}
        placeholder='Exercise Type'
        className='select'
      />
    </div>
  )
}

export default ExerciseTypeDropdown
