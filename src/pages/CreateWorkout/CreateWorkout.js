import React, { useEffect, useState, useRef } from 'react'
import FormInput from '../../components/FormInput/FormInput'
import BackButton from '../../components/SettingsComponents/BackButton/BackButton'
import {
  AiOutlinePlusCircle,
  AiOutlineMenu,
  AiOutlineWarning,
} from 'react-icons/ai'
import AddedExerciseItemContainer from '../../components/CreateWorkout/AddedExerciseItem/AddedExerciseItemContainer'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import './CreateWorkout.scss'
import { TailSpin } from 'react-loader-spinner'

const ExerciseItem = ({
  item,
  idx,
  changeAddedExerciseData,
  deleteAddedExercise,
}) => {
  return (
    <Draggable key={item.id} draggableId={`draggable-${idx}`} index={idx}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className='add-exercise-drag-container'
        >
          <div className='handle-icon-container' {...provided.dragHandleProps}>
            <AiOutlineMenu className='icon handle-icon' />
          </div>
          <AddedExerciseItemContainer
            item={item}
            className={snapshot.isDraggingOver && 'dragging'}
            changeAddedExerciseData={changeAddedExerciseData}
            deleteAddedExercise={deleteAddedExercise}
          />
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  )
}

const CreateWorkout = ({
  titleRef,
  handleCreateWorkoutSubmit,
  workoutName,
  setWorkoutName,
  workoutDescription,
  setWorkoutDescription,
  restTimeMinutes,
  setRestTimeMinutes,
  restTimeSeconds,
  setRestTimeSeconds,
  failedRestTimeMinutes,
  setFailedRestTimeMinutes,
  failedRestTimeSeconds,
  setFailedRestTimeSeconds,
  addedExercises,
  setAddedExercises,
  changeAddedExerciseData,
  deleteAddedExercise,
  addExercise,
  error,
  loading,
}) => {
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

    setAddedExercises(items)
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
                const num = Number(val)
                if (num % 1 !== 0) return
                if (num > 20) return
                setRestTimeMinutes(num)
              }}
            />
            <FormInput
              placeholder='Seconds'
              inputType='number'
              val={restTimeSeconds}
              setVal={val => {
                const num = Number(val)
                if (num % 1 !== 0) return
                if (num >= 60) return
                setRestTimeSeconds(num)
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
                const num = Number(val)
                if (num % 1 !== 0) return
                if (num > 20) return
                setFailedRestTimeMinutes(num)
              }}
            />
            <FormInput
              placeholder='Seconds'
              inputType='number'
              val={failedRestTimeSeconds}
              setVal={val => {
                const num = Number(val)
                if (num % 1 !== 0) return
                if (num >= 60) return
                setFailedRestTimeSeconds(num)
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
                      return (
                        <ExerciseItem
                          item={item}
                          idx={idx}
                          changeAddedExerciseData={changeAddedExerciseData}
                          deleteAddedExercise={deleteAddedExercise}
                        />
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
        <button type='submit' className='submit-btn btn' disabled={loading}>
          {loading ? (
            <TailSpin
              height='30'
              width='30'
              color='white'
              arialLabel='loading'
              className='spinner'
            />
          ) : (
            'Create Workout'
          )}
        </button>
      </form>
      <BackButton />
    </div>
  )
}

export default CreateWorkout
