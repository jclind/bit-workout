import React from 'react'
import { connect } from 'react-redux'
import { getUserLikedWorkouts } from '../../../redux/actions/workout/workout'
import WorkoutsList from './WorkoutsList'

const LikedWorkouts = ({ getUserLikedWorkouts, appContainerRef }) => {
  return (
    <>
      <WorkoutsList
        getWorkouts={getUserLikedWorkouts}
        appContainerRef={appContainerRef}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getUserLikedWorkouts: (query, order, limit, latestDoc) =>
      dispatch(getUserLikedWorkouts(query, order, limit, latestDoc)),
  }
}

export default connect(null, mapDispatchToProps)(LikedWorkouts)
