import React from 'react'
import ReactDom from 'react-dom'
import { exerciseList } from '../../../assets/data/exerciseList'
import useClickOutside from '../../../util/useClickOutside'
import './WorkoutPathModal.scss'

const WorkoutPathModal = ({
  onClose,
  currExerciseIdx,
  currSetIdx,
  workout,
}) => {
  const modalContent = useClickOutside(() => {
    onClose()
  })
  return ReactDom.createPortal(
    <>
      <div className='workout-path-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='settings-title'>Workout Path</div>
          <div className='path'>
            {workout.path.map((ex, idx) => {
              console.log(ex, currExerciseIdx, currSetIdx)
              const currExercise = exerciseList.find(
                exercise => exercise.id === ex.exerciseID
              )

              const imageURL = currExercise.imageURL
              const name = currExercise.name
              const sets = ex.sets

              const numSets = sets.length
              // const reps = Number(ex.reps)
              // const sets = Number(ex.sets)

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
              if (exerciseState === 'ACTIVE') completedSets = currSetIdx - 1

              return (
                <div
                  key={ex.exerciseID}
                  className={`workout-path-exercise ${exerciseState}`}
                >
                  <div className='image'>
                    <img src={imageURL} alt={name} />
                  </div>
                  <div className='exercise-data'>
                    <div className='name'>{name}</div>
                    <div className='reps-sets'>
                      <div className='sets'>
                        Sets:{' '}
                        <span>
                          <span className='curr-set'>{completedSets}</span>/
                          {numSets}
                        </span>
                      </div>
                      {/* <div className='reps'>
                        Reps: <span>{reps}</span>
                      </div> */}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default WorkoutPathModal
