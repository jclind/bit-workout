import React, { useState, useEffect } from 'react'
import SingleWorkout from '../SingleWorkout/SingleWorkout'
import { AiOutlineSearch, AiOutlinePlusCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './WorkoutSelection.scss'
import { getWorkouts } from '../../../redux/actions/workout/workout'

const WorkoutSelection = ({ getWorkouts }) => {
  const [workoutSearchVal, setWorkoutSearchVal] = useState('')

  const [workouts, setWorkouts] = useState(null)

  useEffect(() => {
    getWorkouts('').then(res => {
      setWorkouts(res)
    })
  }, [])

  return (
    <div className='workout-selection'>
      <div className='settings-title'>Workout Selection</div>

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
      {workouts &&
        workouts.slice(0, 8).map(workout => {
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
      <Link to='/create-workout' className='create-workout-link'>
        <button>
          <AiOutlinePlusCircle className='icon' />
          Create workout
        </button>
      </Link>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getWorkouts: (queryString, order, limit) =>
      dispatch(getWorkouts(queryString, order, limit)),
  }
}

export default connect(null, mapDispatchToProps)(WorkoutSelection)
