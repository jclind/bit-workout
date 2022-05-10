import React, { useEffect, useState, useRef } from 'react'
import FormInput from '../../components/FormInput/FormInput'
import BackButton from '../../components/SettingsComponents/BackButton/BackButton'
import {
  AiOutlinePlusCircle,
  AiOutlineMenu,
  AiOutlineWarning,
} from 'react-icons/ai'
import AddedExerciseItem from '../../components/CreateWorkout/AddedExerciseItem/AddedExerciseItem'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'
import './CreateWorkout.scss'

const CreateWorkout = () => {
  const titleRef = useRef()
  const [error, setError] = useState('')
  // Scroll to top of page if there is an error
  useEffect(() => {
    if (error && titleRef.current) {
      titleRef.current.scrollIntoView()
    }
  }, [error])

  const [workoutName, setWorkoutName] = useState('')
  const [workoutDescription, setWorkoutDescription] = useState('')

  const [restTimeMS, setRestTimeMS] = useState('')
  const [restTimeMinutes, setRestTimeMinutes] = useState('')
  const [restTimeSeconds, setRestTimeSeconds] = useState('')

  // When restTime Minutes or Seconds changes, set totalTestTime to the total time in seconds
  useEffect(() => {
    setRestTimeMS((restTimeMinutes * 60 + restTimeSeconds) * 1000)
  }, [restTimeMinutes, restTimeSeconds])

  const [failedRestTimeMS, setFailedRestTimeMS] = useState('')
  const [failedRestTimeMinutes, setFailedRestTimeMinutes] = useState('')
  const [failedRestTimeSeconds, setFailedRestTimeSeconds] = useState('')
  // When failedRestTime Minutes or Seconds changes, set totalFailedRestTime to the total time in seconds
  useEffect(() => {
    setFailedRestTimeMS(
      (failedRestTimeMinutes * 60 + failedRestTimeSeconds) * 1000
    )
  }, [failedRestTimeMinutes, failedRestTimeSeconds])

  const [searchExerciseVal, setSearchExerciseVal] = useState('')

  const [addedExercises, setAddedExercises] = useState([])

  const changeAddedExerciseData = (data, id) => {
    const currAddedExercisesData = [...addedExercises]

    const addedExerciseIdx = addedExercises.findIndex(ex => ex.id === id)

    currAddedExercisesData[addedExerciseIdx] = {
      ...currAddedExercisesData[addedExerciseIdx],
      ...data,
    }

    setAddedExercises(currAddedExercisesData)
  }
  const deleteAddedExercise = id => {
    setAddedExercises(addedExercises.filter(ex => ex.id !== id))
  }

  const addExercise = () => {
    setAddedExercises([
      ...addedExercises,
      { exercise: null, reps: null, sets: null, id: uuidv4() },
    ])
  }

  // Help reordering addedExercise list dragged items
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }
  const onDragEnd = res => {
    // `destination` is `undefined` if the item was dropped outside the list
    // In this case, do nothing
    if (!res.destination) {
      return
    }

    const items = reorder(
      addedExercises,
      res.source.index,
      res.destination.index
    )

    console.log(items)

    setAddedExercises(items)
  }

  const handleCreateWorkoutSubmit = e => {
    e.preventDefault()
    setError('')

    if (!workoutName) return setError('Please Enter Workout Name')
    if (addedExercises.length <= 0)
      return setError('Please Add Exercise To Workout Path')

    let allExercisesValid = true
    // Check that every addedExercise has all fields selected
    addedExercises.forEach(ex => {
      if (
        !ex.exercise ||
        !ex.reps ||
        ex.reps === 0 ||
        !ex.sets ||
        ex.sets === 0
      )
        return (allExercisesValid = false)
    })
    if (!allExercisesValid)
      return setError('Please Fill All Exercise Path Fields In Workout Path')
  }

  return (
    <div className='create-workout page'>
      <div className='settings-title' ref={titleRef}>
        Create Workout
      </div>
      <form
        className='create-workout-form'
        onSubmit={handleCreateWorkoutSubmit}
      >
        {error && (
          <div className='form-error'>
            <AiOutlineWarning className='icon' />
            {error}
          </div>
        )}
        <div className='name-input-container'>
          <div className='label'>Workout Name:</div>
          <FormInput
            val={workoutName}
            setVal={setWorkoutName}
            placeholder={'Enter Name'}
          />
        </div>
        <div className='description-input-container'>
          <div className='label'>Workout Description:</div>
          <FormInput
            val={workoutDescription}
            setVal={setWorkoutDescription}
            placeholder={'Enter Description'}
            required={false}
            textarea={true}
          />
        </div>
        <div className='rest-time'>
          <div className='label'>Rest Between Sets</div>
          <div className='inputs-container'>
            <FormInput
              placeholder='Minutes'
              inputType='number'
              val={restTimeMinutes}
              setVal={val => {
                if (val % 1 !== 0) return
                if (val > 20) return
                setRestTimeMinutes(val)
              }}
            />
            <FormInput
              placeholder='Seconds'
              inputType='number'
              val={restTimeSeconds}
              setVal={val => {
                if (val % 1 !== 0) return
                if (val >= 60) return
                setRestTimeSeconds(val)
              }}
            />
          </div>
        </div>
        <div className='fail-set-rest-time'>
          <div className='label'>Rest Between Failed Sets</div>
          <div className='inputs-container'>
            <FormInput
              placeholder='Minutes'
              inputType='number'
              val={failedRestTimeMinutes}
              setVal={val => {
                if (val % 1 !== 0) return
                if (val > 20) return
                setFailedRestTimeMinutes(val)
              }}
            />
            <FormInput
              placeholder='Seconds'
              inputType='number'
              val={failedRestTimeSeconds}
              setVal={val => {
                if (val % 1 !== 0) return
                if (val >= 60) return
                setFailedRestTimeSeconds(val)
              }}
            />
          </div>
        </div>
        <div className='workout-path'>
          <div className='title'>Workout Path:</div>
          <DragDropContext onDragEnd={onDragEnd}>
            {addedExercises.length > 0 && (
              <Droppable key={'droppable-key'} droppableId='droppable'>
                {(provided, snapshot) => (
                  <div
                    key={'droppable-key-div'}
                    ref={provided.innerRef}
                    className={
                      snapshot.isDraggingOver
                        ? 'added-exercises-container dragging'
                        : 'added-exercises-container'
                    }
                    {...provided.droppableProps}
                  >
                    {addedExercises.map((item, idx) => {
                      console.log(item)
                      return (
                        <Draggable
                          key={item.id}
                          draggableId={`draggable-${idx}`}
                          index={idx}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className='add-exercise-drag-container'
                            >
                              <div
                                className='handle-icon-container'
                                {...provided.dragHandleProps}
                              >
                                <AiOutlineMenu className='icon handle-icon' />
                              </div>
                              <AddedExerciseItem
                                item={item}
                                className={
                                  snapshot.isDraggingOver && 'dragging'
                                }
                                changeAddedExerciseData={
                                  changeAddedExerciseData
                                }
                                deleteAddedExercise={deleteAddedExercise}
                              />
                              {provided.placeholder}
                            </div>
                          )}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )}
          </DragDropContext>
          <div className='select-exercise-container'>
            <button
              type='button'
              className='select-exercise'
              onClick={addExercise}
            >
              <AiOutlinePlusCircle className='icon' /> <span>Add Exercise</span>
            </button>
          </div>
        </div>
        <button type='submit' className='submit-btn btn'>
          Create Workout
        </button>
      </form>
      <BackButton />
    </div>
  )
}

export default CreateWorkout
