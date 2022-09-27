import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { exerciseList } from '../../../assets/data/exerciseList'
import useClickOutside from '../../../util/useClickOutside'
import {
  AiOutlinePlusCircle,
  AiOutlineClose,
  AiOutlineWarning,
} from 'react-icons/ai'
import './WorkoutPathModal.scss'
import AddExerciseToWorkoutModal from '../AddExerciseToWorkoutModal/AddExerciseToWorkoutModal'
import ConfirmRemoveExerciseModal from '../ChangeWeightModal/ConfirmRemoveExerciseModal/ConfirmRemoveExerciseModal'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { updateWorkout } from '../../../redux/actions/workout/workout'
import _ from 'lodash'

const WorkoutPathModal = ({
  onClose,
  currExerciseIdx,
  currSetIdx,
  workout,
  weights,
  updateWorkout,
}) => {
  const [isExerciseToWorkoutModalOpen, setIsExerciseToWorkoutModalOpen] =
    useState(false)
  const [
    isConfirmRemoveExerciseModalOpen,
    setIsConfirmRemoveExerciseModalOpen,
  ] = useState(false)
  const [removedExerciseIdx, setRemovedExerciseIdx] = useState(null)
  const [error, setError] = useState('')

  const [currWorkoutPath, setCurrWorkoutPath] = useState(workout.path)

  const [isEditing, setIsEditing] = useState(false)

  const handleConfirmRemoveExercise = idx => {
    setRemovedExerciseIdx(idx)
    setIsConfirmRemoveExerciseModalOpen(true)
  }
  const removeExercise = async idx => {
    const updatedPath = Array.from(currWorkoutPath)
    updatedPath.splice(idx, 1)

    let updatedSetIdx = currSetIdx
    let updatedExerciseIdx = currExerciseIdx
    // If exercise is already completed decrement currExerciseIdx
    if (currExerciseIdx > idx) {
      updatedExerciseIdx--
    }
    if (currExerciseIdx === idx) {
      updatedSetIdx = 1
    }

    setCurrWorkoutPath(updatedPath)
    await updateWorkout({
      'runningWorkout.currWorkout.path': updatedPath,
      'runningWorkout.remainingWorkout.currSet': updatedSetIdx,
      'runningWorkout.remainingWorkout.currIdx': updatedExerciseIdx,
    })
  }

  const modalContent = useClickOutside(() => {
    if (!isExerciseToWorkoutModalOpen && !isConfirmRemoveExerciseModalOpen) {
      onClose()
    }
  })

  const reorder = (path, startIndex, endIndex) => {
    const result = Array.from(path)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const onDragEnd = result => {
    setError('')
    if (!result.destination) {
      return
    }

    if (currExerciseIdx > result.destination.index) {
      return setError('Cannot move before completed exercises.')
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index
    const updatedPath = reorder(currWorkoutPath, startIndex, endIndex)

    // Check if updatedPath equals original path
    let isEqual = true
    for (let i = 0; i < currWorkoutPath.length; ++i) {
      if (!_.isEqual(currWorkoutPath[i], updatedPath[i])) isEqual = false
    }
    if (isEqual) return

    setCurrWorkoutPath(updatedPath)
    console.log(startIndex, endIndex, currExerciseIdx)
    // If the currently active exercise wasn't moved and is still active, don't reset current number of completed sets
    if (startIndex > currExerciseIdx && endIndex > currExerciseIdx) {
      updateWorkout({
        'runningWorkout.currWorkout.path': updatedPath,
      })
    } else {
      updateWorkout({
        'runningWorkout.currWorkout.path': updatedPath,
        'runningWorkout.remainingWorkout.currSet': 1,
      })
    }
  }
  return ReactDom.createPortal(
    <>
      <div className='workout-path-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='container'>
            <div className='settings-title'>Workout Path</div>
            {error && (
              <div className='form-error'>
                <AiOutlineWarning className='icon' />
                {error}
              </div>
            )}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='droppable'>
                {(provided, snapshot) => (
                  <div
                    className='path'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {currWorkoutPath.map((ex, idx) => {
                      const currExercise = exerciseList.find(
                        exercise => exercise.id === ex.exerciseID
                      )
                      const imageURL = currExercise.imageURL
                      const name = currExercise.name
                      const sets = ex.sets
                      const setType = ex.type
                      const numSets = sets.length
                      let currExerciseWeight = null
                      if (currExercise.weights) {
                        if (setType === 'straight') {
                          let weightObj = weights.find(
                            weight => weight.exerciseID === ex.exerciseID
                          )
                          currExerciseWeight =
                            weightObj && weightObj.weight
                              ? weightObj.weight
                              : 45
                        } else if (setType === 'drop' || setType === 'timed') {
                          const maxWeight = Math.max.apply(
                            Math,
                            sets.map(o => Number(o.weight))
                          )
                          const minWeight = Math.min.apply(
                            Math,
                            sets.map(o => Number(o.weight))
                          )

                          currExerciseWeight =
                            maxWeight +
                            (minWeight < maxWeight && `-${minWeight}`)
                        }
                      }

                      const exerciseState =
                        currExerciseIdx > idx
                          ? 'COMPLETED'
                          : currExerciseIdx === idx
                          ? 'ACTIVE'
                          : 'UPCOMING'

                      // If exercise has been completed, completed sets will equal total sets
                      // If exercise is active, completed sets will equal the current workout set minus one (to get number of completed sets)
                      // If exercise is upcoming, 0 sets will have been completed
                      let completedSets = 0
                      if (exerciseState === 'COMPLETED') completedSets = numSets
                      if (exerciseState === 'ACTIVE')
                        completedSets = currSetIdx - 1
                      return (
                        <Draggable
                          key={idx}
                          draggableId={`draggable-${idx}`}
                          index={idx}
                          isDragDisabled={
                            exerciseState === 'COMPLETED' || !isEditing
                          }
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`workout-path-exercise ${exerciseState}${
                                isEditing ? ' editing' : ''
                              }`}
                            >
                              <div
                                className={`exercise-container${
                                  isEditing && exerciseState !== 'COMPLETED'
                                    ? ' jiggle'
                                    : ''
                                }${snapshot.isDragging ? ' dragging' : ''}`}
                              >
                                <div className='image'>
                                  <img src={imageURL} alt={name} />
                                </div>
                                <div className='exercise-data'>
                                  <div className='name'>{name}</div>
                                  <div className='reps-sets'>
                                    <div className='sets'>
                                      {setType} Sets:{' '}
                                      <span>
                                        <span className='curr-set'>
                                          {completedSets}
                                        </span>
                                        /{numSets}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                {currExerciseWeight && (
                                  <div className='weight'>
                                    {currExerciseWeight}lbs
                                  </div>
                                )}
                              </div>
                              {workout.path.length > 1 && isEditing ? (
                                <button
                                  className='remove-exercise-btn'
                                  onClick={() =>
                                    handleConfirmRemoveExercise(idx)
                                  }
                                >
                                  <AiOutlineClose className='icon' />
                                </button>
                              ) : null}
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
            <button
              className='editing-btn'
              onClick={() => setIsEditing(prev => !prev)}
            >
              {isEditing ? 'Done' : 'Edit'}
            </button>
            <button
              className='add-exercise'
              onClick={() => setIsExerciseToWorkoutModalOpen(true)}
            >
              <AiOutlinePlusCircle className='icon' /> <span>Add Exercise</span>
            </button>
          </div>
        </div>
      </div>
      {isExerciseToWorkoutModalOpen ? (
        <AddExerciseToWorkoutModal
          onClose={() => {
            setIsExerciseToWorkoutModalOpen(false)
          }}
          setCurrWorkoutPath={setCurrWorkoutPath}
          currWorkoutPath={currWorkoutPath}
        />
      ) : null}
      {isConfirmRemoveExerciseModalOpen ? (
        <ConfirmRemoveExerciseModal
          onClose={() => {
            setIsConfirmRemoveExerciseModalOpen(false)
          }}
          removedExerciseIdx={removedExerciseIdx}
          removeExercise={removeExercise}
        />
      ) : null}
    </>,
    document.getElementById('portal')
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateWorkout: data => dispatch(updateWorkout(data)),
  }
}

export default connect(null, mapDispatchToProps)(WorkoutPathModal)
