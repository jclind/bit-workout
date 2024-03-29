import React, { useState, useEffect, useRef } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import { v4 as uuidv4 } from 'uuid'
import './AddExercises.scss'
import ExerciseItem from './ExerciseItem'
import { useNavigate } from 'react-router-dom'

const AddExercises = () => {
  const exerciseItemTemplate = {
    exerciseID: null,
    description: '',
    sets: null,
    type: null,
    id: uuidv4(),
    error: '',
  }
  const [addedExercises, setAddedExercises] = useState(() => {
    const createWorkoutData = JSON.parse(
      localStorage.getItem('createWorkoutData')
    )
    if (createWorkoutData && createWorkoutData.addedExercises) {
      return createWorkoutData.addedExercises
    }

    return [
      {
        ...exerciseItemTemplate,
      },
    ]
  })

  const [showErrors, setShowErrors] = useState(false) // Only show errors on next button click

  const [addExerciseError, setAddExerciseError] = useState('')

  const titleRef = useRef()
  const navigate = useNavigate()

  const addExercise = () => {
    if (addedExercises.length >= 15) {
      setShowErrors(true)
      setAddExerciseError('Only 15 Exercises Are Allowed Per Workout')
      return titleRef.current.scrollIntoView()
    }
    setAddedExercises([
      ...addedExercises,
      {
        ...exerciseItemTemplate,
      },
    ])
  }
  const deleteExercise = id => {
    setAddedExercises(addedExercises.filter(ex => ex.id !== id))
  }
  const clearExercises = () => {
    setAddedExercises([
      {
        ...exerciseItemTemplate,
      },
    ])
  }

  const saveAddedExercises = arr => {
    const createWorkoutData = JSON.parse(
      localStorage.getItem('createWorkoutData')
    )
    if (arr.length <= 0) {
      localStorage.setItem(
        'createWorkoutData',
        JSON.stringify({ ...createWorkoutData, addedExercises: [] })
      )
    } else {
      localStorage.setItem(
        'createWorkoutData',
        JSON.stringify({ ...createWorkoutData, addedExercises: arr })
      )
    }
  }

  useEffect(() => {
    saveAddedExercises(addedExercises)
  }, [addedExercises])

  const setExerciseData = (prop, val, id) => {
    setShowErrors(false)
    setAddExerciseError('')
    const updatedAddedExercises = [...addedExercises]
    const exerciseIdx = addedExercises.findIndex(ex => ex.id === id)
    updatedAddedExercises[exerciseIdx][prop] = val
    setAddedExercises(updatedAddedExercises)
  }

  const handleNextClick = () => {
    let isError = false
    setShowErrors(false)
    setAddExerciseError('')

    if (addedExercises.length <= 0) {
      isError = true
      setAddExerciseError('Please Add At Least One Exercise')
    }

    const addedExercisesError = addedExercises.map(ex => {
      if (ex.exerciseID !== 0 && !ex.exerciseID) {
        return { ...ex, error: 'Please Select Exercise' }
      } else if (!ex.type) {
        return { ...ex, error: 'Please Select Exercise Type' }
      }
      return ex
    })
    addedExercisesError.forEach(ex => {
      if (ex.error) {
        isError = true
      }
    })
    if (isError) {
      setShowErrors(true)

      setAddedExercises(addedExercisesError)

      return titleRef.current.scrollIntoView()
    }
    navigate('/create-workout/rest-time', { state: { prev: 'add-exercises' } })
  }
  return (
    <div className='create-workout-page add-exercises'>
      <BackButton link='/workout' />
      <div className='title' ref={titleRef}>
        Add Exercises
      </div>

      {addExerciseError && <div className='error'>{addExerciseError}</div>}

      <div className='added-exercises-container'>
        {addedExercises.map((ex, idx) => {
          return (
            <ExerciseItem
              key={ex.id}
              exerciseData={ex}
              setExerciseData={setExerciseData}
              showErrors={showErrors}
              deleteExercise={deleteExercise}
              idx={idx}
            />
          )
        })}
      </div>
      <div className='clear-exercises-container'>
        {addedExercises.length > 0 && (
          <button className='clear-exercises-btn' onClick={clearExercises}>
            Clear All
          </button>
        )}
      </div>
      <button type='button' className='add-exercise-btn' onClick={addExercise}>
        <AiOutlinePlusCircle className='icon' /> <span>Add Exercise</span>
      </button>
      <button className='next-btn' onClick={handleNextClick}>
        NEXT
      </button>
    </div>
  )
}

export default AddExercises
