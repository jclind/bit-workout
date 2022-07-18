import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ExerciseTypeDropdown from '../ExerciseTypeDropdown/ExerciseTypeDropdown'
import './ExercisePath.scss'

const PathItem = ({ path, set, idx, setPathData }) => {
  const setReps = e => {
    const path = 'reps'
    const newVal = e.target.value

    if (newVal === '') return setPathData(path, '', idx)
    else if (isNaN(newVal) || newVal === '0') return
    if (newVal > 999) return

    setPathData(path, newVal, idx)
  }
  // const setWeight = e => {
  //   const path =
  // }

  // ! Need a better system for weight. Maybe add different kinds of exercises (Increase weight (by amount per set), decrease weight, stay the same, high rep) Maybe by percentage of max weight lifted per workout?

  return (
    <div className='path-item'>
      <label className='set-label'>Set {idx + 1}</label>
      <div className='reps'>
        <input
          className='reps-input'
          value={set.reps || ''}
          placeholder='8'
          type='number'
          onChange={setReps}
        />
        <label className='reps-label'>Reps</label>
      </div>

      <div className='weight'>
        <input
          className='weight-input'
          value={set.weight || ''}
          placeholder='45'
          type='number'
        />
        <label className='weight-label'>Lbs</label>
      </div>
    </div>
  )
}

const ExercisePath = () => {
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
    <div className='exercise-path'>
      <div className='exercise-type-selector'>
        <ExerciseTypeDropdown />
      </div>
      <div className='list'>
        {path.map((set, idx) => {
          return (
            <PathItem
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
    </div>
  )
}

export default ExercisePath
