import React from 'react'
import './Character.scss'
import characterImg from '../../assets/images/character.png'
import { calcLevel, expToAdvanceFrom } from '../../util/calcLevel'
const Character = () => {
  calcLevel()
  console.log(expToAdvanceFrom(5))
  return (
    <div className='character'>
      <div className='head'>
        <div className='img-container'>
          <img src={characterImg} alt='avatar' className='avatar' />
        </div>
        <div className='info'>
          <div className='exp-bar-container'></div>
        </div>
      </div>
    </div>
  )
}

export default Character
