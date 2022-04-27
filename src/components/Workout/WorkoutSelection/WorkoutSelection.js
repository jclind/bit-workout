import React from 'react'
import SingleWorkout from '../SingleWorkout/SingleWorkout'
import { workouts } from '../../../assets/data/workouts'
const WorkoutSelection = () => {
  return (
    <div>
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
