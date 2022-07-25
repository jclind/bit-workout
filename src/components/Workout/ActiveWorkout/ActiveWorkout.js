import React, { useState } from 'react'
import { AiFillInfoCircle, AiOutlineClose } from 'react-icons/ai'
import { calculatePlates } from '../../../util/calculatePlates'

import { AiOutlineRight } from 'react-icons/ai'
import { connect } from 'react-redux'
import {
  completeSet,
  getSingleExercise,
  stopWorkout,
} from '../../../redux/actions/workout/workout'
import StraightSetExercise from './SetTypes/StraightSetExercise'
import DropSetExercise from './SetTypes/DropSetExercise'
import StopWorkoutModal from '../StopWorkoutModal/StopWorkoutModal'

const ActiveWorkout = ({
  getSingleExercise,
  currSetIdx,
  currExerciseIdx,
  currWorkout,
  completeSet,
  weights,
  stopWorkout,
  setIsWorkoutPathModalOpen,
}) => {
  const [isStopModalOpen, setIsStopModalOpen] = useState(false)

  const currActiveWorkoutExercise = currWorkout.path[currExerciseIdx]
  const exerciseType = currActiveWorkoutExercise.type

  const exerciseID = currActiveWorkoutExercise.exerciseID
  const currExercise = getSingleExercise(exerciseID)
  const exerciseName = currExercise.name

  // console.log(currExercise, currSet)

  const exerciseTypeOptions = type => {
    if (type === 'straight') {
      return (
        <StraightSetExercise
          currActiveWorkoutExercise={currActiveWorkoutExercise}
          currExercise={currExercise}
          weights={weights}
          currSetIdx={currSetIdx}
          completeSet={completeSet}
          setIsWorkoutPathModalOpen={setIsWorkoutPathModalOpen}
        />
      )
    } else if (type === 'drop') {
      return (
        <DropSetExercise
          currActiveWorkoutExercise={currActiveWorkoutExercise}
          currExercise={currExercise}
          currSetIdx={currSetIdx}
          setIsWorkoutPathModalOpen={setIsWorkoutPathModalOpen}
          completeSet={completeSet}
        />
      )
    }
  }

  return (
    <div className='active-workout'>
      <div className='exercise-title'>{exerciseName}</div>
      <div className='exercise-type'>({exerciseType} Sets)</div>
      {exerciseTypeOptions(exerciseType)}
      <button
        type='button'
        className='stop-workout-btn'
        aria-label='Stop Workout Button'
        onClick={() => setIsStopModalOpen(true)}
      >
        <AiOutlineClose className='icon' />
      </button>
      {isStopModalOpen ? (
        <StopWorkoutModal
          onClose={() => {
            setIsStopModalOpen(false)
          }}
          stopWorkout={stopWorkout}
        />
      ) : null}
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
    getSingleWorkout: exerciseID => dispatch(getSingleExercise(exerciseID)),
    completeSet: (currSetTotal, numReps, exerciseID, lastSetFailed) =>
      dispatch(completeSet(currSetTotal, numReps, exerciseID, lastSetFailed)),
    stopWorkout: (coins, exp) => dispatch(stopWorkout(coins, exp)),
    getSingleExercise: exerciseID => dispatch(getSingleExercise(exerciseID)),
  }
}

export default connect(mapStateTopProps, mapDispatchToProps)(ActiveWorkout)
