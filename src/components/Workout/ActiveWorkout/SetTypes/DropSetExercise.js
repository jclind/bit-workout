import React, { useState } from 'react'
import { calculatePlates } from '../../../../util/calculatePlates'
import { AiOutlineRight, AiFillInfoCircle } from 'react-icons/ai'
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
  const currSetWeight = currSet.weight

  const { name: exerciseName, imageURL, exerciseID } = currExercise

  const plateWeights = calculatePlates(45, currSetWeight)

  console.log(currActiveWorkoutExercise)

  return (
    <>
      <div className='rep-set-text'>{`Set ${currSetIdx} of ${numSets}, Reps to failure`}</div>
      <div className='workout-data'>
        <div
          className='exercise-weight'
          // onClick={() => setIsPlatesModalOpen(true)}
        >
          <span>{currSetWeight} lbs</span>
          {/* <AiFillInfoCircle className='icon' /> */}
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
          weight={currSetWeight}
        />
      ) : null}
    </>
  )
}

export default DropSetExercise
