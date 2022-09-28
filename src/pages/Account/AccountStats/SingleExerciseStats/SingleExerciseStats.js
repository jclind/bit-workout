import React from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import './SingleExerciseStats.scss'

const SingleExerciseStats = () => {
  const params = useParams()
  const exerciseID = params.exerciseID
  return (
    <div className='single-exercise-stats-page page'>
      <div className='settings-title'>{exerciseID}</div>
      <BackButton />
    </div>
  )
}

export default SingleExerciseStats
