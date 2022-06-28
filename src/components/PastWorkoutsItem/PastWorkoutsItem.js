import React, { useState } from 'react'
import { formatAMPM, formatDate } from '../../util/formatDate'
import { formatTimeToObject } from '../../util/formatTime'
import { AiOutlineStar, AiOutlineRight, AiOutlineDown } from 'react-icons/ai'
import { RiCopperCoinLine } from 'react-icons/ri'
import Skeleton from 'react-loading-skeleton'

import './PastWorkoutsItem.scss'
import WorkoutTime from '../WorkoutTime/WorkoutTime'
import { exerciseList } from '../../assets/data/exerciseList'

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
        <div className='date'>{date ? date : <Skeleton />}</div>
        <div className='collapse-indicator'>
          {isCollapsed ? (
            <AiOutlineRight className='icon ' />
          ) : (
            <AiOutlineDown className='icon' />
          )}
        </div>
      </div>

      <div className={isCollapsed ? 'collapse' : 'collapse show'}>
        <div className='workout-data'>
          <div className='start-finish-time item'>
            <div className='label'>Timespan:</div>
            <div className='data'>
              {startTime} - {finishTime}
            </div>
          </div>
          <div className='coins item'>
            <div className='label'>Coins Earned:</div>
            <div className='data coins'>
              + <AiOutlineStar className='icon' />
              {coins}
            </div>
          </div>
          <div className='exp item'>
            <div className='label'>Experience Earned:</div>
            <div className='data exp'>
              + <RiCopperCoinLine className='icon' />
              {exp}
            </div>
          </div>
          <div className='workout-path item'>
            <div className='label'>Exercises:</div>
            <div className='data'>
              {workout.path.map(currExercise => {
                const exerciseData = exerciseList.find(
                  obj => obj.id === currExercise.exerciseID
                )

                const name = exerciseData.name
                const imageURL = exerciseData.imageURL
                const weight = currExercise.weight
                const reps = currExercise.reps
                const sets = currExercise.sets

                return (
                  <div className='workout-path-exercise'>
                    <div className='image'>
                      <img src={imageURL} alt={name} />
                    </div>
                    <div className='exercise-data'>
                      <div className='name'>{name}</div>
                      <div className='reps-sets'>
                        <div className='sets'>
                          Sets: <span>{sets}</span>
                        </div>
                        <div className='reps'>
                          Reps: <span>{reps}</span>
                        </div>
                      </div>
                    </div>
                    <div className='weight'>
                      {weight}
                      <span>lbs</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PastWorkoutsItem
