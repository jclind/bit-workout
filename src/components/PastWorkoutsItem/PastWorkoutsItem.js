import React, { useState } from 'react'
import { formatAMPM, formatDate } from '../../util/formatDate'
import { formatTime, formatTimeToObject } from '../../util/formatTime'
import { AiOutlineStar, AiOutlineRight, AiOutlineDown } from 'react-icons/ai'
import { RiCopperCoinLine } from 'react-icons/ri'
import Skeleton from 'react-loading-skeleton'

import './PastWorkoutsItem.scss'
import WorkoutTime from '../WorkoutTime/WorkoutTime'
import { timeToMS } from '../../util/timeToMS'

const SKELETON_BASE_COLOR = '#546d80'
const SKELETON_HIGHLIGHT_COLOR = '#548ca8'

const ExerciseItem = ({ currActiveWorkoutExercise, getSingleExercise }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const setPath = currActiveWorkoutExercise.setPath
  const sets = currActiveWorkoutExercise.sets
  const numSets = setPath.length
  const type = currActiveWorkoutExercise.type

  const exerciseID = currActiveWorkoutExercise.exerciseID
  const currExercise = getSingleExercise(exerciseID)
  const { name, imageURL } = currExercise

  console.log(currActiveWorkoutExercise)

  return (
    <div className='workout-path-exercise'>
      <div
        className='head'
        onClick={() => {
          setIsCollapsed(prev => !prev)
        }}
      >
        <div className='image'>
          <img src={imageURL} alt={name} />
        </div>
        <div className='exercise-data'>
          <div className='name'>{name}</div>
          <div className='reps-sets'>
            <div className='sets'>
              {type} Sets: <span>{numSets}</span>
            </div>
          </div>
        </div>
        <div className='collapse-indicator-container'>
          <div className='set-path-label'>Set Path</div>
          <div className='collapse-indicator'>
            {isCollapsed ? (
              <AiOutlineRight className='icon ' />
            ) : (
              <AiOutlineDown className='icon' />
            )}
          </div>
        </div>
      </div>
      <div className={isCollapsed ? 'collapse' : 'collapse show'}>
        <div className='set-path-data'>
          {setPath.map((set, idx) => {
            const weight = set.weight || sets[idx].weight

            return (
              <div className='set' key={idx}>
                <div className='set-num'>Set {idx + 1}:</div>
                <div className='num-reps'>
                  <label>Reps:</label> {set.completedReps}
                </div>
                {type === 'timed' && (
                  <div className='time'>
                    <label>Time: </label>
                    {formatTime(
                      timeToMS(sets[idx].time.minutes, sets[idx].time.seconds)
                    )}
                  </div>
                )}
                <div className='weight'>
                  <label>Weight:</label>
                  {weight}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const PastWorkoutsItem = ({ workout, getSingleExercise, loading }) => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const name =
    workout && workout.workoutName ? workout.workoutName : 'Temp Workout'
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
                {workout.path.map(currActiveWorkoutExercise => {
                  return (
                    <ExerciseItem
                      currActiveWorkoutExercise={currActiveWorkoutExercise}
                      getSingleExercise={getSingleExercise}
                      key={currActiveWorkoutExercise.id}
                    />
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
