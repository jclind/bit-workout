import React, { useState, useEffect } from 'react'
import '../../assets/styles/components/workout/single-workout.scss'
import { exerciseList } from '../../assets/data/exerciseList'
import { estimateTime } from '../../util/estimateTime'
import { msToTime } from '../../util/msToTime'

const SingleWorkout = ({ text, exercise }) => {
  const estTime = msToTime(estimateTime(exercise))

  return (
    <div className='single-workout'>
      <div className='title-container'>
        <div className='title'>{text}</div>
        <div className='est-time'>Time: ≈{estTime}</div>
      </div>
      <div className='exercises-container'>
        {exercise.path.map((e, idx) => {
          const currExercise = exerciseList.find(obj => obj.id === e.exerciseID)
          const image = currExercise.imageURL
          const name = currExercise.name

          return (
            <div key={idx}>
              <img src={image} alt={name} className='exercise-img' />
              <div className='exercise-title'>{name}</div>
            </div>
          )
        })}
      </div>
      <button className='start-button'>Start Workout</button>
    </div>
  )
}

export default SingleWorkout
