import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { queryPastWorkoutData } from '../../redux/actions/workout/workout'

import PastWorkoutsLink from './PastWorkoutsLink'

const PastWorkoutsLinkContainer = ({ queryPastWorkoutData }) => {
  const [pastWorkoutData, setPastWorkoutData] = useState(null)
  const [isResponse, setIsResponse] = useState(true)

  useEffect(() => {
    const order = 'workoutStartTime'
    const numResults = 1
    const descending = true

    queryPastWorkoutData(order, numResults, 0, descending).then(res => {
      if (
        res &&
        typeof res.isResponse !== 'undefined' &&
        res.isResponse === false
      ) {
        setIsResponse(false)
      }
      setPastWorkoutData(res.data[0])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <PastWorkoutsLink
      pastWorkoutData={pastWorkoutData}
      isResponse={isResponse}
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    queryPastWorkoutData: (order, numResults, pageNum, descending) =>
      dispatch(queryPastWorkoutData(order, numResults, pageNum, descending)),
  }
}

export default connect(null, mapDispatchToProps)(PastWorkoutsLinkContainer)
