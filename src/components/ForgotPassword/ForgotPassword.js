import React from 'react'
import { Link } from 'react-router-dom'

const ForgotPassword = ({ handleSubmit, emailRef, loading, error }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <div>ERROR!</div>}
        <label>
          Email
          <input type='email' ref={emailRef} />
        </label>

        <button type='submit' disabled={loading}>
          Reset Password
        </button>
      </form>
      <div>
        <Link to='/login'>Login</Link>
      </div>
      <div>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  )
}

export default ForgotPassword
