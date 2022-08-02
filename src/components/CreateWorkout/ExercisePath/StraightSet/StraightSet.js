import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import StraightSetPathItem from './StraightSetPathItem'

const StraightSet = ({ exercisePath, setExercisePath, setError }) => {
  const pathTemplate = { reps: null, id: uuidv4() }
  const [path, setPath] = useState(
    exercisePath.length > 0
      ? exercisePath
      : [
          {
            ...pathTemplate,
          },
        ]
  )

  const handleAddSet = () => {
    const prevSet = path[path.length - 1]
    setPath([
      ...path,
      {
        ...pathTemplate,
        reps: prevSet && prevSet.reps ? prevSet.reps : null,
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
      if (!set.reps) response.error = 'Please Enter Number Of Reps'

      if (response.error) return false

      return true
    })

    return response
  }
  useEffect(() => {
    const { error } = checkForError(path)

    if (error) {
      setError(error)
    } else {
      setError('')
    }
    setExercisePath(path)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  return (
    <>
      <div className='list'>
        {path.map((set, idx) => {
          return (
            <StraightSetPathItem
              key={set.id}
              idx={idx}
              set={set}
              setPathData={setPathData}
              removeSet={removeSet}
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
