import React, { useState } from 'react'
import SingleWorkout from '../SingleWorkout/SingleWorkout'
import { AiOutlineSearch } from 'react-icons/ai'
import { workouts } from '../../../assets/data/workouts'
import './WorkoutSelection.scss'

const WorkoutSelection = () => {
  const [workoutSearchVal, setWorkoutSearchVal] = useState('')
  return (
    <div className='workout-selection'>
      <div className='search-workouts-container'>
        <AiOutlineSearch className='icon' />
        <input
          type='text'
          className='search-workouts'
          placeholder='Search Workouts'
          value={workoutSearchVal}
          onChange={e => setWorkoutSearchVal(e.target.value)}
        />
      </div>
      {workouts.slice(0, 8).map(workout => {
        if (
          workoutSearchVal &&
          !workout.name.toLowerCase().includes(workoutSearchVal.toLowerCase())
        ) {
          return null
        }
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
