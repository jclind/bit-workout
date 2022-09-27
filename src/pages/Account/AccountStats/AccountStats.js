import React from 'react'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import { BsChevronRight } from 'react-icons/bs'
import { connect } from 'react-redux'
import './AccountStats.scss'
import FadeLoader from 'react-spinners/FadeLoader'
import { msToDayHour } from '../../../util/msToTime'

const StatItem = ({ title, value, link, icon }) => {
  return (
    <div className='stat-item'>
      <div className='content'>
        <div className='top'>{title}</div>
        {link && value ? <div className='bottom'>{value}</div> : null}
      </div>
      {link ? (
        <div className='icon-container'>
          <BsChevronRight className='icon' />
        </div>
      ) : value ? (
        <div className='right'>{value}</div>
      ) : null}
    </div>
  )
}

const AccountStats = ({ accountStats, loading, workoutsCompleted }) => {
  const { exerciseStats, totalStats } = accountStats ?? {}
  const {
    totalWeightLifted,
    totalReps,
    totalSets,
    totalWorkoutTime,
    totalCoins,
    totalExp,
  } = totalStats ?? {}

  const getExercisePR = exerciseID => {
    const exerciseData = exerciseStats.find(ex => ex.exerciseID === exerciseID)
    const pr1x1 = exerciseData?.pr1x1
    if (!pr1x1 || !pr1x1.weight) {
      return 'No Data'
    }
    return `${pr1x1.weight} lbs`
  }

  const squatPR = !loading && workoutsCompleted ? getExercisePR(0) : ''
  const benchPressPR = !loading && workoutsCompleted ? getExercisePR(3) : ''
  const deadliftPR = !loading && workoutsCompleted ? getExercisePR(1) : ''

  const totalWorkoutTimeFormatted = msToDayHour(totalWorkoutTime)

  return (
    <div className='account-stats-page page'>
      <div className='settings-title'>Statistics / Progress</div>
      <BackButton />
      {!workoutsCompleted ? (
        <div className='no-data-container'>
          <div className='title'>No Data</div>
          <p>Complete a workout to see progress.</p>
        </div>
      ) : loading ? (
        <div className='fade-loader-container'>
          <div className='spinner-container'>
            <FadeLoader
              color={'#548ca8'}
              className='spinner'
              height={8}
              width={3}
              radius={10}
              margin={-8}
            />
          </div>
          <div className='text'>loading...</div>
        </div>
      ) : (
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
            <StatItem title={'View All'} link />
          </section>
          <section>
            <StatItem
              title={'Coins Earned'}
              value={totalCoins.toLocaleString()}
            />
            <StatItem title={'Exp Earned'} value={totalExp.toLocaleString()} />
          </section>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  const loading = !state.auth.userAccountData.accountStats
  const exp = state.character.exp
  const workoutsCompleted = !loading && exp !== 0
  return {
    accountStats: state?.auth?.userAccountData?.accountStats,
    loading,
    workoutsCompleted,
  }
}

export default connect(mapStateToProps)(AccountStats)
