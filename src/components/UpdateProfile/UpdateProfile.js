import React from 'react'
import { Link } from 'react-router-dom'

const UpdateProfile = ({
  emailRef,
  passwordRef,
  currentUser,
  handleSubmit,
  loading,
  error,
  passwordConfirmRef,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        {error && <div>ERROR!</div>}
        <label>
          Email
          <input type='email' ref={emailRef} defaultValue={currentUser.email} />
        </label>
        <label>
          Password
          <input
            type='password'
            ref={passwordRef}
            placeholder='Leave blank to keep the same'
          />
        </label>
        <label>
          Confirm Password
          <input
            type='password'
            ref={passwordConfirmRef}
            placeholder='Leave blank to keep the same'
          />
        </label>
        <button type='submit' disabled={loading}>
          Update
        </button>
      </form>
      <div>
        <Link to='/dashboard'>Cancel</Link>
      </div>
    </>
  )
}

export default UpdateProfile
