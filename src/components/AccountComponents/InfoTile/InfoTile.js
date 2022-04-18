import React from 'react'
import './InfoTile.scss'

const InfoTile = ({ title, text, subtext }) => {
  return (
    <div className='info-tile'>
      <div className='info-tile-title'>{title}</div>
      <div className='text-container'>
        <div className='info-tile-text'>{text}</div>
        {subtext && <div className='info-tile-subtext'>{subtext}</div>}
      </div>
    </div>
  )
}

export default InfoTile
