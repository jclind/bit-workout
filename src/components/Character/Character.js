import React from 'react'
import './Character.scss'
import characterImg from '../../assets/images/character.png'
const Character = () => {
  return (
    <div className='character'>
      <div className='head'>
        <div className='img-container'>
          <img src={characterImg} alt='avatar' className='avatar' />
        </div>
      </div>
    </div>
  )
}

export default Character
