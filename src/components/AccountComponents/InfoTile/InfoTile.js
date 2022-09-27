import React from 'react'
import { useNavigate } from 'react-router-dom'
import './InfoTile.scss'

const InfoTile = ({ title, text, subtext, link }) => {
  const navigate = useNavigate()
  const handleInfoTileClick = () => {
    if (link) {
      navigate(link)
    } else {
      // !ERROR
    }
  }
  return (
    <div
      className='info-tile'
      onClick={handleInfoTileClick}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          handleInfoTileClick()
        }
      }}
      tabIndex='0'
    >
      <div className='info-tile-title'>{title}</div>
      <div className='text-container'>
        <div className='info-tile-text'>{text}</div>
        {subtext && <div className='info-tile-subtext'>{subtext}</div>}
      </div>
    </div>
  )
}

export default InfoTile
