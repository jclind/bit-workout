import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsChevronLeft } from 'react-icons/bs'
import './BackButton.scss'

const BackButton = ({ link }) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    if (link) return navigate(link)
    return navigate(-1)
  }

  return (
    <button
      className='back-button'
      onClick={handleNavigate}
      aria-label='Back Button'
    >
      <BsChevronLeft className='icon' />
    </button>
  )
}

export default BackButton
