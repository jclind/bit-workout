import React from 'react'
import SingleWorkout from './SingleWorkout'
import { e1 } from '../../assets/data/e1'

const WorkoutSelection = ({ startWorkout }) => {
  return (
    <div>
      <SingleWorkout
        text={'Your Next Workout'}
        exercise={e1}
        startWorkout={startWorkout}
      />
    </div>
  )
}

export default WorkoutSelection
