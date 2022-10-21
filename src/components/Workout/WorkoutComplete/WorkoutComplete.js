import './WorkoutComplete.scss'
import ConfettiAnim from '../../ConfettiAnim'
import { connect } from 'react-redux'
import { setWorkoutFinished } from '../../../redux/actions/workout/workout'

const WorkoutComplete = ({ setWorkoutFinished, workoutStats }) => {
  const returnFromWorkout = () => {
    setWorkoutFinished(false)
  }
  console.log(workoutStats)

  const { totalWorkoutTime, coinsEarned, expEarned, totalWeight, prs } =
    workoutStats

  return (
    <div className='workout-complete page'>
      <ConfettiAnim className='anim' />
      <div className='content'>
        <div className='title'>Workout Complete!</div>
        <div className='text'>Well done on completing your workout!</div>

        <div className='top-stats'>
          <div className='time stat'>
            <div className='label'>Time:</div>
            <div className='value'>
              {Math.floor(totalWorkoutTime / 6000)} min
            </div>
          </div>
          <div className='divider'></div>
          <div className='volume stat'>
            <div className='label'>Volume:</div>
            <div className='value'>{totalWeight} lbs</div>
          </div>
        </div>
        <div className='prs'>
          <div className='pr-title'>Records</div>
          {prs.pr1x1s.length > 0
            ? prs.pr1x1s.map(pr => {
                // NEED TO GET EXERCISE DATA AND DISPLAY WORKOUT NAME AND MAYBE IMAGE?
                return (
                  <div className='pr' key={pr.id}>
                    <div className='weight'>{pr.weight}</div>
                    <div className='reps'>x {pr.reps}</div>
                  </div>
                )
              })
            : ''}
        </div>

        {/* <div className='stats'>
          <div className='stat'>
            <div className='label'>Workout Time:</div>
            <WorkoutTime workoutTime={workoutTime} />
          </div>
          <div className='stat'>
            <div className='label'>Coins Earned:</div>
            <div className='data'>+{coinsEarned}</div>
          </div>
          <div className='stat'>
            <div className='label'>Exp Earned:</div>
            <div className='data'>+{expEarned}</div>
          </div>
        </div> */}
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
