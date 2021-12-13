import React, { useState } from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'
import { calculatePlates } from '../../util/calculatePlates'
import PlatesModal from './PlatesModal'

const ActiveWorkout = ({
  currSet,
  currSetTotal,
  completeSet,
  currExercise,
  currRepsTotal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  console.log(currExercise)
  const { name, imageURL, exerciseWeight } = currExercise
  const weights = calculatePlates(45, 155)
  console.log(weights)
  return (
    <div className='active-workout'>
      <div className='current-workout-text'>Current Workout</div>
      <div className='exercise-title'>{name}</div>
      <div className='rep-set-text'>{`${currRepsTotal} Reps, Set ${currSet} of ${currSetTotal}`}</div>
      <div className='exercise-weight' onClick={() => setIsModalOpen(true)}>
        <span>{exerciseWeight} lbs</span> <AiFillInfoCircle className='icon' />
      </div>
      <img src={imageURL} alt={name} className='exercise-img' />
      <button className='submit-btn' onClick={completeSet}>
        Completed
      </button>

      {isModalOpen ? (
        <PlatesModal
          weights={weights}
          currExercise={currExercise}
          onClose={() => {
            setIsModalOpen(false)
          }}
        />
      ) : null}
    </div>
  )
}

export default ActiveWorkout
