import React, { useState, useEffect } from 'react'
import Workout from './Workout'
import { getNextEvent } from '../../util/getNextEvent'
import { exerciseList } from '../../assets/data/exerciseList'

const WorkoutContainer = ({ exerciseData }) => {
  // Current workout event
  const [currEvent, setCurrEvent] = useState(null)
  const [currExerciseData, setCurrExerciseData] = useState(null)
  // Current set number in the workout currently being shown
  const [currSet, setCurrSet] = useState(1)
  // Whether the timer is running
  const [isTimer, setIsTimer] = useState(false)
  // Whether the workout is finished
  const [workoutFinished, setWorkoutFinished] = useState(false)

  const restTime = exerciseData.restTime

  useEffect(() => {
    if (!isTimer) {
      console.log('Timer is not running')
      if (!currEvent) {
        getNextEvent(currEvent, exerciseData, setCurrEvent, setWorkoutFinished)
      } else if (currSet >= currEvent.sets) {
        getNextEvent(currEvent, exerciseData, setCurrEvent, setWorkoutFinished)
        setCurrSet(1)
      } else {
        setCurrSet(currSet + 1)
      }
    }
  }, [isTimer])
  useEffect(() => {
    if (currEvent) {
      setCurrExerciseData(
        exerciseList.find(ex => ex.id === currEvent.exerciseID)
      )
    }
  }, [currEvent])

  return (
    <>
      {currExerciseData ? (
        <Workout
          setIsTimer={setIsTimer}
          workoutFinished={workoutFinished}
          restTime={restTime}
          isTimer={isTimer}
          currEvent={currEvent}
          currSet={currSet}
          currExerciseData={currExerciseData}
        />
      ) : (
        <span>Loading</span>
      )}
    </>
  )
}

export default WorkoutContainer
