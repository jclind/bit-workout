import './WorkoutComplete.scss'
import ConfettiAnim from '../../ConfettiAnim'
import { connect } from 'react-redux'
import {
  getSingleExercise,
  setWorkoutFinished,
} from '../../../redux/actions/workout/workout'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { RiCopperCoinLine } from 'react-icons/ri'

const WorkoutComplete = ({
  setWorkoutFinished,
  workoutStats,
  getSingleExercise,
}) => {
  const returnFromWorkout = () => {
    setWorkoutFinished(false)
  }

  const { totalWorkoutTime, path, coinsEarned, expEarned, totalWeight, prs } =
    workoutStats

  return (
    <div className='workout-complete'>
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
          <div className='volume stat'>
            <div className='label'>Volume:</div>
            <div className='value'>{totalWeight} lbs</div>
          </div>
          <div className='prs stat'>
            <div className='label'>Workout Path:</div>
            {path.length > 0
              ? path.map(exercise => {
                  if (exercise.setPath.length <= 0) return null
                  const { name } = getSingleExercise(exercise.exerciseID)
                  const maxWeight = Math.max.apply(
                    Math,
                    exercise.setPath.map(o => Number(o.weight))
                  )

                  let isPR = false
                  prs.pr1x1s.forEach(pr => {
                    if (exercise.setPath.find(set => set.id === pr.id)) {
                      isPR = true
                    }
                  })
                  console.log(exercise)
                  return (
                    <div className='value path-exercise' key={exercise.id}>
                      <div className='name'>{name}</div>
                      {isPR && <AiFillStar className='pr-icon icon' />}
                      <div className='weight'>{maxWeight} lbs</div>
                    </div>
                  )
                })
              : ''}
          </div>
        </div>
        <div className='coins-exp'>
          <div className='stat'>
            <div className='label'>Coins:</div>
            <div className='data'>
              +<RiCopperCoinLine className='coin-icon icon' />
              {coinsEarned}
            </div>
          </div>
          <div className='stat'>
            <div className='label'>Exp:</div>
            <div className='data'>
              +<AiOutlineStar className='exp-icon icon' />
              {expEarned}
            </div>
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
    getSingleExercise: exerciseID => dispatch(getSingleExercise(exerciseID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutComplete)
