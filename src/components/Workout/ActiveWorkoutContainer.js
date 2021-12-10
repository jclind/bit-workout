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
  const [currSetTotal, setCurrSetTotal] = useState()
  const [restTime, setRestTime] = useState()
  const [isTimer, setIsTimer] = useState()

  const [currExercise, setCurrExercise] = useState()

  const [timerStart, setTimerStart] = useState(null)

  const { updateWorkout } = useWorkout()

  const { isWorkoutRunning } = workoutData

  const finishWorkout = () => {
    console.log('workout finished')
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
    if (isWorkoutRunning) {
      const currWorkoutData = workoutData.runningWorkout
      const currIdx = currWorkoutData.remainingWorkout.currIdx
      const currSet = currWorkoutData.remainingWorkout.currSet

      setIsTimer(currWorkoutData.timer.isTimer)
      setTimerStart(currWorkoutData.timer.timerStart)

      setCurrExercise(currWorkoutData.currWorkout.path[currIdx])
      console.log(currWorkoutData.currWorkout.path[currIdx])
      setCurrIdx(currIdx)
      setCurrSet(currSet)
      console.log(currWorkoutData)
      setCurrSetTotal(currWorkoutData.currWorkout.path[currIdx].sets)
      setRestTime(currWorkoutData.currWorkout.restTime)
    }
  }, [])

  return (
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
        />
      )}
      <button className='submit-btn' onClick={stopWorkout}>
        Stop Workout
      </button>
    </>
  )
}

export default WorkoutContainer
