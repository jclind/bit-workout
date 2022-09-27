import React from 'react'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import { BsChevronRight } from 'react-icons/bs'
import { connect } from 'react-redux'
import './AccountStats.scss'
import { formatTimeToObject } from '../../../util/formatTime'
import { msToDayHour } from '../../../util/msToTime'

const StatItem = ({ title, value, link, icon }) => {
  return (
    <div className='stat-item'>
      <div className='content'>
        <div className='top'>{title}</div>
        {link && <div className='bottom'>{value}</div>}
      </div>
      {link ? (
        <div className='icon-container'>
          <BsChevronRight className='icon' />
        </div>
      ) : (
        <div className='right'>{value}</div>
      )}
    </div>
  )
}

const AccountStats = ({ accountStats }) => {
  const { exerciseStats, totalStats } = accountStats
  const {
    totalWeightLifted,
    totalReps,
    totalSets,
    totalWorkoutTime,
    totalCoins,
    totalExp,
  } = totalStats

  const totalWorkoutTimeFormatted = msToDayHour(104520000)

  return (
    <div className='account-stats-page page'>
      <div className='settings-title'>Statistics / Progress</div>
      <BackButton />

      <div className='stats-container'>
        <section>
          <StatItem
            title={'Volume'}
            value={`${totalWeightLifted.toLocaleString()} lbs`}
            link
          />
          {/* <StatItem title={'Big Three Max'} weight='45' /> */}
          <StatItem title={'Sets'} value={totalSets} link />
          <StatItem title={'Reps'} value={totalReps} link />
          <StatItem title={'Time'} value={totalWorkoutTimeFormatted} link />
        </section>
        <section>
          <StatItem title={'Squat'} value='155lb' link />
          <StatItem title={'Bench Press'} value='135lb' link />
        </section>
        <section>
          <StatItem title={'Coins Earned'} value='532' />
          <StatItem title={'Exp Earned'} value='230' />
        </section>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    accountStats: state?.auth?.userAccountData?.accountStats,
  }
}

export default connect(mapStateToProps)(AccountStats)
