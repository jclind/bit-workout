import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PastWorkoutsItem from '../../components/PastWorkoutsItem/PastWorkoutsItem'
import { queryPastWorkoutData } from '../../redux/actions/workout/workout'
import './PastWorkouts.scss'

const PastWorkouts = ({ queryPastWorkoutData }) => {
  const [pastWorkoutData, setPastWorkoutData] = useState(null)
  const [pageNum, setPageNum] = useState(0)

  useEffect(() => {
    const order = 'workoutStartTime'
    const limit = 8

    queryPastWorkoutData(order, limit, pageNum).then(res => {
      setPastWorkoutData(res)
    })
  }, [])

  return (
    <div className='past-workouts page'>
      {pastWorkoutData &&
        pastWorkoutData.map(workout => {
          const id = workout.id
          return <PastWorkoutsItem key={id} workout={workout} />
        })}
    </div>
  )
}

const mapPropsToDispatch = dispatch => {
  return {
    queryPastWorkoutData: (order, limit, pageNum) =>
      dispatch(queryPastWorkoutData(order, limit, pageNum)),
  }
}

export default connect(null, mapPropsToDispatch)(PastWorkouts)
