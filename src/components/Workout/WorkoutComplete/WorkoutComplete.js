import './WorkoutComplete.scss'
import ConfettiAnim from '../../ConfettiAnim'
import { connect } from 'react-redux'
import { setWorkoutFinished } from '../../../redux/actions/workout/workout'

const WorkoutComplete = ({ setWorkoutFinished }) => {
  const returnFromWorkout = () => {
    setWorkoutFinished(false)
  }

  return (
    <div className='workout-complete page'>
      <ConfettiAnim className='anim' />
      <div className='content'>
        <div className='title'>Workout Complete!</div>
        <div className='text'>Well done on completing your workout!</div>
        <button className='back-home-btn' onClick={returnFromWorkout}>
          Back Home
        </button>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setWorkoutFinished: isFinished => dispatch(setWorkoutFinished(isFinished)),
  }
}

export default connect(null, mapDispatchToProps)(WorkoutComplete)
