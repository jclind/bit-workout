import React from 'react'

const Timer = ({ timerVal, skipRestBtn }) => {
  return (
    <div className='workout-timer'>
      <div className='timer-title'>Take a rest, you deserve it.</div>
      <div className='timer'>{timerVal}</div>
      <img
        src='/workouts/workout-rest.png'
        alt='Adorable sloths cuddling awwww <33333'
        className='rest-img'
      />
      <button className='skip-rest-btn' ref={skipRestBtn}>
        Skip Rest
      </button>
    </div>
  )
}

export default Timer
