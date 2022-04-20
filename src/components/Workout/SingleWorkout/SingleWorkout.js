import React from 'react'
import './SingleWorkout.scss'
import { exerciseList } from '../../../assets/data/exerciseList'
import { estimateTime } from '../../../util/estimateTime'
import { msToTime } from '../../../util/msToTime'
import { connect } from 'react-redux'
import {
  getSingleWorkout,
  startWorkout,
} from '../../../redux/actions/workout/workout'

const SingleWorkout = ({ text, exercise, workoutData, uid, startWorkout }) => {
  const estTime = msToTime(estimateTime(exercise))

  return (
    <div className='single-workout'>
      <div className='title-container'>
        <div className='title'>{text}</div>
        <div className='est-time'>Time: ≈{estTime}</div>
      </div>
      <div className='exercises-container'>
        {exercise.path.map((e, idx) => {
          const currExercise = exerciseList.find(obj => obj.id === e.exerciseID)
          const exID = currExercise.id
          const currWeight = workoutData.weights.find(
            ex => ex.exerciseID === exID
          ).weight
          const image = currExercise.imageURL
          const name = currExercise.name

          return (
            <div key={idx}>
              <img src={image} alt={name} className='exercise-img' />
              <div className='exercise-title'>{name}</div>
              <div className='exercise-weight'>{currWeight}lbs.</div>
            </div>
          )
        })}
      </div>
      <button
        className='start-button'
        onClick={() => startWorkout(exercise, uid)}
      >
        Start Workout
      </button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    workoutData: state.workout.workoutData,
    uid: state.auth.userAuth ? state.auth.userAuth.uid : null,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleWorkout: id => dispatch(getSingleWorkout(id)),
    startWorkout: (exercise, uid) => dispatch(startWorkout(exercise, uid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleWorkout)
