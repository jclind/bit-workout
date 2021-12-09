import React from 'react'
import TimerContainer from '../Timer/TimerContainer'

const ActiveWorkout = ({
  setIsTimer,
  workoutFinished,
  currEvent,
  isTimer,
  restTime,
  currSet,
  currExerciseData,
}) => {
  const { animation, imageURL, name } = currExerciseData
  console.log(animation, imageURL, name)
  return (
    <div className='App'>
      <div className='exercise'>
        {workoutFinished ? (
          <span>Workout Finished, Good Job!</span>
        ) : currEvent && !isTimer ? (
          <>
            <img src={imageURL} alt={name} />
            <div>
              {name}, Set {currSet}
            </div>
          </>
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

export default ActiveWorkout
