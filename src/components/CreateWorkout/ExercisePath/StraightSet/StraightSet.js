import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import StraightSetPathItem from './StraightSetPathItem'

const StraightSet = () => {
  const [path, setPath] = useState([
    {
      weight: null,
      reps: null,
      id: uuidv4(),
    },
  ])
  const handleAddSet = () => {
    const prevSet = path[path.length - 1]
    const reps = prevSet && prevSet.reps ? prevSet.reps : null
    const weight = prevSet && prevSet.weight ? prevSet.weight : null
    setPath([
      ...path,
      {
        weight,
        reps,
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
    <>
      <div className='list'>
        {path.map((set, idx) => {
          return (
            <StraightSetPathItem
              key={set.id}
              path={path}
              idx={idx}
              set={set}
              setPathData={setPathData}
            />
          )
        })}
      </div>
      <div className='options'>
        <button className='add-set-btn' onClick={handleAddSet}>
          Add Set
        </button>
      </div>
    </>
  )
}

export default StraightSet
