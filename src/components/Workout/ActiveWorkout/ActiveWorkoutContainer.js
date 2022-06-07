import ActiveWorkout from './ActiveWorkout'
import TimerContainer from '../../Timer/TimerContainer'
import './ActiveWorkout.scss'
import { connect } from 'react-redux'

const WorkoutContainer = ({ isTimer, timerStart }) => {
  return (
    <>
      {isTimer && timerStart ? (
        <TimerContainer timerStart={timerStart} />
      ) : (
        <ActiveWorkout />
      )}
    </>
  )
}

const mapStateToProps = state => {
  const runningWorkout = state.workout.workoutData.runningWorkout
  const timer = runningWorkout.timer
  return {
    isTimer: timer.isTimer,
    timerStart: timer.timerStart,
  }
}

export default connect(mapStateToProps, null)(WorkoutContainer)
