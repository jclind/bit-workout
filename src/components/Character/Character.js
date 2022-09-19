import React from 'react'
import './Character.scss'
import characterImg from '../../assets/images/character.png'
import { AiOutlineStar } from 'react-icons/ai'
import { RiCopperCoinLine } from 'react-icons/ri'
import { expToLevelAndDifference } from '../../util/calcLevel'
import { connect } from 'react-redux'
import Skeleton from 'react-loading-skeleton'

const SKELETON_BASE_COLOR = '#546d80'
const SKELETON_HIGHLIGHT_COLOR = '#548ca8'

const Character = ({ username, exp, coins, loading }) => {
  const expData = !loading && expToLevelAndDifference(exp)
  const level = expData?.level || 0
  const expThroughCurrLevel = expData?.expThroughCurrLevel || 0
  const levelDifference = expData?.levelDifference || 33

  return (
    <div className='character'>
      <div className='head'>
        <div className='img-container'>
          {loading ? (
            <Skeleton
              circle
              className='avatar avatar-loading'
              baseColor={SKELETON_BASE_COLOR}
              highlightColor={SKELETON_HIGHLIGHT_COLOR}
            />
          ) : (
            <img src={characterImg} alt='avatar' className='avatar' />
          )}
        </div>
        <div className='info'>
          <div className='info-heading'>
            <div className='user-info'>
              <div className='username'>
                {loading ? (
                  <Skeleton
                    className='username-loading'
                    baseColor={SKELETON_BASE_COLOR}
                    highlightColor={SKELETON_HIGHLIGHT_COLOR}
                  />
                ) : (
                  username
                )}
              </div>
              <div className='level'>
                {loading ? (
                  <Skeleton
                    className='level-loading'
                    baseColor={SKELETON_BASE_COLOR}
                    highlightColor={SKELETON_HIGHLIGHT_COLOR}
                  />
                ) : (
                  `Level ${level}`
                )}
              </div>
            </div>
            {loading ? (
              <Skeleton
                className='coins-loading'
                baseColor={SKELETON_BASE_COLOR}
                highlightColor={SKELETON_HIGHLIGHT_COLOR}
              />
            ) : (
              <div className='coins'>
                <RiCopperCoinLine className='coin-icon' />{' '}
                <div className='text'>{coins || 0}</div>
              </div>
            )}
          </div>
          {loading ? (
            <Skeleton
              className='exp-loading'
              baseColor={SKELETON_BASE_COLOR}
              highlightColor={SKELETON_HIGHLIGHT_COLOR}
            />
          ) : (
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
                  {expThroughCurrLevel || 0} / {levelDifference}
                </div>
                <div className='title'>Experience</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    username: state.auth?.userAccountData?.username,
    exp: state?.character?.exp,
    coins: state?.character?.coins,
  }
}

export default connect(mapStateToProps)(Character)
