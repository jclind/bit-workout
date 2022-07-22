import React, { useState } from 'react'
import { AiFillInfoCircle, AiOutlineClose } from 'react-icons/ai'
import { calculatePlates } from '../../../util/calculatePlates'
import PlatesModal from '../PlatesModal/PlatesModal'
import ConfirmSetFailedModal from '../ConfirmSetFailedModal/ConfirmSetFailedModal'
import StopWorkoutModal from '../StopWorkoutModal/StopWorkoutModal'
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
  currIdx,
  currWorkout,
  completeSet,
  weights,
  stopWorkout,
  setIsWorkoutPathModalOpen,
}) => {
  const [isPlatesModalOpen, setIsPlatesModalOpen] = useState(false)
  const [isSetFailedModalOpen, setIsSetFailedModalOpen] = useState(false)
  const [isStopModalOpen, setIsStopModalOpen] = useState(false)

  console.log(currWorkout)

  const currExercise = currWorkout.path[currIdx]
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
        />
      )
    }
  }

  return (
    <div className='active-workout'>
      <div className='exercise-title'>{exerciseName}</div>
      <div className='exercise-type'>Exercise type: {exerciseType}</div>
      {exerciseTypeOptions(exerciseType)}

      {/* {isPlatesModalOpen ? (
        {isSetFailedModalOpen ? (
          <ConfirmSetFailedModal
            onClose={() => {
              setIsSetFailedModalOpen(false)
            }}
            currWeight={exerciseWeight}
            weightExerciseId={exerciseID}
            currSetTotal={currSetTotal}
            currRepTotal={currRepTotal}
            currWorkout={currWorkout}
            currIdx={currIdx}
          />
        ) : null}
        <PlatesModal
          weights={plateWeights}
          onClose={() => {
            setIsPlatesModalOpen(false)
          }}
          currExercise={currExercise}
          exerciseWeight={exerciseWeight}
        />
      ) : null}
      {isStopModalOpen ? (
        <StopWorkoutModal
          onClose={() => {
            setIsStopModalOpen(false)
          }}
          stopWorkout={stopWorkout}
        />
      ) : null} */}
    </div>
  )
}

const mapStateTopProps = state => {
  const runningWorkout = state.workout.workoutData.runningWorkout

  return {
    currSetIdx: runningWorkout.remainingWorkout.currSet,
    currIdx: runningWorkout.remainingWorkout.currIdx,
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
