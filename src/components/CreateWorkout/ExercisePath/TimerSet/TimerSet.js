import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import TimerSetItem from './TimerSetItem'
import './TimerSet.scss'

const TimerSet = () => {
  const [path, setPath] = useState([
    {
      weight: null,
      time: { minutes: null, seconds: null },
      id: uuidv4(),
    },
  ])

  const handleAddSet = () => {
    const prevSet = path[path.length - 1]
    const minutes =
      prevSet && prevSet.time.minutes ? prevSet.time.minutes : null
    const seconds =
      prevSet && prevSet.time.seconds ? prevSet.time.seconds : null
    const weight = prevSet && prevSet.weight ? prevSet.weight : null

    setPath([
      ...path,
      {
        weight,
        time: { minutes, seconds },
        id: uuidv4(),
      },
    ])
  }
  const setPathData = (prop, val, idx) => {
    const updatedPath = [...path]
    updatedPath[idx][prop] = val
    setPath(updatedPath)
  }

  return (
    <div className='timer-set list'>
      {path.map((set, idx) => {
        return (
          <TimerSetItem
            key={set.id}
            path={path}
            idx={idx}
            set={set}
            setPathData={setPathData}
          />
        )
      })}
      <div className='options'>
        <button className='add-set-btn' onClick={handleAddSet}>
          Add Set
        </button>
      </div>
    </div>
  )
}

export default TimerSet
