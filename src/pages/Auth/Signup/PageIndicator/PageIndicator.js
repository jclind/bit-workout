import React from 'react'
import './PageIndicator.scss'

const PageIndicator = ({ currPage }) => {
  const numPages = 5

  const tiles = []

  for (let i = 1; i <= numPages; i++) {
    tiles.push(
      <div
        className={`tile ${
          i === currPage - 1
            ? 'completed last-completed'
            : i < currPage
            ? 'completed '
            : ''
        }`}
      >
        <div className='color'></div>
      </div>
    )
  }

  return (
    <div className='signup-page-indicator'>
      <div className='tiles'>
        {tiles.map(tile => {
          return tile
        })}
      </div>
    </div>
  )
}

export default PageIndicator
