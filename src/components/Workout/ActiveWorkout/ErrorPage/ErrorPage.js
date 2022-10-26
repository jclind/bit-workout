import React from 'react'
import './ErrorPage.scss'

const ErrorPage = ({ error }) => {
  return (
    <div className='workout-error-page'>
      <div className='title'>Something went wrong...</div>
      <div className='text'>
        {error} Try refreshing the page or canceling the workout.
      </div>
    </div>
  )
}

export default ErrorPage
