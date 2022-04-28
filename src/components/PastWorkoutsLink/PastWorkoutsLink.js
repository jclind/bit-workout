import React, { useState, useEffect } from 'react'
import './PastWorkoutsLink.scss'
import { connect } from 'react-redux'
import { queryPastWorkoutData } from '../../redux/actions/workout/workout'
import Skeleton from 'react-loading-skeleton'
import { formatTimeToObject } from '../../util/formatTime'

const PastWorkoutsLink = ({ queryPastWorkoutData }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [isResponse, setIsResponse] = useState(true)

  useEffect(() => {
    const order = 'workoutStartTime'
    const numResults = 1
    const descending = true

    queryPastWorkoutData(order, numResults, descending).then(res => {
      setData(res[0])
    })
  }, [])

  const workoutTime = data ? formatTimeToObject(data.totalWorkoutTime) : null

  useEffect(() => {
    if (
      data &&
      typeof data.isResponse !== 'undefined' &&
      data.isResponse === false
    ) {
      console.log(data)
      setIsResponse(false)
    } else {
      if (data) {
        setLoading(false)
        console.log(data)
      } else {
        setLoading(true)
      }
    }
  }, [data])
  return (
    <div className='past-workouts-link'>
      {!isResponse ? (
        <h1>No Past Workout Data</h1>
      ) : (
        <>
          <h3 className='title'>{data?.workoutName || <Skeleton />}</h3>
          <div className='workout-time'>
            <div className='label'>Workout Time:</div>
            <div className='time'>
              {workoutTime ? (
                <>
                  <div className='time-type'>
                    {workoutTime.h
                      ? `${workoutTime.h}<span className='time-indicator'>H</span>`
                      : ''}
                  </div>
                  <div className='time-type'>
                    {workoutTime.m} <span className='time-indicator'>M</span>
                  </div>
                  {!workoutTime.h && (
                    <div className='time-type'>
                      {workoutTime.s} <span className='time-indicator'>S</span>
                    </div>
                  )}
                </>
              ) : (
                <Skeleton />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    queryPastWorkoutData: (order, numResults, descending) =>
      dispatch(queryPastWorkoutData(order, numResults, descending)),
  }
}

export default connect(null, mapDispatchToProps)(PastWorkoutsLink)
