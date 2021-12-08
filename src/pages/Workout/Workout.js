import React from 'react'
import NavbarContainer from '../../components/Navbar/NavbarContainer'
import { useWorkout } from '../../contexts/WorkoutContext'
import SingleWorkout from '../../components/Workout/SingleWorkout'
import { e1 } from '../../assets/data/e1'

const Workout = () => {
  const { isWorkout } = useWorkout()

  return (
    <>
      <div className='page'>
        WORKOUT PAGE
        <SingleWorkout text={'Your Next Workout'} exercise={e1} />
      </div>
      <NavbarContainer />
    </>
  )
}

export default Workout
