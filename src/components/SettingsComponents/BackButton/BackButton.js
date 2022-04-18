import React from 'react'
import { useNavigate } from 'react-router'
import leftIcon from '../../../assets/images/icons/left.svg'
import './BackButton.scss'

const BackButton = () => {
  const navigate = useNavigate()

  return (
    <div className='back-button icon' onClick={() => navigate(-1)}>
      <img src={leftIcon} alt='back-button' className='icon' />
    </div>
  )
}

export default BackButton
