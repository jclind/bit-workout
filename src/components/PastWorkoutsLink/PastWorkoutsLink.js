import React from 'react'
import { useNavigate } from 'react-router-dom'
import './PastWorkoutsLink.scss'
import Skeleton from 'react-loading-skeleton'
import { AiOutlineCalendar } from 'react-icons/ai'
import { formatDate } from '../../util/formatDate'
import { formatTimeToObject } from '../../util/formatTime'
import WorkoutTime from '../WorkoutTime/WorkoutTime'
import { trimString } from '../../util/trimString'

const SKELETON_BASE_COLOR = '#546d80'
const SKELETON_HIGHLIGHT_COLOR = '#548ca8'

const NoPastWorkout = () => {
  const navigate = useNavigate()
  return (
    <div className='no-data'>
      <div className='text'>No Past Workout Data</div>
      <button
        className='start-workout-btn btn'
        onClick={() => navigate('/workout')}
      >
        Start Workout
      </button>
    </div>
  )
}

const PastWorkoutsLink = ({ pastWorkoutData, isResponse }) => {
  const loading = pastWorkoutData === null
  const workoutTime = pastWorkoutData
    ? formatTimeToObject(pastWorkoutData.totalWorkoutTime)
    : null
  const workoutDate = pastWorkoutData
    ? formatDate(pastWorkoutData.workoutStartTime)
    : null
  const workoutImageURL = pastWorkoutData
    ? pastWorkoutData.path[0].imageURL
    : null
  // Only allow 50 characters to be shown
  const workoutName = !pastWorkoutData
    ? null
    : pastWorkoutData.workoutName.length > 53
    ? trimString(pastWorkoutData.workoutName, 50, true)
    : pastWorkoutData.workoutName

  const navigate = useNavigate()

  return (
    <div className={`past-workouts-link ${loading ? 'loading' : ''}`}>
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
                    className='workout-image-skeleton'
                    baseColor={SKELETON_BASE_COLOR}
                    highlightColor={SKELETON_HIGHLIGHT_COLOR}
                  />
                )}
              </div>
              <div className='info'>
                <div className='top'>
                  <div className='title'>
                    <div className='title'>
                      {workoutName || (
                        <Skeleton
                          baseColor={SKELETON_BASE_COLOR}
                          highlightColor={SKELETON_HIGHLIGHT_COLOR}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className='bottom'>
                  {workoutTime ? (
                    <WorkoutTime workoutTime={workoutTime} />
                  ) : (
                    <Skeleton
                      width='8ch'
                      baseColor={SKELETON_BASE_COLOR}
                      highlightColor={SKELETON_HIGHLIGHT_COLOR}
                    />
                  )}
                  <div className='date'>
                    {workoutDate ? (
                      <>
                        <AiOutlineCalendar className='icon' />
                        {workoutDate}
                      </>
                    ) : (
                      <Skeleton
                        baseColor={SKELETON_BASE_COLOR}
                        highlightColor={SKELETON_HIGHLIGHT_COLOR}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Link to='/past-workouts' className='past-workouts-link'> */}
          <button
            type='button'
            className='past-workouts-btn btn'
            onClick={() => navigate('/past-workouts')}
          >
            Past Workouts
          </button>
          {/* </Link> */}
        </>
      )}
    </div>
  )
}

export default PastWorkoutsLink
