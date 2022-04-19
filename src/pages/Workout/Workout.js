import React, { useEffect } from 'react'
import WorkoutSelection from '../../components/Workout/WorkoutSelection/WorkoutSelection'
import ActiveWorkoutContainer from '../../components/Workout/ActiveWorkout/ActiveWorkoutContainer'
import WorkoutComplete from '../../components/Workout/WorkoutComplete/WorkoutComplete'
import { connect } from 'react-redux'
import { fetchWorkoutData } from '../../redux/actions/workout/workout'

const Workout = ({ uid, fetchWorkoutData, isWorkoutFinished, workoutData }) => {
  useEffect(() => {
    if (uid) {
      console.log('HERE')
      fetchWorkoutData(uid)
    }
  }, [uid])

  const isWorkoutRunning = workoutData ? workoutData.isWorkoutRunning : null

  if (!workoutData) {
    return 'loading workout'
  }

  return (
    <>
      <div className='page'>
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
