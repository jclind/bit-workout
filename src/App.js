import React, { useState, useEffect } from 'react'

import { e1 } from './assets/data/e1'
import { getNextEvent } from './util/getNextEvent'
import TimerContainer from './components/Timer/TimerContainer'

function App() {
  const data = e1
  const restTime = data.restTime

  const [currEvent, setCurrEvent] = useState(null)
  const [currSet, setCurrSet] = useState(1)
  const [isTimer, setIsTimer] = useState(false)

  const [workoutFinished, setWorkoutFinished] = useState(false)

  useEffect(() => {
    if (!isTimer) {
      console.log('Timer is not running')
      if (!currEvent) {
        getNextEvent(currEvent, data, setCurrEvent, setWorkoutFinished)
      } else if (currSet >= currEvent.sets) {
        getNextEvent(currEvent, data, setCurrEvent, setWorkoutFinished)
        setCurrSet(1)
      } else {
        setCurrSet(currSet + 1)
      }
    }
  }, [isTimer])

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

export default App
