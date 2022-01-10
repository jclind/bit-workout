import React from 'react'
import SingleWorkout from './SingleWorkout'
import { e1 } from '../../assets/data/e1'
const WorkoutSelection = () => {
    return (
        <div>
            <SingleWorkout text={'Your Next Workout'} exercise={e1} />
        </div>
    )
}

export default WorkoutSelection
