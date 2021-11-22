import React, { useState, useEffect } from 'react'

import { e1 } from './assets/data/e1'
import { formatTime } from './util/formatTime'

function App() {
  const data = e1
  const restTime = data.restTime

  const [currEvent, setCurrEvent] = useState(null)
  const [isTimer, setIsTimer] = useState(false)
  const [timerVal, setTimerVal] = useState()

  useEffect(() => {
    if (!isTimer) {
      console.log('Timer is not running')
      getNextEvent(currEvent, data, setCurrEvent)
    } else {
      console.log('Timer is running')
      // Get time of timer start
      const start = new Date().getTime()

      let timer = setInterval(() => {
        // Get current time and subtrack start time to get total elapsed time
        const elapsed = new Date().getTime() - start
        // Format elapsed time to milliseconds
        const elapsedMS = Math.round(elapsed / 1000) * 1000
        // Get time left on timer
        const timeLeft = restTime - elapsedMS

        setTimerVal(formatTime(timeLeft))
        if (timeLeft <= 0) {
          clearInterval(timer)
          setIsTimer(false)
        }
      }, 100)
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
      <div className='timer'>{isTimer ? <div>{timerVal}</div> : null}</div>
      {!isTimer ? (
        <button onClick={() => setIsTimer(true)}>CLICK ME!!!!</button>
      ) : null}
    </div>
  )
}

export default App
