import React, { useState, useEffect } from 'react'
import SingleWorkout from '../SingleWorkout/SingleWorkout'
import { AiOutlineSearch, AiOutlinePlusCircle } from 'react-icons/ai'
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useOutlet,
} from 'react-router-dom'
import { connect } from 'react-redux'
import './WorkoutSelection.scss'
import { getWorkouts } from '../../../redux/actions/workout/workout'

const WorkoutSelection = ({ getWorkouts }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const outlet = useOutlet()

  const [workoutSearchVal, setWorkoutSearchVal] = useState('')
  const [selectedList, setSelectedList] = useState('trending')
  useEffect(() => {
    navigate(`/workout/${selectedList}-workouts`)
  }, [selectedList])

  const [workouts, setWorkouts] = useState(null)

  return (
    <div className='workout-selection'>
      <div className='settings-title'>Workout Selection</div>

      <div className='selector'>
        <button
          className={
            selectedList === 'trending'
              ? 'selection-btn selected'
              : 'selection-btn'
          }
          onClick={() => setSelectedList('trending')}
        >
          Trending
        </button>
        <button
          className={
            selectedList === 'user' ? 'selection-btn selected' : 'selection-btn'
          }
          onClick={() => setSelectedList('user')}
        >
          Created
        </button>
        <button
          className={
            selectedList === 'liked'
              ? 'selection-btn selected'
              : 'selection-btn'
          }
          onClick={() => setSelectedList('liked')}
        >
          Liked
        </button>
      </div>
      {outlet}
      <Link to='/create-workout' className='create-workout-link'>
        <button>
          <AiOutlinePlusCircle className='icon' />
        </button>
      </Link>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getWorkouts: (queryString, order, limit) =>
      dispatch(getWorkouts(queryString, order, limit)),
  }
}

export default connect(null, mapDispatchToProps)(WorkoutSelection)
