// import { useWorkout } from '../../../contexts/WorkoutContext'
import ActiveWorkout from './ActiveWorkout'
import TimerContainer from '../../Timer/TimerContainer'
import './ActiveWorkout.scss'
import { connect } from 'react-redux'
import { setIsTimer } from '../../../redux/actions/workout/workout'

const WorkoutContainer = ({ isTimer, timerStart, restTime }) => {
  return (
    <>
      {isTimer && timerStart ? (
        <TimerContainer
          timerStart={timerStart}
          restTime={restTime}
          setIsTimer={setIsTimer}
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
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setIsTimer: isTimer => dispatch(setIsTimer(isTimer)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutContainer)
