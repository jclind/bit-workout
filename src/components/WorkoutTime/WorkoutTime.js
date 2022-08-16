import React from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import Skeleton from 'react-loading-skeleton'
import './WorkoutTime.scss'

const WorkoutTime = ({ workoutTime }) => {
  if (!workoutTime) {
    return (
      <div className='time'>
        <AiOutlineClockCircle className='icon' />
      </div>
    )
  }

  const hours = workoutTime.h
  const minutes = workoutTime.m
  const seconds = workoutTime.s

  return (
    <div className='workout-time'>
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

export default WorkoutTime
