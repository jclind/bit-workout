import React from 'react'
import { useNavigate } from 'react-router-dom'
import './InfoTile.scss'

const InfoTile = ({ title, text, subtext, link }) => {
  const navigate = useNavigate()
  const handleClick = () => {
    if (link) {
      navigate(link)
    }
  }
  return (
    <div className='info-tile' onClick={handleClick}>
      <div className='info-tile-title'>{title}</div>
      <div className='text-container'>
        <div className='info-tile-text'>{text}</div>
        {subtext && <div className='info-tile-subtext'>{subtext}</div>}
      </div>
    </div>
  )
}

export default InfoTile