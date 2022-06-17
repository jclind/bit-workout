import React from 'react'
import { Link } from 'react-router-dom'
import './PastWorkoutsLink.scss'
import Skeleton from 'react-loading-skeleton'
import { AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai'
import { formatDate } from '../../util/formatDate'
import { formatTimeToObject } from '../../util/formatTime'

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

const WorkoutTime = ({ workoutTime }) => {
  const hours = workoutTime.h
  const minutes = workoutTime.m
  const seconds = workoutTime.s

  return (
    <div className='time'>
      <AiOutlineClockCircle className='icon' />
      {workoutTime ? (
        <>
          <div className='time-type'>
            {hours !== 0 && (
              <>
                {hours}
                <span className='time-indicator'>H</span>
              </>
            )}
          </div>
          <div className='time-type'>
            {minutes} <span className='time-indicator'>M</span>
          </div>
          {!hours && (
            <div className='time-type'>
              {seconds} <span className='time-indicator'>S</span>
            </div>
          )}
        </>
      ) : (
        <Skeleton />
      )}
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
              <div className='title'>{workoutName || <Skeleton />}</div>
            </div>
            <div className='info'>
              <div className='date'>
                <AiOutlineCalendar className='icon' />
                {workoutDate ? workoutDate : <Skeleton />}
              </div>
              <WorkoutTime workoutTime={workoutTime} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PastWorkoutsLink
