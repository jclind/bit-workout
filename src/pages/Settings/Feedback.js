import React, { useState } from 'react'
import Select from 'react-select'
import { useForm } from '@formspree/react'
import './Feedback.scss'
import BackButton from '../../components/SettingsComponents/BackButton/BackButton'
import { AiOutlineCheck } from 'react-icons/ai'
import { RiCopperCoinLine } from 'react-icons/ri'
import { connect } from 'react-redux'
import { submitUserFeedback } from '../../redux/actions/auth/authStatus'

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

const Feedback = ({ submitUserFeedback }) => {
  const [selectOption, setSelectOption] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [coinsEarned, setCoinsEarned] = useState(null)

  const [error, setError] = useState('')

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
    console.log(numCoinsEarned)
    setCoinsEarned(numCoinsEarned)
    clearForm()
  }

  return (
    <div className='feedback-page page'>
      <div className='settings-title'>Feedback</div>
      <div className='form-container'>
        {formState.succeeded ? (
          <div className='form-success'>
            <AiOutlineCheck className='icon' />
            <div className='text'>
              Thank you for your feedback, we really appreciate it!
            </div>

            {coinsEarned !== null ? (
              <div className='coins'>
                <div className='text'>+</div>
                <RiCopperCoinLine className='coin-icon' /> {coinsEarned}
              </div>
            ) : null}

            <button
              className='submit-another-form-btn btn'
              onClick={() => window.location.reload()}
            >
              Submit Another Form
            </button>
          </div>
        ) : (
          <form className='report-form' onSubmit={handleSubmit}>
            {error && <div className='error'>{error}</div>}
            <label className='select-container'>
              <div className='text'>Category</div>
              <Select
                options={options}
                styles={customStyles}
                isSearchable={false}
                isClearable={false}
                className='select'
                value={selectOption}
                onChange={handleSelectChange}
                placeholder={'Select an option...'}
                name='category'
              />
            </label>
            <label htmlFor='' className='title-input-label'>
              <div className='text'>Title</div>
              <input
                type='text'
                name='title'
                className='title-input'
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder='Enter a title'
                required={true}
              />
            </label>
            <label htmlFor='' className='description-input-label'>
              <div className='text'>Description</div>
              <textarea
                className='description-textarea'
                value={description}
                name='description'
                onChange={e => setDescription(e.target.value)}
                placeholder='Enter a description'
                rows='5'
                required={true}
              ></textarea>
            </label>
            <button type='submit' className='submit-help-btn btn'>
              Submit
            </button>
            <a
              href='https://github.com/jclind/bit-workout/issues'
              className='issue-link'
              target='_blank'
              rel='noopener noreferrer'
            >
              Report issue on github
            </a>
          </form>
        )}
      </div>
      <BackButton />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    submitUserFeedback: (category, title, description) =>
      dispatch(submitUserFeedback(category, title, description)),
  }
}

export default connect(null, mapDispatchToProps)(Feedback)