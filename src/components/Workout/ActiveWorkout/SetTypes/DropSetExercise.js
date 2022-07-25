import React, { useState } from 'react'
import { calculatePlates } from '../../../../util/calculatePlates'
import { AiOutlineRight } from 'react-icons/ai'
import RepInputModal from '../RepInputModal/RepInputModal'

const DropSetExercise = ({
  currActiveWorkoutExercise,
  currExercise,
  currSetIdx,
  setIsWorkoutPathModalOpen,
  completeSet,
}) => {
  const [isRepInputModalOpen, setIsRepInputModalOpen] = useState(false)

  const sets = currActiveWorkoutExercise.sets
  const currSet = sets[currSetIdx - 1]
  const numSets = sets.length

  const {
    name: exerciseName,
    imageURL,
    exerciseID,
    exerciseWeight,
  } = currExercise
  const plateWeights = calculatePlates(45, exerciseWeight)

  return (
    <>
      <div className='rep-set-text'>{`Set ${currSetIdx} of ${numSets}, Reps to failure`}</div>
      <div className='workout-data'>
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
          onClick={() => setIsRepInputModalOpen(true)}
        >
          Completed
        </button>
      </div>
      {isRepInputModalOpen ? (
        <RepInputModal
          onClose={() => {
            setIsRepInputModalOpen(false)
          }}
          completeSet={completeSet}
          numSets={numSets}
          exerciseID={exerciseID}
        />
      ) : null}
    </>
  )
}

export default DropSetExercise
