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
  weights,
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
              const currExercise = exerciseList.find(
                exercise => exercise.id === ex.exerciseID
              )

              const imageURL = currExercise.imageURL
              const name = currExercise.name
              const sets = ex.sets
              const setType = ex.type

              const numSets = sets.length

              let currExerciseWeight
              if (setType === 'straight') {
                let weightObj = weights.find(
                  weight => weight.exerciseID === ex.exerciseID
                )
                currExerciseWeight = weightObj.weight || 45
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
                  maxWeight + (minWeight < maxWeight && `-${minWeight}`)
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
              if (exerciseState === 'ACTIVE') completedSets = currSetIdx - 1

              return (
                <div
                  key={`${ex.exerciseID}-${idx}`}
                  className={`workout-path-exercise ${exerciseState}`}
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
                          <span className='curr-set'>{completedSets}</span>/
                          {numSets}
                        </span>
                      </div>
                    </div>
                  </div>
                  {currExerciseWeight && (
                    <div className='weight'>{currExerciseWeight}lbs</div>
                  )}
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
