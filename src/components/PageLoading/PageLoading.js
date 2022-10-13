import React from 'react'
import FadeLoader from 'react-spinners/FadeLoader'
import './PageLoading.scss'

const PageLoading = ({ loadingText }) => {
  return (
    <div className='fade-loader-container'>
      <div className='spinner-container'>
        <FadeLoader
          color={'#548ca8'}
          className='spinner'
          height={8}
          width={3}
          radius={10}
          margin={-8}
        />
      </div>
      <div className='text'>{loadingText || 'loading...'}</div>
    </div>
  )
}

export default PageLoading
