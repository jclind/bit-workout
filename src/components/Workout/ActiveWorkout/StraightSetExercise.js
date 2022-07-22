import React from 'react'
import { calculatePlates } from '../../../util/calculatePlates'
import {
  AiFillInfoCircle,
  AiOutlineRight,
  AiOutlineClose,
} from 'react-icons/ai'

const StraightSetExercise = ({ currExercise, weights, currSetIdx }) => {
  const currSet = currExercise.sets[currSetIdx - 1]

  const numSets = currExercise.sets.length
  const numReps = currSet.reps

  const { name: exerciseName, imageURL } = currExercise.exercise

  const exerciseID = currExercise.exercise.id

  const exerciseWeightData = weights.find(w => w.exerciseID === exerciseID)
  let exerciseWeight
  if (!exerciseWeightData) {
    exerciseWeight = 45
  } else {
    exerciseWeight = exerciseWeightData.weight
  }

  const plateWeights = calculatePlates(45, exerciseWeight)
  return (
    <>
      <div className='rep-set-text'>{`${numReps} Reps, Set ${currSetIdx} of ${numSets}`}</div>
      <div className='workout-data'>
        <div
          className='exercise-weight'
          // onClick={() => setIsPlatesModalOpen(true)}
        >
          <span>{exerciseWeight} lbs</span>{' '}
          <AiFillInfoCircle className='icon' />
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
        <button
          className='submit-btn'
          // onClick={() => completeSet(currSetTotal, currRepTotal, exerciseID)}
        >
          Completed
        </button>
        <button
          className='set-failed-btn'
          // onClick={() => setIsSetFailedModalOpen(true)}
        >
          Failed
        </button>
      </div>

      <button
        type='button'
        className='stop-workout-btn'
        aria-label='Stop Workout Button'
        // onClick={() => setIsStopModalOpen(true)}
      >
        <AiOutlineClose className='icon' />
      </button>
    </>
  )
}

export default StraightSetExercise
