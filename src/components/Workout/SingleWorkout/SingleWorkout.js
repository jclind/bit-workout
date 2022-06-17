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

const SingleWorkoutExercise = (exercise, idx, workoutData) => {
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
    <div key={idx}>
      <img src={image} alt={name} className='exercise-img' />
      <div className='exercise-title'>{name}</div>
      <div className='exercise-weight'>{currWeight}lbs.</div>
    </div>
  )
}

const SingleWorkout = ({ exercise, workoutData, startWorkout }) => {
  const estTime = msToTime(estimateTime(exercise))

  return (
    <div className='single-workout'>
      <div className='title-container'>
        <div className='title'>{exercise.name}</div>
        <div className='est-time'>Time: ≈{estTime}</div>
      </div>
      <div className='exercises-container'>
        {exercise.path.map((exercise, idx) => {
          return (
            <SingleWorkoutExercise
              exercise={exercise}
              idx={idx}
              workoutData={workoutData}
            />
          )
        })}
      </div>
      <button className='start-button' onClick={() => startWorkout(exercise)}>
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
