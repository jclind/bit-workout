import React, { useEffect, useState } from 'react'
import TimerSetItem from './TimerSetItem'
import { v4 as uuidv4 } from 'uuid'
import './TimerSet.scss'

const TimerSet = ({ setExercisePath }) => {
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
  const removeSet = id => {
    setPath(path.filter(set => set.id !== id))
  }
  const setPathData = (prop, val, idx) => {
    const updatedPath = [...path]
    updatedPath[idx][prop] = val
    setPath(updatedPath)
  }

  const checkForError = path => {
    const response = { error: '' }

    if (path.length <= 0) {
      response.error = 'Please Enter At Least One Set'
    }

    path.every(set => {
      if (!set.time.minutes && !set.time.seconds)
        response.error = 'Please Enter Minutes Or Seconds'
      else if (!set.weight) response.error = 'Please Enter Weight'
      else if (Number(set.weight) % 5 !== 0)
        response.error = 'Weight Must Be A Multiple Of 5'

      if (response.error) return false

      return true
    })

    return response
  }

  useEffect(() => {
    const { error } = checkForError(path)

    if (error) {
      console.log(error)
    } else {
      console.log(path)
    }
  }, [path])

  return (
    <div className='timer-set list'>
      {path.map((set, idx) => {
        return (
          <TimerSetItem
            key={set.id}
            idx={idx}
            set={set}
            setPathData={setPathData}
            removeSet={removeSet}
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
