import React, { useState, useEffect } from 'react'
import ActiveWorkout from './ActiveWorkout'
import TimerContainer from '../../Timer/TimerContainer'
import useSound from 'use-sound'
import timerFinishedSound from '../../../assets/sounds/timer-finished.mp3'
import './ActiveWorkout.scss'
import { connect } from 'react-redux'
import WorkoutPathModal from '../WorkoutPathModal/WorkoutPathModal'

const WorkoutContainer = ({
  isTimer,
  timerStart,
  currIdx,
  currSet,
  currWorkout,
}) => {
  const [isWorkoutPathModalOpen, setIsWorkoutPathModalOpen] = useState(false)

  const [play] = useSound(timerFinishedSound)

  useEffect(() => {
    if (!isTimer) {
      play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimer])
  return (
    <>
      {isTimer && timerStart ? (
        <TimerContainer
          timerStart={timerStart}
          setIsWorkoutPathModalOpen={setIsWorkoutPathModalOpen}
        />
      ) : (
        <ActiveWorkout
          setIsWorkoutPathModalOpen={setIsWorkoutPathModalOpen}
          currWorkout={currWorkout}
        />
      )}
      {isWorkoutPathModalOpen ? (
        <WorkoutPathModal
          onClose={() => {
            setIsWorkoutPathModalOpen(false)
          }}
        />
      ) : null}
    </>
  )
}

const mapStateToProps = state => {
  const runningWorkout = state.workout.workoutData.runningWorkout
  const timer = runningWorkout.timer
  console.log(state.workout.workoutData.runningWorkout)
  console.log(state.workout.workoutData.runningWorkout.currWorkout.path)
  return {
    isTimer: timer.isTimer,
    timerStart: timer.timerStart,
    currSetIdx: runningWorkout.remainingWorkout.currSet,
    currIdx: runningWorkout.remainingWorkout.currIdx,
    currWorkout: runningWorkout.currWorkout,
  }
}

export default connect(mapStateToProps, null)(WorkoutContainer)
