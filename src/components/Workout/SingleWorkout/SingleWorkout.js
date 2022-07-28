import React from 'react'
import './SingleWorkout.scss'
import { exerciseList } from '../../../assets/data/exerciseList'
import { estimateTime } from '../../../util/estimateTime'
import { msToTime } from '../../../util/msToTime'
import { connect } from 'react-redux'
import {
  addNewExerciseWeight,
  startWorkout,
} from '../../../redux/actions/workout/workout'

const SingleWorkoutExercise = ({ exercise, workoutData }) => {
  const currExercise = exerciseList.find(obj => obj.id === exercise.exerciseID)
  const exerciseID = currExercise.id
  const currWeightData = workoutData.weights.find(
    ex => ex.exerciseID === exerciseID
  )

  let currWeight
  if (!currWeightData) {
    currWeight = 45
    addNewExerciseWeight(45, exerciseID)
  } else {
    currWeight = currWeightData.weight
  }
  const image = currExercise.imageURL
  const name = currExercise.name

  return (
    <div>
      <img src={image} alt={name} className='exercise-img' />
      <div className='exercise-title'>{name}</div>
      <div className='exercise-weight'>{currWeight}lbs.</div>
    </div>
  )
}

const SingleWorkout = ({ workout, workoutData, startWorkout }) => {
  console.log(workout)
  const estTime = msToTime(estimateTime(workout))

  return (
    <div className='single-workout'>
      <div className='title-container'>
        <div className='title'>{workout.name}</div>
        <div className='est-time'>Time: ≈{estTime}</div>
      </div>
      <div className='exercises-container'>
        {workout.path.map((ex, idx) => {
          return (
            <SingleWorkoutExercise
              key={idx}
              exercise={ex}
              workoutData={workoutData}
            />
          )
        })}
      </div>
      <button className='start-button' onClick={() => startWorkout(workout)}>
        Start Workout
      </button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    workoutData: state.workout.workoutData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    startWorkout: exercise => dispatch(startWorkout(exercise)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleWorkout)
