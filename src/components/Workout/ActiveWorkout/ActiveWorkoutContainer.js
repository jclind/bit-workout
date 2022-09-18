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
  currWorkout,
  isChime,
  currExerciseIdx,
  currSetIdx,
  weights,
}) => {
  const [isWorkoutPathModalOpen, setIsWorkoutPathModalOpen] = useState(false)

  useEffect(() => {
    function preventDefault(e) {
      e.preventDefault()
    }

    function disableScroll() {
      document.body.addEventListener('touchmove', preventDefault, {
        passive: false,
      })
    }
    function enableScroll() {
      document.body.removeEventListener('touchmove', preventDefault, {
        passive: true,
      })
    }
    if (isWorkoutPathModalOpen) {
      disableScroll()
      console.log('disabled')
    } else {
      enableScroll()
      console.log('enabled')
    }
  }, [isWorkoutPathModalOpen])

  const [play] = useSound(timerFinishedSound)

  useEffect(() => {
    if (!isTimer && isChime) {
      play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimer])

  const currExerciseType = currWorkout?.path[currExerciseIdx]?.type
  return (
    <>
      {isTimer && timerStart && currExerciseType !== 'drop' ? (
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
          workout={currWorkout}
          currExerciseIdx={currExerciseIdx}
          currSetIdx={currSetIdx}
          weights={weights}
        />
      ) : null}
    </>
  )
}

const mapStateToProps = state => {
  const runningWorkout = state.workout.workoutData.runningWorkout
  const timer = runningWorkout.timer
  const workoutSettings = state.auth.userAccountData?.settings?.workout
  const isChime = workoutSettings ? workoutSettings.isChime : true
  return {
    isTimer: timer.isTimer,
    timerStart: timer.timerStart,
    currWorkout: runningWorkout.currWorkout,
    isChime,
    currSetIdx: runningWorkout.remainingWorkout.currSet,
    currExerciseIdx: runningWorkout.remainingWorkout.currIdx,
    weights: state.workout.workoutData.weights,
  }
}

export default connect(mapStateToProps)(WorkoutContainer)
