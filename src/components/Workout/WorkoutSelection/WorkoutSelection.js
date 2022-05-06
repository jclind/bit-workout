import React from 'react'
import SingleWorkout from '../SingleWorkout/SingleWorkout'
import { workouts } from '../../../assets/data/workouts'
import './WorkoutSelection.scss'

const WorkoutSelection = () => {
  return (
    <div className='workout-selection'>
      {workouts.map(workout => {
        return (
          <React.Fragment key={workout.id}>
            <SingleWorkout exercise={workout} />
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default WorkoutSelection
