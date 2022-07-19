import React from 'react'
import Select from 'react-select'

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '40px',
    background: 'none',
    height: '40px',
    minWidth: '100%',
    boxShadow: state.isFocused ? null : null,
    outline: 'none',
    border: state.isFocused ? '1px solid #548ca8' : '1px solid #d6d6d6',
    borderRadius: '10px',
    ':hover': {
      border: '1px solid #548ca8',
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'white',
    fontWeight: '500',
    paddingBottom: '3px',
    background: 'none',
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: '40px',
    padding: '0 6px',
  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '40px',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontWeight: '500',
    color: '#bebebe',
  }),
  menu: (provided, state) => ({
    ...provided,
    background: '#476072',
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected
      ? '#548ca8'
      : state.isFocused
      ? '#476072'
      : 'none',
    ':active': {
      background: '#476072',
    },
  }),
}

const ExerciseTypeDropdown = ({ options, exerciseType, setExerciseType }) => {
  return (
    <div className='exercise-type-dropdown-container'>
      <Select
        options={options}
        styles={customStyles}
        value={exerciseType}
        onChange={e => setExerciseType(e)}
        placeholder='Exercise Type'
        className='select'
      />
    </div>
  )
}

export default ExerciseTypeDropdown
