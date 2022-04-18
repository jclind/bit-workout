import { useWorkout } from '../../../contexts/WorkoutContext'
import ActiveWorkout from './ActiveWorkout'
import TimerContainer from '../../Timer/TimerContainer'
import './ActiveWorkout.scss'

const WorkoutContainer = () => {
  const { workoutData, isTimer, timerStart, setIsTimer } = useWorkout()

  const {
    runningWorkout: {
      currWorkout: { restTime },
    },
  } = workoutData

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

export default WorkoutContainer
