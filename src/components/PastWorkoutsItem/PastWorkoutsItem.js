import React, { useState } from 'react'
import { formatAMPM, formatDate } from '../../util/formatDate'
import { formatTimeToObject } from '../../util/formatTime'
import { AiOutlineCalendar, AiOutlineStar } from 'react-icons/ai'
import { RiCopperCoinLine } from 'react-icons/ri'
import Skeleton from 'react-loading-skeleton'

import './PastWorkoutsItem.scss'
import WorkoutTime from '../WorkoutTime/WorkoutTime'

const PastWorkoutsItem = ({ workout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const name = workout.workoutName
  const workoutTime = formatTimeToObject(workout.totalWorkoutTime)
  const date = formatDate(workout.workoutStartTime)
  const startTime = formatAMPM(workout.workoutStartTime)
  const workoutFinishTime =
    Number(workout.workoutStartTime) + Number(workout.totalWorkoutTime)
  const finishTime = formatAMPM(workoutFinishTime)
  const imageURL = workout.path[0].imageURL
  const coins = workout.coinsEarned
  const exp = workout.expEarned

  return (
    <div className='past-workouts-item'>
      <div
        className='head'
        aria-label='Workout Collapse Toggle'
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className='image'>
          <img src={imageURL} alt='' />
        </div>
        <div className='workout-data'>
          <div className='top'>
            <div className='name'>{name}</div>
          </div>
          <div className='bottom'>
            <WorkoutTime workoutTime={workoutTime} />
          </div>
        </div>
        <div className='date'>
          {/* <AiOutlineCalendar className='icon' /> */}
          {date ? date : <Skeleton />}
        </div>
      </div>
      <div className={isCollapsed ? 'collapse' : 'collapse show'}>
        <h1>sus</h1>
        <h1>sus</h1>
        <h1>sus</h1>
        <h1>sus</h1>
      </div>

      {/* <div className='character-data'>
        <div className='coins'>
          + <AiOutlineStar className='icon' />
          {coins}
        </div>
        <div className='exp'>
          + <RiCopperCoinLine className='icon' />
          {exp}
        </div>
      </div> */}
    </div>
  )
}

export default PastWorkoutsItem
