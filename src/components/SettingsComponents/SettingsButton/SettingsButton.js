import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SettingsButton.scss'
import rightIcon from '../../../assets/images/icons/right.svg'

const SettingsButton = ({ title, input, icon, link, action }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (link) {
      navigate(link)
    } else if (action) {
      action()
    }
  }

  return (
    <div className='settings-button' onClick={handleClick}>
      {icon && (
        <img src={icon} alt={title} className='settings-button-icon icon' />
      )}
      <div className={icon ? 'setting-title active-icon' : 'setting-title'}>
        {title}
      </div>
      {input && <div className='input-text'>{input}</div>}
      {link && (
        <img src={rightIcon} alt='right arrow' className='right-icon icon' />
      )}
    </div>
  )
}

export default SettingsButton
