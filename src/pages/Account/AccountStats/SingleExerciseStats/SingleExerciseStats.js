import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import PageLoading from '../../../../components/PageLoading/PageLoading'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import { getSingleExercise } from '../../../../redux/actions/workout/workout'
import { msToDayHour } from '../../../../util/msToTime'
import { StatItem } from '../AccountStats'
import './SingleExerciseStats.scss'

const SingleExerciseStats = ({ exerciseStats, loading, getSingleExercise }) => {
  const params = useParams()
  const exerciseID = params.exerciseID

  const singleExerciseStats = exerciseStats.find(ex => {
    return ex.exerciseID.toString() === exerciseID
  })
  const isData = !loading && !!singleExerciseStats

  const singleExerciseData = isData
    ? {
        ...getSingleExercise(exerciseID),
        ...singleExerciseStats,
      }
    : {}

  const {
    name,
    pr1x1,
    pr1x5,
    totalExerciseWeightLifted,
    totalSets,
    totalReps,
    totalTime,
    totalCoins,
    totalExp,
  } = singleExerciseData

  const formattedTotalTime = isData ? msToDayHour(totalTime) : null

  return (
    <div className='single-exercise-stats-page page'>
      <div className='settings-title'>{name} Stats</div>
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
          <div className='section-title'>Personal Bests</div>
          <section>
            <StatItem title='1x1' value={pr1x1?.weight + ' lbs' ?? 'No Data'} />
            <StatItem title='1x5' value={pr1x5?.weight + ' lbs' ?? 'No Data'} />
          </section>
          <div className='section-title'>Lifetime {name} Stats</div>
          <section>
            <StatItem
              title='Volume Lifted'
              value={`${totalExerciseWeightLifted.toLocaleString()} lbs`}
            />
            <StatItem
              title='Sets Completed'
              value={`${totalSets.toLocaleString()}`}
            />
            <StatItem
              title='Reps Completed'
              value={`${totalReps.toLocaleString()}`}
            />
            <StatItem title='Time' value={formattedTotalTime} />
          </section>
          <section>
            <StatItem title='Coins Earned' value={totalCoins} />
            <StatItem title='Experience Earned' value={totalExp} />
          </section>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const loading = !state.auth.userAccountData.accountStats

  return {
    exerciseStats: state?.auth?.userAccountData?.accountStats?.exerciseStats,
    loading,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleExercise: exerciseID => dispatch(getSingleExercise(exerciseID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleExerciseStats)
