import React from 'react'
import { connect } from 'react-redux'
import { getTrendingWorkouts } from '../../../redux/actions/workout/workout'
import WorkoutsList from './WorkoutsList'

const TrendingWorkouts = ({ getTrendingWorkouts, appContainerRef }) => {
  return (
    <>
      <WorkoutsList
        getWorkouts={getTrendingWorkouts}
        appContainerRef={appContainerRef}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getTrendingWorkouts: (query, order, limit, latestDoc) =>
      dispatch(getTrendingWorkouts(query, order, limit, latestDoc)),
  }
}

export default connect(null, mapDispatchToProps)(TrendingWorkouts)
