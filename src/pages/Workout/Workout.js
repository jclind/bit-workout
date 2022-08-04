import React, { useEffect } from 'react'
import WorkoutSelection from '../../components/Workout/WorkoutSelection/WorkoutSelection'
import ActiveWorkoutContainer from '../../components/Workout/ActiveWorkout/ActiveWorkoutContainer'
import WorkoutComplete from '../../components/Workout/WorkoutComplete/WorkoutComplete'
import { connect } from 'react-redux'
import { fetchWorkoutData } from '../../redux/actions/workout/workout'
import FadeLoader from 'react-spinners/FadeLoader'
import './Workout.scss'

const Workout = ({ uid, fetchWorkoutData, isWorkoutFinished, workoutData }) => {
  useEffect(() => {
    if (uid) {
      fetchWorkoutData(uid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  const isWorkoutRunning = workoutData ? workoutData.isWorkoutRunning : null

  if (!workoutData) {
    return (
      <div className='workout-loading'>
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
    )
  }

  return (
    <>
      <div className='workout-page page'>
        {isWorkoutFinished ? (
          <WorkoutComplete />
        ) : isWorkoutRunning ? (
          <>
            <ActiveWorkoutContainer />
          </>
        ) : (
          <WorkoutSelection />
        )}
      </div>
    </>
  )
}
const mapStateToProps = state => {
  return {
    uid: state.auth.userAuth ? state.auth.userAuth.uid : null,
    workoutData: state.workout.workoutData,
    isWorkoutFinished: state.workout.isWorkoutFinished,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchWorkoutData: uid => dispatch(fetchWorkoutData(uid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workout)
