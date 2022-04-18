import React, { useState } from 'react'
import { AiFillInfoCircle } from 'react-icons/ai'
import { calculatePlates } from '../../../util/calculatePlates'
import PlatesModal from '../PlatesModal/PlatesModal'
import { useWorkout } from '../../../contexts/WorkoutContext'

const ActiveWorkout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { currExercise, completeSet, currSet } = useWorkout()

  const {
    name,
    imageURL,
    exerciseWeight,
    currWorkoutData: { sets: currSetTotal, reps: currRepsTotal },
  } = currExercise
  const weights = calculatePlates(45, exerciseWeight)

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
          onClose={() => {
            setIsModalOpen(false)
          }}
        />
      ) : null}
    </div>
  )
}

export default ActiveWorkout
