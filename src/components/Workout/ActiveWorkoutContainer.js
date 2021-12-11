import React, { useState, useEffect } from 'react'
import { getNextEvent } from '../../util/getNextEvent'
import { exerciseList } from '../../assets/data/exerciseList'
import { useWorkout } from '../../contexts/WorkoutContext'
import ActiveWorkout from './ActiveWorkout'
import TimerContainer from '../Timer/TimerContainer'
import '../../assets/styles/components/workout/active-workout.scss'

const WorkoutContainer = ({ workoutData, stopWorkout }) => {
  const [currIdx, setCurrIdx] = useState()
  const [currSet, setCurrSet] = useState()
  const [currRepsTotal, setCurrRepsTotal] = useState()
  const [currSetTotal, setCurrSetTotal] = useState()
  const [restTime, setRestTime] = useState()
  const [isTimer, setIsTimer] = useState()

  const [loading, setLoading] = useState(true)

  const [currExercise, setCurrExercise] = useState()
  const [currExerciseID, setCurrExerciseID] = useState()

  const [timerStart, setTimerStart] = useState(null)

  const { updateWorkout, getSingleWorkout } = useWorkout()

  const { isWorkoutRunning } = workoutData

  const finishWorkout = () => {
    console.log('workout finished')
  }

  const getCurrentExerciseID = idx => {
    const currExercise = workoutData.runningWorkout.currWorkout.path[idx]
    return currExercise.exerciseID
  }

  const completeSet = async () => {
    if (currSet === currSetTotal) {
      // If the last set of the last exercise is finished
      if (currIdx >= workoutData.runningWorkout.currWorkout.path.length - 1) {
        return finishWorkout()
      } else {
        setIsTimer(true)
        const startTime = new Date().getTime()
        console.log(startTime)
        setTimerStart(startTime)

        const nextIdx = currIdx + 1
        const nextSet = 1
        setCurrIdx(nextIdx)
        setCurrSet(nextSet)
        console.log('I MADE IT HERE, WHAT GIVES?')

        const nextExerciseID = getCurrentExerciseID(nextIdx)
        setCurrExerciseID(nextExerciseID)
        const currExerciseData = await getSingleWorkout(
          nextExerciseID,
          workoutData.weights
        )
        await setCurrExercise(currExerciseData)

        updateWorkout({
          'runningWorkout.remainingWorkout.currIdx': nextIdx,
          'runningWorkout.remainingWorkout.currSet': nextSet,
          'runningWorkout.timer.isTimer': true,
          'runningWorkout.timer.timerStart': startTime,
        })
      }
    } else {
      const startTime = new Date().getTime()
      console.log(startTime)
      setTimerStart(startTime)
      setIsTimer(true)

      const nextSet = currSet + 1
      setCurrSet(nextSet)

      updateWorkout({
        'runningWorkout.remainingWorkout.currSet': nextSet,
        'runningWorkout.timer.isTimer': true,
        'runningWorkout.timer.timerStart': startTime,
      })
    }
  }

  useEffect(() => {
    const setStates = async () => {
      setLoading(true)
      const currWorkoutData = workoutData.runningWorkout
      const currIdx = currWorkoutData.remainingWorkout.currIdx
      const currSet = currWorkoutData.remainingWorkout.currSet

      await setIsTimer(currWorkoutData.timer.isTimer)
      await setTimerStart(currWorkoutData.timer.timerStart)

      const currExercise = currWorkoutData.currWorkout.path[currIdx]

      const tempExerciseID = currExercise.exerciseID
      await setCurrExerciseID(tempExerciseID)
      const currExerciseData = await getSingleWorkout(
        tempExerciseID,
        workoutData.weights
      )
      await setCurrExercise(currExerciseData)
      console.log(currExercise)

      console.log(currExercise)
      await setCurrIdx(currIdx)
      await setCurrSet(currSet)
      await setCurrRepsTotal(currExercise.reps)
      console.log(currWorkoutData)
      await setCurrSetTotal(currExercise.sets)
      await setRestTime(currWorkoutData.currWorkout.restTime)
      setLoading(false)
    }
    if (isWorkoutRunning) {
      setStates()
    }
  }, [])

  return (
    <>
      {loading ? (
        'loading this page now, will it be weird?'
      ) : (
        <>
          {isTimer && timerStart ? (
            <TimerContainer
              timerStart={timerStart}
              restTime={restTime}
              setIsTimer={setIsTimer}
            />
          ) : (
            <ActiveWorkout
              currSet={currSet}
              currSetTotal={currSetTotal}
              completeSet={completeSet}
              currExercise={currExercise}
              currRepsTotal={currRepsTotal}
            />
          )}
          <button className='submit-btn' onClick={stopWorkout}>
            Stop Workout
          </button>
        </>
      )}
    </>
  )
}

export default WorkoutContainer
