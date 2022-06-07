import React from 'react'
import { Link } from 'react-router-dom'
import FormInput from '../../FormInput/FormInput'
import { BsArrowLeft } from 'react-icons/bs'
import { AiOutlineCheck, AiOutlineWarning } from 'react-icons/ai'
import { TailSpin } from 'react-loader-spinner'

const ForgotPassword = ({
  handleSubmit,
  loading,
  error,
  message,
  email,
  setEmail,
}) => {
  return (
    <>
      <h2 className='title'>Reset Password</h2>
      <p className='instructions'>
        Please enter the email associated with your account and password reset
        instructions will be emailed you.
      </p>
      {error && (
        <div className='form-error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
      {message && (
        <div className='form-success'>
          <AiOutlineCheck className='icon' />
          {message}
        </div>
      )}
      <div className='form-container'>
        <form onSubmit={handleSubmit}>
          <FormInput
            inputType='email'
            val={email}
            setVal={setEmail}
            placeholder='Enter Your Email'
            required={true}
          />

          <button className='submit-btn'>
            {loading ? (
              <TailSpin
                height='30'
                width='30'
                color='white'
                arialLabel='loading'
                className='spinner'
              />
            ) : (
              'Send Email'
            )}
          </button>
        </form>
        <div className='return-to-login'>
          <BsArrowLeft className='icon' />
          <Link to='/login' className='link'>
            Return to login
          </Link>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
