import React, { useState } from 'react'
import { useForm } from '@formspree/react'

import { connect } from 'react-redux'
import { submitUserFeedback } from '../../../redux/actions/auth/authStatus'
import Feedback from './Feedback'

const options = [
  { value: 'bug', label: 'Reporting A Bug' },
  { value: 'feature', label: 'Requesting A Feature' },
  { value: 'question', label: 'Asking A Question' },
  { value: 'other', label: 'Other' },
]
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
    background: '#334257',
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

const FeedbackContainer = ({ submitUserFeedback }) => {
  const [error, setError] = useState('')

  const [selectOption, setSelectOption] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [coinsEarned, setCoinsEarned] = useState(null)

  const [formState, submitFormspree] = useForm('xjvlzdkq')

  const handleSelectChange = e => {
    setSelectOption(e)
  }

  const clearForm = () => {
    setSelectOption(null)
    setTitle('')
    setDescription('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!selectOption) return setError('Please Enter Category')

    submitFormspree(e)
    const numCoinsEarned = await submitUserFeedback(
      selectOption.value,
      title,
      description
    )
    setCoinsEarned(numCoinsEarned)
    clearForm()
  }

  return (
    <Feedback
      formState={formState}
      handleSubmit={handleSubmit}
      coinsEarned={coinsEarned}
      options={options}
      customStyles={customStyles}
      selectOption={selectOption}
      handleSelectChange={handleSelectChange}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      error={error}
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    submitUserFeedback: (category, title, description) =>
      dispatch(submitUserFeedback(category, title, description)),
  }
}

export default connect(null, mapDispatchToProps)(FeedbackContainer)
