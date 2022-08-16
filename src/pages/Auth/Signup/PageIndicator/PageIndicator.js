import React from 'react'
import './PageIndicator.scss'

const PageIndicator = ({ currPage }) => {
  const numPages = 7

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
        style={{ width: `${100 / numPages - 3}%` }}
      >
        <div className='color'></div>
      </div>
    )
  }

  return (
    <div className='signup-page-indicator'>
      <div className='tiles'>
        {tiles.map((tile, idx) => {
          return <React.Fragment key={idx}>{tile}</React.Fragment>
        })}
      </div>
    </div>
  )
}

export default PageIndicator
