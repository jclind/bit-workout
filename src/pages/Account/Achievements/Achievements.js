import React from 'react'
import { connect } from 'react-redux'
import { achievements } from '../../../assets/data/achievementData'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import './Achievements.scss'

const SingleAchievement = ({ totalUserStats, data }) => {
  const goalAmount = data.amount
  const currValue = totalUserStats?.[data.property] ?? 0

  const isCompleted = currValue >= goalAmount

  return (
    <div className={`single-achievement${isCompleted ? ' completed' : ''}`}>
      <img src={data.src} alt='' />
      <div className='data'>
        <div className='title'>{data.name}</div>
        <div className='description'>{data.description}</div>
        {!isCompleted ? (
          <div className='num-completed'>
            {currValue} of {goalAmount}
          </div>
        ) : isCompleted && data.showTotal ? (
          <div className='num-completed'>
            {currValue} {data.showTotalText}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

const Achievements = ({ totalUserStats }) => {
  return (
    <div className='achievements-page page'>
      <div className='settings-title'>Achievements</div>
      <BackButton />
      <div className='achievements-container'>
        {achievements.map(group => {
          return (
            <div className='achievement-type' key={group.id}>
              <div className='title'>{group.type}</div>
              <div className='achievements-list'>
                {group.list.map(data => {
                  return (
                    <SingleAchievement
                      totalUserStats={totalUserStats}
                      data={data}
                      key={data.id}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    totalUserStats: state?.stats?.totalUserStats ?? null,
  }
}

export default connect(mapStateToProps)(Achievements)
