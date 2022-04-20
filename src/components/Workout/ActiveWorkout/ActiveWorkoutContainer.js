import ActiveWorkout from './ActiveWorkout'
import TimerContainer from '../../Timer/TimerContainer'
import './ActiveWorkout.scss'
import { connect } from 'react-redux'

const WorkoutContainer = ({ isTimer, timerStart, restTime }) => {
  return (
    <>
      {isTimer && timerStart ? (
        <TimerContainer timerStart={timerStart} restTime={restTime} />
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
    restTime: runningWorkout.currWorkout.restTime,
  }
}

export default connect(mapStateToProps, null)(WorkoutContainer)
