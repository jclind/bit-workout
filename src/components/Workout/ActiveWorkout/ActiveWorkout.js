import React, { useState } from 'react'
import { AiFillInfoCircle, AiOutlineClose } from 'react-icons/ai'
import { calculatePlates } from '../../../util/calculatePlates'

import { AiOutlineRight } from 'react-icons/ai'
import { connect } from 'react-redux'
import {
  completeSet,
  getSingleWorkout,
  stopWorkout,
} from '../../../redux/actions/workout/workout'
import StraightSetExercise from './StraightSetExercise'

const ActiveWorkout = ({
  getSingleWorkout,
  currSetIdx,
  currExerciseIdx,
  currWorkout,
  completeSet,
  weights,
  stopWorkout,
  setIsWorkoutPathModalOpen,
}) => {
  console.log(currWorkout)

  const currExercise = currWorkout.path[currExerciseIdx]
  const exerciseType = currExercise.type

  const exerciseName = currExercise.exercise.name

  // console.log(currExercise, currSet)

  const exerciseTypeOptions = type => {
    if (type === 'straight') {
      return (
        <StraightSetExercise
          currExercise={currExercise}
          weights={weights}
          currSetIdx={currSetIdx}
          completeSet={completeSet}
          stopWorkout={stopWorkout}
          setIsWorkoutPathModalOpen={setIsWorkoutPathModalOpen}
        />
      )
    }
  }

  return (
    <div className='active-workout'>
      <div className='exercise-title'>{exerciseName}</div>
      <div className='exercise-type'>Exercise type: {exerciseType}</div>
      {exerciseTypeOptions(exerciseType)}
    </div>
  )
}

const mapStateTopProps = state => {
  const runningWorkout = state.workout.workoutData.runningWorkout

  return {
    currSetIdx: runningWorkout.remainingWorkout.currSet,
    currExerciseIdx: runningWorkout.remainingWorkout.currIdx,
    currWorkout: runningWorkout.currWorkout,
    weights: state.workout.workoutData.weights,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleWorkout: id => dispatch(getSingleWorkout(id)),
    completeSet: (currSetTotal, numReps, exerciseID, lastSetFailed) =>
      dispatch(completeSet(currSetTotal, numReps, exerciseID, lastSetFailed)),
    stopWorkout: (coins, exp) => dispatch(stopWorkout(coins, exp)),
  }
}

export default connect(mapStateTopProps, mapDispatchToProps)(ActiveWorkout)
