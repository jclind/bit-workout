import React from 'react'
import Select from 'react-select'
import './Feedback.scss'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import { AiOutlineCheck } from 'react-icons/ai'
import { RiCopperCoinLine } from 'react-icons/ri'

const FormSubmitted = ({ coinsEarned }) => {
  return (
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
  )
}

const Feedback = ({
  formState,
  handleSubmit,
  coinsEarned,
  options,
  customStyles,
  selectOption,
  handleSelectChange,
  title,
  setTitle,
  description,
  setDescription,
  error,
}) => {
  return (
    <div className='feedback-page page'>
      <div className='settings-title'>Feedback</div>
      <div className='form-container'>
        {formState && formState.succeeded ? (
          <FormSubmitted coinsEarned={coinsEarned} />
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

export default Feedback
