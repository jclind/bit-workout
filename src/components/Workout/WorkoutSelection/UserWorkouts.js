import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserWorkouts } from '../../../redux/actions/workout/workout'
import SingleWorkout from '../SingleWorkout/SingleWorkout'
import { AiOutlinePlusCircle } from 'react-icons/ai'

const UserWorkouts = ({ getUserWorkouts }) => {
  const [workouts, setWorkouts] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUserWorkouts().then(res => {
      setWorkouts([])
      setLoading(false)
    })
  }, [])

  return (
    <div className='user-workout workout-list'>
      {workouts.length <= 0 && !loading ? (
        <div className='no-data'>
          <h3>No Workouts</h3>
          <p>
            You haven't created any workouts yet. Go ahead and create your first
            personalized workout:
          </p>
          <Link to='/create-workout' className='create-first-workout'>
            <button>
              <AiOutlinePlusCircle className='icon' />
              Create Workout
            </button>
          </Link>
        </div>
      ) : loading ? (
        <>
          <SingleWorkout loading={true} />
          <SingleWorkout loading={true} />
          <SingleWorkout loading={true} />
        </>
      ) : (
        workouts.map(workout => {
          return (
            <React.Fragment key={workout.id}>
              <SingleWorkout workout={workout} />
            </React.Fragment>
          )
        })
      )}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getUserWorkouts: (query, order, limit) =>
      dispatch(getUserWorkouts(query, order, limit)),
  }
}

export default connect(null, mapDispatchToProps)(UserWorkouts)
