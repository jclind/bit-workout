import React from 'react'
import { useNavigate } from 'react-router'
import leftIcon from '../../../assets/images/icons/left.svg'
import './BackButton.scss'

const BackButton = ({ link }) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (link) return navigate(link)
    return navigate(-1)
  }

  return (
    <button className='back-button icon' onClick={handleNavigate}>
      <img src={leftIcon} alt='back-button' className='icon' />
    </button>
  )
}

export default BackButton
