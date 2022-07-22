import React, { useState } from 'react'
import { calculatePlates } from '../../../util/calculatePlates'
import {
  AiFillInfoCircle,
  AiOutlineRight,
  AiOutlineClose,
} from 'react-icons/ai'
import PlatesModal from '../PlatesModal/PlatesModal'
import ConfirmSetFailedModal from '../ConfirmSetFailedModal/ConfirmSetFailedModal'
import StopWorkoutModal from '../StopWorkoutModal/StopWorkoutModal'

const StraightSetExercise = ({
  currActiveWorkoutExercise,
  currExercise,
  weights,
  stopWorkout,
  currSetIdx,
  completeSet,
  setIsWorkoutPathModalOpen,
}) => {
  const [isPlatesModalOpen, setIsPlatesModalOpen] = useState(false)
  const [isSetFailedModalOpen, setIsSetFailedModalOpen] = useState(false)
  const [isStopModalOpen, setIsStopModalOpen] = useState(false)

  const sets = currActiveWorkoutExercise.sets

  const currSet = sets[currSetIdx - 1]
  const numSets = sets.length
  const numReps = currSet.reps

  const { name: exerciseName, imageURL, exerciseID } = currExercise

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
          onClick={() => setIsPlatesModalOpen(true)}
        >
          <span>{exerciseWeight} lbs</span>{' '}
          <AiFillInfoCircle className='icon' />
        </div>
        <div className='exercise-img-container'>
          <img src={imageURL} alt={exerciseName} className='exercise-img' />
        </div>
        <button
          className='view-workout-path'
          onClick={() => setIsWorkoutPathModalOpen(true)}
        >
          Workout Path <AiOutlineRight className='icon' />
        </button>
      </div>
      <div className='options'>
        <button
          className='submit-btn'
          onClick={() => completeSet(numSets, numReps, exerciseID)}
        >
          Completed
        </button>
        <button
          className='set-failed-btn'
          onClick={() => setIsSetFailedModalOpen(true)}
        >
          Failed
        </button>
      </div>
      <button
        type='button'
        className='stop-workout-btn'
        aria-label='Stop Workout Button'
        onClick={() => setIsStopModalOpen(true)}
      >
        <AiOutlineClose className='icon' />
      </button>

      {isSetFailedModalOpen ? (
        <ConfirmSetFailedModal
          onClose={() => {
            setIsSetFailedModalOpen(false)
          }}
          currWeight={exerciseWeight}
          weightExerciseId={exerciseID}
          numSets={numSets}
          numReps={numReps}
        />
      ) : null}
      {isPlatesModalOpen ? (
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
      ) : null}
    </>
  )
}

export default StraightSetExercise
