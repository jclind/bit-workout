import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUserWorkouts } from '../../../redux/actions/workout/workout'

const UserWorkouts = ({ getUserWorkouts }) => {
  useEffect(() => {
    getUserWorkouts().then(res => {
      console.log(res)
    })
  }, [])

  return <div>UserWorkouts</div>
}

const mapDispatchToProps = dispatch => {
  return {
    getUserWorkouts: (query, order, limit) =>
      dispatch(getUserWorkouts(query, order, limit)),
  }
}

export default connect(null, mapDispatchToProps)(UserWorkouts)
