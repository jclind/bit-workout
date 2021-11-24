import React from 'react'
import { Link } from 'react-router-dom'

const SignupForm = ({
  handleSubmit,
  loading,
  error,
  emailRef,
  passwordRef,
  currentUser,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <div>ERROR!</div>}
        <label>
          Email
          <input type='email' ref={emailRef} />
        </label>
        <label>
          Password
          <input type='password' ref={passwordRef} />
        </label>
        <button type='submit' disabled={loading}>
          Sign Up
        </button>
      </form>
      <div>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </>
  )
}

export default SignupForm
