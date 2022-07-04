import React, { useState } from 'react'
import PageIndicator from '../PageIndicator/PageIndicator'
import { AiOutlineWarning } from 'react-icons/ai'
import './Weight.scss'

const Weight = () => {
  const [error, setError] = useState('')

  return (
    <div className='signup-page weight'>
      <PageIndicator currPage={3} />
      <div className='title'>Weight</div>
      {error && (
        <div className='error'>
          <AiOutlineWarning className='icon' />
          {error}
        </div>
      )}
    </div>
  )
}

export default Weight
