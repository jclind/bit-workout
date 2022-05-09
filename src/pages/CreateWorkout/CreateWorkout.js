import React, { useState } from 'react'
import FormInput from '../../components/FormInput/FormInput'
import BackButton from '../../components/SettingsComponents/BackButton/BackButton'
import { AiOutlinePlusCircle, AiOutlineMenu } from 'react-icons/ai'
import AddedExerciseItem from '../../components/CreateWorkout/AddedExerciseItem/AddedExerciseItem'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { v4 as uuidv4 } from 'uuid'
import './CreateWorkout.scss'

const CreateWorkout = () => {
  const [workoutName, setWorkoutName] = useState('')
  const [restTimeMinutes, setRestTimeMinutes] = useState('')
  const [restTimeSeconds, setRestTimeSeconds] = useState('')

  const [failedRestTimeMinutes, setFailedRestTimeMinutes] = useState('')
  const [failedRestTimeSeconds, setFailedRestTimeSeconds] = useState('')

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

  return (
    <div className='create-workout page'>
      <div className='settings-title'>Create Workout</div>
      <form className='create-workout-form'>
        <div className='name-input-container'>
          <div className='label'>Workout Name:</div>
          <FormInput
            val={workoutName}
            setVal={setWorkoutName}
            placeholder={'Enter Name'}
          />
        </div>
        <div className='rest-time'>
          <div className='label'>Rest Between Sets</div>
          <div className='inputs-container'>
            <FormInput
              placeholder='Minutes'
              inputType='number'
              val={restTimeMinutes}
              setVal={setRestTimeMinutes}
            />
            <FormInput
              placeholder='Seconds'
              inputType='number'
              val={restTimeSeconds}
              setVal={setRestTimeSeconds}
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
              setVal={setFailedRestTimeMinutes}
            />
            <FormInput
              placeholder='Seconds'
              inputType='number'
              val={failedRestTimeSeconds}
              setVal={setFailedRestTimeSeconds}
            />
          </div>
        </div>
        <div className='workout-path'>
          <div className='title'>Workout Path:</div>
          <DragDropContext onDragEnd={onDragEnd}>
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
                              className={snapshot.isDraggingOver && 'dragging'}
                              changeAddedExerciseData={changeAddedExerciseData}
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
      </form>
      <BackButton />
    </div>
  )
}

export default CreateWorkout
