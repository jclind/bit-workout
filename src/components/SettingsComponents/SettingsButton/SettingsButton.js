import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SettingsButton.scss'
import { AiOutlineRight } from 'react-icons/ai'

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
      {link && <AiOutlineRight className='right-icon icon' />}
    </div>
  )
}

export default SettingsButton
