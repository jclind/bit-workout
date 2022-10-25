import React from 'react'
import { AiOutlineRight } from 'react-icons/ai'

const Timer = ({
  timerVal,
  skipRestBtn,
  lastSetFailed,
  setIsWorkoutPathModalOpen,
  exerciseName,
}) => {
  return (
    <div className='workout-timer'>
      <div
        className={`exercise-title${
          exerciseName.length >= 34
            ? ' xsm-text'
            : exerciseName.length >= 28
            ? ' sm-text'
            : ''
        }`}
      >
        {exerciseName}
      </div>
      <div className='timer-title'>
        {lastSetFailed
          ? 'Without failure there is no success.'
          : 'Take a rest, you deserve it.'}
      </div>
      <div className='timer'>{timerVal || '1:30'}</div>
      <div className='center-content'>
        <img
          src='/workouts/workout-rest.png'
          alt='Adorable sloths cuddling awwww <33333'
          className='rest-img'
        />
        <button
          className='view-workout-path'
          onClick={() => setIsWorkoutPathModalOpen(true)}
        >
          Workout Path <AiOutlineRight className='icon' />
        </button>
      </div>
      <div className='options'>
        <button className='skip-rest-btn' ref={skipRestBtn}>
          Skip Rest
        </button>
      </div>
    </div>
  )
}

export default Timer
