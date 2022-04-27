import ActiveWorkout from './ActiveWorkout'
import TimerContainer from '../../Timer/TimerContainer'
import './ActiveWorkout.scss'
import { connect } from 'react-redux'

const WorkoutContainer = ({
  isTimer,
  timerStart,
  restTime,
  failSetRestTime,
  lastSetFailed,
}) => {
  return (
    <>
      {isTimer && timerStart ? (
        <TimerContainer
          timerStart={timerStart}
          restTime={restTime}
          failSetRestTime={failSetRestTime}
          lastSetFailed={lastSetFailed}
        />
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
    failSetRestTime: runningWorkout.currWorkout.failSetRestTime,
    lastSetFailed: runningWorkout.currWorkout.lastSetFailed,
  }
}

export default connect(mapStateToProps, null)(WorkoutContainer)
