import React from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'

const ActiveWorkout = ({
  currSet,
  currSetTotal,
  completeSet,
  currExercise,
  currRepsTotal,
}) => {
  console.log(currExercise)
  const { name, imageURL, exerciseWeight } = currExercise
  return (
    <div className='active-workout'>
      <div className='current-workout-text'>Current Workout</div>
      <div className='exercise-title'>{name}</div>
      <div className='rep-set-text'>{`${currRepsTotal} Reps, Set ${currSet} of ${currSetTotal}`}</div>
      <div className='exercise-weight'>
        <span>{exerciseWeight} lbs</span> <AiFillInfoCircle className='icon' />
      </div>
      <img src={imageURL} alt={name} className='exercise-img' />
      <button className='submit-btn' onClick={completeSet}>
        Completed
      </button>
    </div>
  )
}

export default ActiveWorkout
