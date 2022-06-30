import React from 'react'
import { AiOutlineRight } from 'react-icons/ai'

const Timer = ({
  timerVal,
  skipRestBtn,
  lastSetFailed,
  setIsWorkoutPathModalOpen,
}) => {
  return (
    <div className='workout-timer'>
      <div className='timer-title'>
        {lastSetFailed
          ? 'Without failure there is no success.'
          : 'Take a rest, you deserve it.'}
      </div>
      <div className='timer'>{timerVal}</div>
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
      <button className='skip-rest-btn' ref={skipRestBtn}>
        Skip Rest
      </button>
    </div>
  )
}

export default Timer
