import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SettingsButton.scss'
import { AiOutlineRight } from 'react-icons/ai'
import Switch from 'react-switch'

const SettingsButton = ({
  title,
  input,
  icon,
  link,
  action,
  isChecked,
  switchFunction,
}) => {
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
      {icon && icon}
      <div className={icon ? 'setting-title active-icon' : 'setting-title'}>
        {title}
      </div>
      {input && <div className='input-text'>{input}</div>}
      {isChecked !== undefined && (
        <Switch
          onChange={() => switchFunction()}
          checked={isChecked}
          onColor='#5ba4c9'
          offColor='#476072'
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
          activeBoxShadow='0px 0px 1px 10px rgba(0, 0, 0, 0.2)'
        />
      )}
      {link && <AiOutlineRight className='right-icon icon' />}
    </div>
  )
}

export default SettingsButton
