import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PastWorkoutsLink.scss'
import { connect } from 'react-redux'
import { queryPastWorkoutData } from '../../redux/actions/workout/workout'
import Skeleton from 'react-loading-skeleton'
import { formatTimeToObject } from '../../util/formatTime'
import { formatDate } from '../../util/formatDate'
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai'

const PastWorkoutsLink = ({ queryPastWorkoutData }) => {
  const [data, setData] = useState(null)
  const [isResponse, setIsResponse] = useState(true)

  useEffect(() => {
    const order = 'workoutStartTime'
    const numResults = 1
    const descending = true

    queryPastWorkoutData(order, numResults, descending).then(res => {
      if (
        res &&
        typeof res.isResponse !== 'undefined' &&
        res.isResponse === false
      ) {
        setIsResponse(false)
      }
      setData(res[0])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const workoutTime = data ? formatTimeToObject(data.totalWorkoutTime) : null
  const workoutDate = data ? formatDate(data.workoutStartTime) : null
  const workoutImageURL = data ? data.path[0].imageURL : null
  console.log(workoutImageURL)

  if (data) {
    console.log(data.totalWorkoutTime)
  }

  return (
    <div className='past-workouts-link'>
      {!isResponse ? (
        <div className='no-data'>
          <div className='text'>No Past Workout Data</div>
          <Link to='/workout'>
            <button className='start-workout-btn btn'>Start Workout</button>
          </Link>
        </div>
      ) : (
        <>
          <h1>Last Workout</h1>
          <div className='last-workout'>
            <div className='head'>
              <div className='image'>
                {workoutImageURL ? (
                  <img
                    src={workoutImageURL}
                    alt={data.workoutName}
                    className='workout-image'
                  />
                ) : (
                  <Skeleton
                    circle
                    height='100%'
                    containerClassName='workout-image'
                  />
                )}
              </div>
              <div className='title'>{data?.workoutName || <Skeleton />}</div>
            </div>
            <div className='info'>
              <div className='date'>
                <AiOutlineCalendar className='icon' />
                {workoutDate ? workoutDate : <Skeleton />}
              </div>
              <div className='time'>
                <AiOutlineClockCircle className='icon' />
                {workoutTime ? (
                  <>
                    <div className='time-type'>
                      {workoutTime.h ? (
                        <>
                          {workoutTime.h}
                          <span className='time-indicator'>H</span>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                    <div className='time-type'>
                      {workoutTime.m} <span className='time-indicator'>M</span>
                    </div>
                    {!workoutTime.h && (
                      <div className='time-type'>
                        {workoutTime.s}{' '}
                        <span className='time-indicator'>S</span>
                      </div>
                    )}
                  </>
                ) : (
                  <Skeleton />
                )}
              </div>
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
