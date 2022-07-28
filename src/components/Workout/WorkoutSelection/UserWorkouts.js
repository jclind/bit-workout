import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserWorkouts } from '../../../redux/actions/workout/workout'
import SingleWorkout from '../SingleWorkout/SingleWorkout'

const UserWorkouts = ({ getUserWorkouts }) => {
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    getUserWorkouts().then(res => {
      setWorkouts(res)
    })
  }, [])

  return (
    <div className='user-workout workout-list'>
      {workouts.length > 0 &&
        workouts.map(workout => {
          return (
            <React.Fragment key={workout.id}>
              <SingleWorkout workout={workout} />
            </React.Fragment>
          )
        })}
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
