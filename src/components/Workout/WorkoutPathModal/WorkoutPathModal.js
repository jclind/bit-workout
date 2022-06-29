import React from 'react'
import ReactDom from 'react-dom'
import { exerciseList } from '../../../assets/data/exerciseList'
import useClickOutside from '../../../util/useClickOutside'
import './WorkoutPathModal.scss'

const WorkoutPathModal = ({ onClose, currIdx, currSet, workout }) => {
  const modalContent = useClickOutside(() => {
    onClose()
  })
  console.log(workout.path)
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
              const reps = Number(ex.reps)
              const sets = Number(ex.sets)

              const exerciseState =
                currIdx > idx
                  ? 'COMPLETED'
                  : currIdx === idx
                  ? 'ACTIVE'
                  : 'UPCOMING'

              // If exercise has been completed, completed sets will equal total sets
              // If exercise is active, completed sets will equal the current workout set minus one (to get number of completed sets)
              // If exercise is upcoming, 0 sets will have been completed
              let completedSets = 0
              if (exerciseState === 'COMPLETED') completedSets = sets
              if (exerciseState === 'ACTIVE') completedSets = currSet - 1

              // const name = workout && workout.workoutName
              // const workoutTime =
              //   workout && formatTimeToObject(workout.totalWorkoutTime)
              // const date = workout && formatDate(workout.workoutStartTime)
              // const startTime =
              //   workout && formatAMPM(workout.workoutStartTime)
              // const workoutFinishTime =
              //   workout &&
              //   Number(workout.workoutStartTime) +
              //     Number(workout.totalWorkoutTime)
              // const finishTime = workout && formatAMPM(workoutFinishTime)
              return (
                <div className={`workout-path-exercise ${exerciseState}`}>
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
                          {sets}
                        </span>
                      </div>
                      <div className='reps'>
                        Reps: <span>{reps}</span>
                      </div>
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
