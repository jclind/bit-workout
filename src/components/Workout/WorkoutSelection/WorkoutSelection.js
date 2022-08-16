import React, { useState, useEffect } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { Link, useNavigate, useOutlet } from 'react-router-dom'
import './WorkoutSelection.scss'

const WorkoutSelection = () => {
  const navigate = useNavigate()
  const outlet = useOutlet()

  const [selectedList, setSelectedList] = useState('trending')
  useEffect(() => {
    navigate(`/workout/${selectedList}-workouts`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedList])

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

export default WorkoutSelection
