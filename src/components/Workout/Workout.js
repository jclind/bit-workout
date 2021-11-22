import React from 'react'
import TimerContainer from '../Timer/TimerContainer'

const Workout = ({
  setIsTimer,
  workoutFinished,
  currEvent,
  isTimer,
  restTime,
  currSet,
}) => {
  return (
    <div className='App'>
      <div className='exercise'>
        {workoutFinished ? (
          <span>Workout Finished, Good Job!</span>
        ) : currEvent && !isTimer ? (
          <span>
            {currEvent.name}, Set {currSet}
          </span>
        ) : (
          <span>REST</span>
        )}
      </div>
      {isTimer ? (
        <TimerContainer restTime={restTime} setIsTimer={setIsTimer} />
      ) : null}
      {!isTimer && !workoutFinished ? (
        <button onClick={() => setIsTimer(true)}>CLICK ME!!!!</button>
      ) : null}
    </div>
  )
}

export default Workout
