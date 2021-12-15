import React from 'react'
import '../../assets/styles/components/workout/single-workout.scss'
import { exerciseList } from '../../assets/data/exerciseList'
import { estimateTime } from '../../util/estimateTime'
import { msToTime } from '../../util/msToTime'
import { useWorkout } from '../../contexts/WorkoutContext'

const SingleWorkout = ({ text, exercise }) => {
    const estTime = msToTime(estimateTime(exercise))
    const { workoutData, startWorkout } = useWorkout()

    return (
        <div className='single-workout'>
            <div className='title-container'>
                <div className='title'>{text}</div>
                <div className='est-time'>Time: ≈{estTime}</div>
            </div>
            <div className='exercises-container'>
                {exercise.path.map((e, idx) => {
                    const currExercise = exerciseList.find(
                        obj => obj.id === e.exerciseID
                    )
                    const exID = currExercise.id
                    const currWeight = workoutData.weights.find(
                        ex => ex.exerciseID === exID
                    ).weight
                    const image = currExercise.imageURL
                    const name = currExercise.name

                    return (
                        <div key={idx}>
                            <img
                                src={image}
                                alt={name}
                                className='exercise-img'
                            />
                            <div className='exercise-title'>{name}</div>
                            <div className='exercise-weight'>
                                {currWeight}lbs.
                            </div>
                        </div>
                    )
                })}
            </div>
            <button
                className='start-button'
                onClick={() => startWorkout(exercise)}
            >
                Start Workout
            </button>
        </div>
    )
}

export default SingleWorkout
