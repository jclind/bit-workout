import './WorkoutComplete.scss'
import ConfettiAnim from '../../ConfettiAnim'
import { connect } from 'react-redux'
import { setWorkoutFinished } from '../../../redux/actions/workout/workout'
import { formatTimeToObject } from '../../../util/formatTime'

const WorkoutComplete = ({ setWorkoutFinished, workoutStats }) => {
  const returnFromWorkout = () => {
    setWorkoutFinished(false)
  }

  const { totalWorkoutTime, coinsEarned, expEarned } = workoutStats
  const workoutTime = formatTimeToObject(totalWorkoutTime)

  return (
    <div className='workout-complete page'>
      <ConfettiAnim className='anim' />
      <div className='content'>
        <div className='title'>Workout Complete!</div>
        <div className='text'>Well done on completing your workout!</div>

        <div className='stats'>
          <div className='stat'>
            <div className='label'>Workout Time:</div>
            <div className='data time'>
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
                  {workoutTime.s} <span className='time-indicator'>S</span>
                </div>
              )}
            </div>
          </div>
          <div className='stat'>
            <div className='label'>Coins Earned:</div>
            <div className='data'>+{coinsEarned}</div>
          </div>
          <div className='stat'>
            <div className='label'>Exp Earned:</div>
            <div className='data'>+{expEarned}</div>
          </div>
        </div>
        <button className='back-home-btn' onClick={returnFromWorkout}>
          Back Home
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    workoutStats: state.workout.completedWorkoutData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setWorkoutFinished: isFinished => dispatch(setWorkoutFinished(isFinished)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutComplete)
