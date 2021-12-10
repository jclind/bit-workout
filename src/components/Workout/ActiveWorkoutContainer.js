import React, { useState, useEffect } from 'react'
import { getNextEvent } from '../../util/getNextEvent'
import { exerciseList } from '../../assets/data/exerciseList'
import { useWorkout } from '../../contexts/WorkoutContext'
import TimerContainer from '../Timer/TimerContainer'

const WorkoutContainer = ({ workoutData, stopWorkout }) => {
  const [currIdx, setCurrIdx] = useState()
  const [currSet, setCurrSet] = useState()
  const [currSetTotal, setCurrSetTotal] = useState()
  const [restTime, setRestTime] = useState()
  const [isTimer, setIsTimer] = useState()

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
          runningWorkout: {
            remainingWorkout: { currIdx: nextIdx, currSet: nextSet },
            timer: {
              isTimer: true,
              timerStart: startTime,
            },
          },
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
        runningWorkout: {
          remainingWorkout: { currSet: nextSet },
          timer: {
            isTimer: true,
            timerStart: startTime,
          },
        },
      })
    }
  }

  useEffect(() => {
    if (isWorkoutRunning) {
      const currWorkoutData = workoutData.runningWorkout
      const currIdx = currWorkoutData.remainingWorkout.currIdx
      const currSet = currWorkoutData.remainingWorkout.currSet

      setIsTimer(currWorkoutData.remainingWorkout.isTimer)
      setTimerStart(currWorkoutData.remainingWorkout.timerStart)

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
        <>
          <div>{`Current Set ${currSet} / ${currSetTotal}`}</div>
          <button className='submit-btn' onClick={completeSet}>
            Complete Set
          </button>
        </>
      )}
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
