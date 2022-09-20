import React, { useState } from 'react'
import { connect } from 'react-redux'
import { calculatePlates } from '../../../../util/calculatePlates'
import { AiOutlineRight, AiFillInfoCircle } from 'react-icons/ai'
import PlatesModal from '../../PlatesModal/PlatesModal'
import {
  completeWarmupSet,
  endWarmup,
} from '../../../../redux/actions/workout/workout'

const WarmupExercise = ({
  currWarmupSetIdx,
  warmupPath,
  currExercise,
  endWarmup,
  completeWarmupSet,
}) => {
  const [isPlatesModalOpen, setIsPlatesModalOpen] = useState(false)

  const currWarmupSet = warmupPath[currWarmupSetIdx]
  const numSets = warmupPath.length
  const numReps = currWarmupSet?.reps
  const warmupWeight = currWarmupSet.weight

  const { name: exerciseName, imageURL } = currExercise
  const plateWeights = calculatePlates(45, warmupWeight)
  return (
    <>
      <div className='rep-set-text'>{`${numReps} Reps, Set ${
        currWarmupSetIdx + 1
      } of ${numSets}`}</div>
      <div className='workout-data'>
        <div
          className='exercise-weight'
          onClick={() => {
            setIsPlatesModalOpen(true)
          }}
        >
          <>
            <span>{warmupWeight} lbs</span>
            <AiFillInfoCircle className='icon' />
          </>
        </div>
        <div className='exercise-img-container'>
          <img src={imageURL} alt={exerciseName} className='exercise-img' />
        </div>
        <button
          className='view-workout-path'
          // onClick={() => setIsWorkoutPathModalOpen(true)}
        >
          Workout Path <AiOutlineRight className='icon' />
        </button>
      </div>
      <div className='options'>
        <button className='submit-btn' onClick={completeWarmupSet}>
          Completed
        </button>
        <button className='set-failed-btn' onClick={endWarmup}>
          End Warmup
        </button>
      </div>

      {isPlatesModalOpen ? (
        <PlatesModal
          weights={plateWeights}
          onClose={() => {
            setIsPlatesModalOpen(false)
          }}
          currExercise={currExercise}
          exerciseWeight={warmupWeight}
          weightIsChangeable={false}
        />
      ) : null}
    </>
  )
}

const mapStateToProps = state => {
  const runningWorkout = state.workout.workoutData.runningWorkout
  const remainingWorkout = runningWorkout.remainingWorkout
  const currIdx = remainingWorkout.currIdx
  console.log(runningWorkout, remainingWorkout, currIdx)
  return {
    currWarmupSetIdx: remainingWorkout.currWarmupSetIdx,

    warmupPath: runningWorkout.currWorkout.path[currIdx].warmupPath,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    completeWarmupSet: () => dispatch(completeWarmupSet()),
    endWarmup: () => dispatch(endWarmup()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WarmupExercise)
