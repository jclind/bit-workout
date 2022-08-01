import React from 'react'
import { connect } from 'react-redux'
import { getUserWorkouts } from '../../../redux/actions/workout/workout'
import WorkoutsList from './WorkoutsList'

const UserWorkouts = ({ getUserWorkouts, appContainerRef }) => {
  return (
    <>
      <WorkoutsList
        getWorkouts={getUserWorkouts}
        appContainerRef={appContainerRef}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getUserWorkouts: (query, order, limit, latestDoc) =>
      dispatch(getUserWorkouts(query, order, limit, latestDoc)),
  }
}

export default connect(null, mapDispatchToProps)(UserWorkouts)
