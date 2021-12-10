import React from 'react'
import TimerContainer from '../Timer/TimerContainer'

const ActiveWorkout = ({
  currSet,
  currSetTotal,
  completeSet,
  currExercise,
}) => {
  console.log(currExercise)
  const { name } = currExercise
  return (
    <div className='active-workout'>
      <div className='current-workout-text'>Current Workout</div>
      <div className='exercise-title'>{name}</div>
      {/* <div>{`Current Set ${currSet} / ${currSetTotal}`}</div>
      <button className='submit-btn' onClick={completeSet}>
        Complete Set
      </button> */}
    </div>
  )
}

export default ActiveWorkout
