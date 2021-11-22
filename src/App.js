import React, { useState, useEffect } from 'react'

import { e1 } from './assets/data/e1'
import { formatTime } from './util/formatTime'
import TimerContainer from './components/Timer/TimerContainer'

function App() {
  const data = e1
  const restTime = data.restTime

  const [currEvent, setCurrEvent] = useState(null)
  const [isTimer, setIsTimer] = useState(false)

  useEffect(() => {
    if (!isTimer) {
      console.log('Timer is not running')
      getNextEvent(currEvent, data, setCurrEvent)
    }
  }, [isTimer])

  const getNextEvent = (currEvent, dataArr, setCurrEvent) => {
    // Declare var for the next event element
    let nextEvent
    // If currEvents is null, meaning it doesn't exist, nextEvent will be set to the first workout.
    if (!currEvent) {
      nextEvent = dataArr.path[0]
      console.log('currEvents didnt exist', nextEvent)
    } else {
      console.log(currEvent)
      console.log(data.path[0].id)
      // Get id of current event
      const currEventId = currEvent.id
      // Get next event using id of current event
      nextEvent = dataArr.path.find(ex => ex.id === currEventId + 1)
      console.log('currEvents did exist', currEvent, nextEvent)
    }
    // Console log if nextEvent doesn't exist meaning there are no more elements
    if (!nextEvent) {
      console.log('No more exercises!')
    } else {
      // Set the current event to the next event
      setCurrEvent(nextEvent)
    }
  }

  return (
    <div className='App'>
      <div className='exercise'>
        {currEvent && !isTimer ? (
          <span>{currEvent.name}</span>
        ) : (
          <span>REST</span>
        )}
      </div>
      {/* <div className='timer'>{isTimer ? <div>{timerVal}</div> : null}</div> */}
      {isTimer ? (
        <TimerContainer restTime={restTime} setIsTimer={setIsTimer} />
      ) : null}
      {!isTimer ? (
        <button onClick={() => setIsTimer(true)}>CLICK ME!!!!</button>
      ) : null}
    </div>
  )
}

export default App
