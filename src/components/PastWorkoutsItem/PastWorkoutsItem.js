import React, { useState } from 'react'
import { formatAMPM, formatDate } from '../../util/formatDate'
import { formatTimeToObject } from '../../util/formatTime'
import { AiOutlineStar, AiOutlineRight, AiOutlineDown } from 'react-icons/ai'
import { RiCopperCoinLine } from 'react-icons/ri'
import Skeleton from 'react-loading-skeleton'

import './PastWorkoutsItem.scss'
import WorkoutTime from '../WorkoutTime/WorkoutTime'
import { exerciseList } from '../../assets/data/exerciseList'

const SKELETON_BASE_COLOR = '#546d80'
const SKELETON_HIGHLIGHT_COLOR = '#548ca8'

const PastWorkoutsItem = ({ workout, loading }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const name = workout && workout.workoutName
  const workoutTime = workout && formatTimeToObject(workout.totalWorkoutTime)
  const date = workout && formatDate(workout.workoutStartTime)
  const startTime = workout && formatAMPM(workout.workoutStartTime)
  const workoutFinishTime =
    workout &&
    Number(workout.workoutStartTime) + Number(workout.totalWorkoutTime)
  const finishTime = workout && formatAMPM(workoutFinishTime)
  const imageURL = workout && workout.path[0].imageURL
  const coins = workout && workout.coinsEarned
  const exp = workout && workout.expEarned

  return (
    <div className='past-workouts-item'>
      <div
        className='head'
        aria-label='Workout Collapse Toggle'
        onClick={() => {
          if (!loading) {
            setIsCollapsed(!isCollapsed)
          }
        }}
      >
        <div className='image'>
          {loading ? (
            <Skeleton
              circle
              className='img-skeleton'
              baseColor={SKELETON_BASE_COLOR}
              highlightColor={SKELETON_HIGHLIGHT_COLOR}
            />
          ) : (
            <img src={imageURL} alt='' className='img' />
          )}
        </div>
        <div className='workout-data'>
          <div className='top'>
            <div className='name'>
              {loading ? (
                <Skeleton
                  baseColor={SKELETON_BASE_COLOR}
                  highlightColor={SKELETON_HIGHLIGHT_COLOR}
                />
              ) : (
                name
              )}
            </div>
          </div>
          <div className='bottom'>
            {loading ? (
              <Skeleton
                baseColor={SKELETON_BASE_COLOR}
                highlightColor={SKELETON_HIGHLIGHT_COLOR}
                width='8ch'
              />
            ) : (
              <WorkoutTime workoutTime={workoutTime} />
            )}
          </div>
        </div>
        <div className='date'>
          {loading ? (
            <Skeleton
              baseColor={SKELETON_BASE_COLOR}
              highlightColor={SKELETON_HIGHLIGHT_COLOR}
              width='8ch'
            />
          ) : (
            date
          )}
        </div>
        {!loading && (
          <div className='collapse-indicator'>
            {isCollapsed ? (
              <AiOutlineRight className='icon ' />
            ) : (
              <AiOutlineDown className='icon' />
            )}
          </div>
        )}
      </div>

      {!loading && (
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
      )}
    </div>
  )
}

export default PastWorkoutsItem
