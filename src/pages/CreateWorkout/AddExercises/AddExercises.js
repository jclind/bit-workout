import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  AiOutlinePlusCircle,
  AiOutlineMenu,
  AiOutlineWarning,
} from 'react-icons/ai'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import { v4 as uuidv4 } from 'uuid'
import './AddExercises.scss'
import ExerciseItem from './ExerciseItem'

const AddExercises = () => {
  const [addedExercises, setAddedExercises] = useState([])
  const addExercise = () => {
    setAddedExercises([
      ...addedExercises,
      {
        exercise: null,
        reps: null,
        sets: null,
        restTime: null,
        failedRestTime: null,
        description: null,
        path: null,
        id: uuidv4(),
      },
    ])
  }
  const setExerciseData = (prop, val, id) => {
    const updatedAddedExercises = [...addedExercises]
    const exerciseIdx = addedExercises.findIndex(ex => ex.id === id)
    updatedAddedExercises[exerciseIdx][prop] = val
    setAddedExercises(updatedAddedExercises)
  }
  return (
    <div className='create-workout-page add-exercises'>
      <BackButton />
      <div className='title'>Add Exercises</div>

      <div className='added-exercises-container'>
        {addedExercises.map(ex => {
          return (
            <ExerciseItem
              key={ex.id}
              exerciseData={ex}
              setExerciseData={setExerciseData}
            />
          )
        })}
      </div>
      <button type='button' className='add-exercise-btn' onClick={addExercise}>
        <AiOutlinePlusCircle className='icon' /> <span>Add Exercise</span>
      </button>
    </div>
  )
}

export default AddExercises
