import React, { useState } from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'
import { calculatePlates } from '../../../util/calculatePlates'
import PlatesModal from '../PlatesModal/PlatesModal'
import ConfirmSetFailedModal from '../ConfirmSetFailedModal/ConfirmSetFailedModal'
import { connect } from 'react-redux'
import {
  completeSet,
  getSingleWorkout,
} from '../../../redux/actions/workout/workout'

const ActiveWorkout = ({
  getSingleWorkout,
  currSet,
  currIdx,
  currWorkout,
  completeSet,
  weights,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSetFailedModalOpen, setIsSetFailedModalOpen] = useState(false)

  const currExerciseID = currWorkout.path[currIdx].exerciseID
  const currExercise = getSingleWorkout(currExerciseID)

  const {
    id: exerciseID,
    name,
    imageURL,
    currWorkoutData: { sets: currSetTotal, reps: currRepTotal },
  } = currExercise

  const exerciseWeightData = weights.find(w => w.exerciseID === exerciseID)
  let exerciseWeight
  if (!exerciseWeightData) {
    exerciseWeight = 45
  } else {
    exerciseWeight = exerciseWeightData.weight
  }

  console.log(weights)

  const plateWeights = calculatePlates(45, exerciseWeight)
  return (
    <div className='active-workout'>
      <div className='current-workout-text'>Current Workout</div>
      <div className='exercise-title'>{name}</div>
      <div className='rep-set-text'>{`${currRepTotal} Reps, Set ${currSet} of ${currSetTotal}`}</div>
      <div className='exercise-weight' onClick={() => setIsModalOpen(true)}>
        <span>{exerciseWeight} lbs</span> <AiFillInfoCircle className='icon' />
      </div>
      <div className='exercise-img-container'>
        <img src={imageURL} alt={name} className='exercise-img' />
      </div>
      <button
        className='submit-btn'
        onClick={() => completeSet(currSetTotal, currRepTotal, exerciseID)}
      >
        Completed
      </button>
      <button
        className='set-failed-btn'
        onClick={() => setIsSetFailedModalOpen(true)}
      >
        Failed
      </button>

      {isModalOpen ? (
        <PlatesModal
          weights={plateWeights}
          onClose={() => {
            setIsModalOpen(false)
          }}
          currExercise={currExercise}
          exerciseWeight={exerciseWeight}
        />
      ) : null}
      {isSetFailedModalOpen ? (
        <ConfirmSetFailedModal
          onClose={() => {
            setIsSetFailedModalOpen(false)
          }}
          currWeight={exerciseWeight}
          weightExerciseId={exerciseID}
          currSetTotal={currSetTotal}
          currRepTotal={currRepTotal}
        />
      ) : null}
    </div>
  )
}

const mapStateTopProps = state => {
  const runningWorkout = state.workout.workoutData.runningWorkout

  return {
    currSet: runningWorkout.remainingWorkout.currSet,
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
  }
}

export default connect(mapStateTopProps, mapDispatchToProps)(ActiveWorkout)
