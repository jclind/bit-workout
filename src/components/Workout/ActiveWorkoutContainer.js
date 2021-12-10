import React, { useState, useEffect } from 'react'
import { getNextEvent } from '../../util/getNextEvent'
import { exerciseList } from '../../assets/data/exerciseList'
import TimerContainer from '../Timer/TimerContainer'

const WorkoutContainer = ({ workoutData, stopWorkout }) => {
  const [currIdx, setCurrIdx] = useState()
  const [currSet, setCurrSet] = useState()
  const [currSetTotal, setCurrSetTotal] = useState()
  const [restTime, setRestTime] = useState()
  const [isTimer, setIsTimer] = useState()

  const { isWorkoutRunning } = workoutData

  const finishWorkout = () => {
    console.log('workout finished')
  }

  const completeSet = () => {
    if (currSet === currSetTotal) {
      // If the last set of the last exercise is finished
      if (currIdx >= workoutData.runningWorkout.currWorkout.path.length - 1) {
        return finishWorkout()
      } else {
        setIsTimer(true)
        setCurrIdx(currIdx + 1)
        setCurrSet(1)
      }
    } else {
      setIsTimer(true)
      setCurrSet(currSet + 1)
    }
  }

  useEffect(() => {
    if (isWorkoutRunning) {
      const currWorkoutData = workoutData.runningWorkout
      const currIdx = currWorkoutData.remainingWorkout.currIdx
      const currSet = currWorkoutData.remainingWorkout.currSet
      setCurrIdx(currIdx)
      setCurrSet(currSet)
      setCurrSetTotal(currWorkoutData.currWorkout.path[currIdx].sets)
      setRestTime(currWorkoutData.currWorkout.restTime)
    }
  }, [])

  return (
    <>
      {currSet ? (
        <div>{`Current Set ${currSet} / ${currSetTotal}`}</div>
      ) : (
        <TimerContainer restTime={restTime} setIsTimer={setIsTimer} />
      )}
      <button className='submit-btn' onClick={completeSet}>
        Complete Set
      </button>
      <button className='submit-btn' onClick={stopWorkout}>
        Stop Workout
      </button>
    </>
  )
}

export default WorkoutContainer
// // Current workout event
// const [currEvent, setCurrEvent] = useState(null)
// const [currExerciseData, setCurrExerciseData] = useState(null)
// // Current set number in the workout currently being shown
// const [currSet, setCurrSet] = useState(1)
// // Whether the timer is running
// const [isTimer, setIsTimer] = useState(false)
// // Whether the workout is finished
// const [workoutFinished, setWorkoutFinished] = useState(false)

// const restTime = exerciseData.restTime

// useEffect(() => {
//   if (!isTimer) {
//     console.log('Timer is not running')
//     if (!currEvent) {
//       getNextEvent(currEvent, exerciseData, setCurrEvent, setWorkoutFinished)
//     } else if (currSet >= currEvent.sets) {
//       getNextEvent(currEvent, exerciseData, setCurrEvent, setWorkoutFinished)
//       setCurrSet(1)
//     } else {
//       setCurrSet(currSet + 1)
//     }
//   }
// }, [isTimer])
// useEffect(() => {
//   if (currEvent) {
//     setCurrExerciseData(
//       exerciseList.find(ex => ex.id === currEvent.exerciseID)
//     )
//   }
// }, [currEvent])
