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

  const getExercisePR = exerciseID => {
    const exerciseData = exerciseStats.find(ex => ex.exerciseID === exerciseID)
    const pr1x1 = exerciseData?.pr1x1
    if (!pr1x1 || !pr1x1.weight) {
      return 'No Data'
    }
    return `${pr1x1.weight} lbs`
  }

  const squatPR = getExercisePR(0)
  const benchPressPR = getExercisePR(3)
  const deadliftPR = getExercisePR(1)

  const totalWorkoutTimeFormatted = msToDayHour(totalWorkoutTime)

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
          <StatItem title={'Sets'} value={totalSets.toLocaleString()} link />
          <StatItem title={'Reps'} value={totalReps.toLocaleString()} link />
          <StatItem
            title={'Workout Time'}
            value={totalWorkoutTimeFormatted}
            link
          />
        </section>
        <section>
          <StatItem title={'Squat'} value={squatPR} link />
          <StatItem title={'Bench Press'} value={benchPressPR} link />
          <StatItem title={'DeadLift'} value={deadliftPR} link />
        </section>
        <section>
          <StatItem
            title={'Coins Earned'}
            value={totalCoins.toLocaleString()}
          />
          <StatItem title={'Exp Earned'} value={totalExp.toLocaleString()} />
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
