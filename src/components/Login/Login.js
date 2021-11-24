import React from 'react'
import { Link } from 'react-router-dom'

const Login = ({ handleSubmit, loading, error, emailRef, passwordRef }) => {
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
          Log In
        </button>
      </form>
      <div>
        Need an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </>
  )
}

export default Login
