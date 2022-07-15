import React from 'react'
import { useLocation, useOutlet, Navigate } from 'react-router-dom'
import './CreateWorkout.scss'

const CreateWorkout = () => {
  const location = useLocation()
  const outlet = useOutlet()
  if (location.pathname === '/create-workout') {
    return <Navigate to='/create-workout/add-exercises' />
  }
  return <>{outlet}</>
}

export default CreateWorkout
