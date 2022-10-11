import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import { BsChevronRight, BsDash } from 'react-icons/bs'
import { connect } from 'react-redux'
import './AccountStats.scss'
import { msToDayHour } from '../../../util/msToTime'
import PageLoading from '../../../components/PageLoading/PageLoading'
import { AiFillStar } from 'react-icons/ai'
import { getStats } from '../../../redux/actions/stats/stats'
import { useEffect } from 'react'

export const StatItem = ({
  title,
  subTitle,
  value,
  link,
  isPR,
  icon,
  isEditing,
  deleteItem,
}) => {
  const handleDelete = e => {
    e.stopPropagation()
    deleteItem()
  }

  const navigate = useNavigate()
  return (
    <div
      disabled={!link}
      onClick={() => {
        if (link) {
          navigate(link)
        }
      }}
      className='stat-item'
    >
      <div
        className={`dash-icon-container ${isEditing ? 'active' : ''}`}
        tabIndex='0'
        onClick={handleDelete}
      >
        <BsDash className='dash-icon' />
      </div>
      <div className={`content ${isEditing ? 'active-editing' : ''}`}>
        <div className='top'>
          <div className='title'>{title}</div>
          <div className='sub-title'>{subTitle}</div>
          {isPR ? <AiFillStar className='pr-icon' /> : null}
        </div>
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

const AccountStats = ({
  loading,
  isData,
  totalUserStats,
  exerciseStats,
  getStats,
}) => {
  useEffect(() => {
    if (!totalUserStats) {
      getStats()
    }
  }, [])
  const {
    totalWeightLifted,
    totalReps,
    totalSets,
    totalWorkoutTime,
    totalCoins,
    totalExp,
  } = totalUserStats ?? {}

  const getExercisePR = exerciseID => {
    const exerciseData = exerciseStats.find(ex => ex.exerciseID === exerciseID)
    const pr1x1 = exerciseData?.pr1x1
    if (!pr1x1 || !pr1x1.weight) {
      return 'No Data'
    }
    return `${pr1x1.weight} lbs`
  }

  const squatPR = !loading && isData ? getExercisePR(0) : ''
  const benchPressPR = !loading && isData ? getExercisePR(3) : ''
  const deadliftPR = !loading && isData ? getExercisePR(1) : ''

  const totalWorkoutTimeFormatted = msToDayHour(totalWorkoutTime)

  return (
    <div className='account-stats-page page'>
      <div className='settings-title'>Statistics / Progress</div>
      <BackButton />
      {loading ? (
        <PageLoading />
      ) : !isData ? (
        <div className='no-data-container'>
          <div className='title'>No Data</div>
          <p>Complete a workout to see progress.</p>
        </div>
      ) : (
        <div className='stats-container'>
          <section>
            <StatItem
              title={'Volume'}
              value={`${totalWeightLifted.toLocaleString()} lbs`}
            />
            <StatItem title={'Sets'} value={totalSets.toLocaleString()} />
            <StatItem title={'Reps'} value={totalReps.toLocaleString()} />
            <StatItem
              title={'Workout Time'}
              value={totalWorkoutTimeFormatted}
            />
          </section>
          <section>
            <StatItem title={'Squat'} value={squatPR} />
            <StatItem title={'Bench Press'} value={benchPressPR} />
            <StatItem title={'DeadLift'} value={deadliftPR} />
            <StatItem title={'View All'} link='exercises' />
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
  const status = state.stats.status
  const loading = status === 'loading' || status === 'unloaded'
  const isData = status !== 'no_data'
  return {
    loading,
    isData,
    totalUserStats: state.stats.totalUserStats,
    exerciseStats: state.stats.exerciseStats,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getStats: () => dispatch(getStats()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountStats)
