import React, { useState } from 'react'
import { calculatePlates } from '../../../../util/calculatePlates'
import {
  AiFillInfoCircle,
  AiOutlineRight,
  AiOutlinePlusCircle,
} from 'react-icons/ai'
import PlatesModal from '../../PlatesModal/PlatesModal'
import ConfirmSetFailedModal from '../../ConfirmSetFailedModal/ConfirmSetFailedModal'

const StraightSetExercise = ({
  currActiveWorkoutExercise,
  currExercise,
  currSetIdx,
  completeSet,
  setIsWorkoutPathModalOpen,
  addWarmup,
}) => {
  const [isPlatesModalOpen, setIsPlatesModalOpen] = useState(false)
  const [isSetFailedModalOpen, setIsSetFailedModalOpen] = useState(false)

  const sets = currActiveWorkoutExercise.sets
  const currSet = sets[currSetIdx - 1]
  const numSets = sets.length
  const numReps = currSet.reps

  const exerciseIsWeighted = currExercise.weights

  const {
    name: exerciseName,
    imageURL,
    id: exerciseID,
    exerciseWeight,
  } = currExercise
  const plateWeights = calculatePlates(45, exerciseWeight)

  return (
    <>
      <div className='rep-set-text'>{`${numReps} Reps, Set ${currSetIdx} of ${numSets}`}</div>
      <button
        className='add-warmup'
        onClick={() => {
          addWarmup(exerciseWeight)
        }}
      >
        <AiOutlinePlusCircle className='icon' />
        Add Warmup Sets
      </button>
      <div className='workout-data'>
        <div
          className='exercise-weight'
          onClick={() => {
            if (exerciseIsWeighted) {
              setIsPlatesModalOpen(true)
            }
          }}
        >
          {exerciseIsWeighted ? (
            <>
              <span>{exerciseWeight} lbs</span>
              <AiFillInfoCircle className='icon' />
            </>
          ) : (
            'No Weights'
          )}
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
          onClick={() =>
            completeSet(numSets, numReps, exerciseID, exerciseWeight)
          }
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
          weightIsChangeable={true}
        />
      ) : null}
    </>
  )
}

export default StraightSetExercise
