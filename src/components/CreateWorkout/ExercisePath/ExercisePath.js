import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './ExercisePath.scss'

const PathItem = () => {
  return <div className='path-item'></div>
}

const ExercisePath = () => {
  const [path, setPath] = useState([])

  const handleAddSet = () => {
    setPath([
      ...path,
      {
        weight: null,
        reps: null,
        id: uuidv4(),
      },
    ])
  }

  return (
    <div className='exercise-path'>
      <div className='list'>
        {path.map((set, idx) => {
          return <PathItem key={set.id} idx={idx} set={set} />
        })}
      </div>
      <div className='options'>
        <button className='add-set-btn' onClick={handleAddSet}>
          Add Set
        </button>
      </div>
    </div>
  )
}

export default ExercisePath
