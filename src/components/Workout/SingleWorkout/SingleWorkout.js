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
import Skeleton from 'react-loading-skeleton'

const SKELETON_BASE_COLOR = '#546d80'
const SKELETON_HIGHLIGHT_COLOR = '#548ca8'

const SingleWorkoutExercise = ({ exercise, workoutData, loading }) => {
  if (loading) {
    return (
      <div className='single-workout-exercise-loading'>
        <Skeleton
          baseColor={SKELETON_BASE_COLOR}
          highlightColor={SKELETON_HIGHLIGHT_COLOR}
          height='50px'
          width='50px'
        />
        <Skeleton
          baseColor={SKELETON_BASE_COLOR}
          highlightColor={SKELETON_HIGHLIGHT_COLOR}
          height='14px'
        />
        <Skeleton
          baseColor={SKELETON_BASE_COLOR}
          highlightColor={SKELETON_HIGHLIGHT_COLOR}
          height='14px'
        />
      </div>
    )
  }

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

const SingleWorkout = ({ workout, workoutData, startWorkout, loading }) => {
  const estTime = !loading && msToTime(estimateTime(workout))

  return (
    <div className='single-workout'>
      <div className='title-container'>
        <div className='title'>
          {loading ? (
            <Skeleton
              className='workout-title-skeleton'
              baseColor={SKELETON_BASE_COLOR}
              highlightColor={SKELETON_HIGHLIGHT_COLOR}
              width='22ch'
            />
          ) : (
            `${workout.name || 'Unnamed Workout'}`
          )}
        </div>
        <div className='est-time'>
          {loading ? (
            <Skeleton
              className='workout-est-time-skeleton'
              baseColor={SKELETON_BASE_COLOR}
              highlightColor={SKELETON_HIGHLIGHT_COLOR}
              width='10ch'
            />
          ) : (
            `Time: ≈${estTime}`
          )}
        </div>
      </div>
      <div className='exercises-container'>
        {loading ? (
          <>
            <SingleWorkoutExercise loading={loading} />
            <SingleWorkoutExercise loading={loading} />
            <SingleWorkoutExercise loading={loading} />
          </>
        ) : (
          workout.path.map((ex, idx) => {
            return (
              <SingleWorkoutExercise
                key={idx}
                exercise={ex}
                workoutData={workoutData}
              />
            )
          })
        )}
      </div>
      {loading ? (
        <Skeleton
          className='start-button-loading'
          baseColor={SKELETON_BASE_COLOR}
          highlightColor={SKELETON_HIGHLIGHT_COLOR}
          width='13ch'
        />
      ) : (
        <button className='start-button' onClick={() => startWorkout(workout)}>
          Start Workout
        </button>
      )}
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
