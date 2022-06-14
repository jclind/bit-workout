import React from 'react'
import './Character.scss'
import characterImg from '../../assets/images/character.png'
import { AiOutlineStar } from 'react-icons/ai'
import { RiCopperCoinLine } from 'react-icons/ri'
import {
  calcExp,
  calcLevel,
  expToAdvanceFrom,
  expToLevelAndDifference,
} from '../../util/calcLevel'
import { connect } from 'react-redux'
const Character = ({ username, exp, coins }) => {
  const { level, expThroughCurrLevel, levelDifference } =
    expToLevelAndDifference(544)

  return (
    <div className='character'>
      <div className='head'>
        <div className='img-container'>
          <img src={characterImg} alt='avatar' className='avatar' />
        </div>
        <div className='info'>
          <div className='info-heading'>
            <div className='username'>{username}</div>-
            <div className='level'>Level {level}</div>
            <div className='coins'>
              <RiCopperCoinLine className='coin-icon' /> {coins || 0}
            </div>
          </div>
          <div className='exp-bar-container'>
            <div className='bar'>
              <AiOutlineStar className='icon' />
              <div
                className='exp'
                style={{
                  width: `${(expThroughCurrLevel / levelDifference) * 100}%`,
                }}
              ></div>
            </div>
            <div className='text'>
              <div className='data'>
                {expThroughCurrLevel} / {levelDifference}
              </div>
              <div className='title'>Experience</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    username: state.auth.userAccountData.username,
    exp: state.character.exp,
    coins: state.character.coins,
  }
}

export default connect(mapStateToProps)(Character)
