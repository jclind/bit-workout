import React, { useState } from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'
import { calculatePlates } from '../../../util/calculatePlates'
import PlatesModal from '../PlatesModal/PlatesModal'
import { connect } from 'react-redux'
import {
  completeSet,
  getSingleWorkout,
} from '../../../redux/actions/workout/workout'

const ActiveWorkout = ({
  uid,
  getSingleWorkout,
  currSet,
  currIdx,
  currWorkout,
  completeSet,
  weights,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currExerciseID = currWorkout.path[currIdx].exerciseID
  const currExercise = getSingleWorkout(currExerciseID)

  const {
    id,
    name,
    imageURL,
    currWorkoutData: { sets: currSetTotal, reps: currRepsTotal },
  } = currExercise

  const exerciseWeight = weights.find(w => w.exerciseID === id).weight

  const plateWeights = calculatePlates(45, exerciseWeight)
  return (
    <div className='active-workout'>
      <div className='current-workout-text'>Current Workout</div>
      <div className='exercise-title'>{name}</div>
      <div className='rep-set-text'>{`${currRepsTotal} Reps, Set ${currSet} of ${currSetTotal}`}</div>
      <div className='exercise-weight' onClick={() => setIsModalOpen(true)}>
        <span>{exerciseWeight} lbs</span> <AiFillInfoCircle className='icon' />
      </div>
      <img src={imageURL} alt={name} className='exercise-img' />
      <button
        className='submit-btn'
        onClick={() => completeSet(currSetTotal, uid)}
      >
        Completed
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
    </div>
  )
}

const mapStateTopProps = state => {
  const runningWorkout = state.workout.workoutData.runningWorkout

  return {
    uid: state.auth.userAuth ? state.auth.userAuth.uid : null,
    currSet: runningWorkout.remainingWorkout.currSet,
    currIdx: runningWorkout.remainingWorkout.currIdx,
    currWorkout: runningWorkout.currWorkout,
    weights: state.workout.workoutData.weights,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleWorkout: id => dispatch(getSingleWorkout(id)),
    completeSet: (currSetTotal, uid) =>
      dispatch(completeSet(currSetTotal, uid)),
  }
}

export default connect(mapStateTopProps, mapDispatchToProps)(ActiveWorkout)
