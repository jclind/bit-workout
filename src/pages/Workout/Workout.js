import React from 'react'
import NavbarContainer from '../../components/Navbar/NavbarContainer'
import { useWorkout } from '../../contexts/WorkoutContext'

const Workout = () => {
  const { isWorkout } = useWorkout()

  return (
    <>
      <div className='page'>WORKOUT PAGE</div>
      <NavbarContainer />
    </>
  )
}

export default Workout
