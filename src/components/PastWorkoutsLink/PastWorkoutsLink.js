import React from 'react'
import { Link } from 'react-router-dom'
import './PastWorkoutsLink.scss'
import Skeleton from 'react-loading-skeleton'
import { AiOutlineCalendar } from 'react-icons/ai'
import { formatDate } from '../../util/formatDate'
import { formatTimeToObject } from '../../util/formatTime'
import WorkoutTime from '../WorkoutTime/WorkoutTime'

const NoPastWorkout = () => {
  return (
    <div className='no-data'>
      <div className='text'>No Past Workout Data</div>
      <Link to='/workout'>
        <button className='start-workout-btn btn'>Start Workout</button>
      </Link>
    </div>
  )
}

const PastWorkoutsLink = ({ pastWorkoutData, isResponse }) => {
  const workoutTime = pastWorkoutData
    ? formatTimeToObject(pastWorkoutData.totalWorkoutTime)
    : null
  const workoutDate = pastWorkoutData
    ? formatDate(pastWorkoutData.workoutStartTime)
    : null
  const workoutImageURL = pastWorkoutData
    ? pastWorkoutData.path[0].imageURL
    : null
  const workoutName = pastWorkoutData && pastWorkoutData.workoutName

  return (
    <div className='past-workouts-link'>
      {!isResponse ? (
        <NoPastWorkout />
      ) : (
        <>
          <h1>Last Workout</h1>
          <div className='last-workout'>
            <div className='head'>
              <div className='image'>
                {workoutImageURL ? (
                  <img
                    src={workoutImageURL}
                    alt={workoutName}
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
              <div className='info'>
                <div className='top'>
                  <div className='title'>{workoutName || <Skeleton />}</div>
                </div>
                <div className='bottom'>
                  <WorkoutTime workoutTime={workoutTime} />
                  <div className='date'>
                    <AiOutlineCalendar className='icon' />
                    {workoutDate ? workoutDate : <Skeleton />}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to='/past-workouts' className='past-workouts-link'>
            <button type='button' className='past-workouts-btn btn'>
              Past Workouts
            </button>
          </Link>
        </>
      )}
    </div>
  )
}

export default PastWorkoutsLink
