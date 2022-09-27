import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { connect } from 'react-redux'
import {
  completeSet,
  getSingleExercise,
  stopWorkout,
  addWarmup,
} from '../../../redux/actions/workout/workout'
import StraightSetExercise from './SetTypes/StraightSetExercise'
import DropSetExercise from './SetTypes/DropSetExercise'
import StopWorkoutModal from '../StopWorkoutModal/StopWorkoutModal'
import TimedSetExercise from './SetTypes/TimedSetExercise'
import WarmupExercise from './SetTypes/WarmupExercise'

const ActiveWorkout = ({
  getSingleExercise,
  currSetIdx,
  currExerciseIdx,
  currWorkout,
  completeSet,
  stopWorkout,
  setIsWorkoutPathModalOpen,
  addWarmup,
  isWarmupRunning,
}) => {
  const [isStopModalOpen, setIsStopModalOpen] = useState(false)

  const currActiveWorkoutExercise = currWorkout.path[currExerciseIdx]
  const exerciseType = currActiveWorkoutExercise?.type

  const exerciseID = currActiveWorkoutExercise?.exerciseID
  const currExercise = getSingleExercise(exerciseID)
  const exerciseName = isWarmupRunning
    ? `${currExercise.name} Warmup`
    : currExercise.name

  const exerciseTypeOptions = type => {
    if (isWarmupRunning) {
      return (
        <WarmupExercise
          currExercise={currExercise}
          setIsWorkoutPathModalOpen={setIsWorkoutPathModalOpen}
        />
      )
    }
    if (type === 'straight') {
      return (
        <StraightSetExercise
          currActiveWorkoutExercise={currActiveWorkoutExercise}
          currExercise={currExercise}
          currSetIdx={currSetIdx}
          completeSet={completeSet}
          setIsWorkoutPathModalOpen={setIsWorkoutPathModalOpen}
          addWarmup={addWarmup}
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
          addWarmup={addWarmup}
        />
      )
    } else if (type === 'timed') {
      return (
        <TimedSetExercise
          currActiveWorkoutExercise={currActiveWorkoutExercise}
          currExercise={currExercise}
          currSetIdx={currSetIdx}
          setIsWorkoutPathModalOpen={setIsWorkoutPathModalOpen}
          completeSet={completeSet}
          addWarmup={addWarmup}
        />
      )
    }
  }

  return (
    <div className='active-workout'>
      <div
        className={`exercise-title${
          exerciseName.length >= 34
            ? ' xsm-text'
            : exerciseName.length >= 28
            ? ' sm-text'
            : ''
        }`}
      >
        {exerciseName}
      </div>
      {!isWarmupRunning && (
        <div className='exercise-type'>({exerciseType} Sets)</div>
      )}
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
    isWarmupRunning: runningWorkout.currWorkout.isWarmupRunning,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleWorkout: exerciseID => dispatch(getSingleExercise(exerciseID)),
    completeSet: (currSetTotal, numReps, exerciseID, weight, lastSetFailed) =>
      dispatch(
        completeSet(currSetTotal, numReps, exerciseID, weight, lastSetFailed)
      ),
    stopWorkout: (coins, exp) => dispatch(stopWorkout(coins, exp)),
    getSingleExercise: exerciseID => dispatch(getSingleExercise(exerciseID)),
    addWarmup: currWeight => dispatch(addWarmup(currWeight)),
  }
}

export default connect(mapStateTopProps, mapDispatchToProps)(ActiveWorkout)
