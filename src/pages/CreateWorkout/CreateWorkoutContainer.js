import React, { useState, useEffect, useRef } from 'react'
import CreateWorkout from './CreateWorkout'
import { connect } from 'react-redux'
import { createWorkout } from '../../redux/actions/workout/workout'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

const CreateWorkoutContainer = ({ createWorkout }) => {
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [workoutName, setWorkoutName] = useState('')
  const [workoutDescription, setWorkoutDescription] = useState('')

  const [restTimeMS, setRestTimeMS] = useState('')
  const [restTimeMinutes, setRestTimeMinutes] = useState('')
  const [restTimeSeconds, setRestTimeSeconds] = useState('')

  const titleRef = useRef()
  // Scroll to top of page if there is an error
  useEffect(() => {
    if (error && titleRef.current) {
      titleRef.current.scrollIntoView()
    }
  }, [error])

  // When restTime Minutes or Seconds changes, set totalTestTime to the total time in seconds
  useEffect(() => {
    setRestTimeMS((restTimeMinutes * 60 + restTimeSeconds) * 1000)
    console.log(restTimeMinutes, restTimeSeconds)
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

  // *Exercise Array Logic

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

  const clearForm = () => {
    setWorkoutName('')
    setWorkoutDescription('')
    setRestTimeMinutes('')
    setRestTimeSeconds('')
    setFailedRestTimeMinutes('')
    setFailedRestTimeSeconds('')
    setAddedExercises([])
  }

  const handleCreateWorkoutSubmit = e => {
    e.preventDefault()
    setError('')
    setLoading(true)

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

    const newWorkout = {
      id: uuidv4(),
      name: workoutName,
      restTime: restTimeMS > 0 ? restTimeMS : 90000,
      failSetRestTime: failedRestTimeMS > 0 ? failedRestTimeMS : 300000,
      lastSetFailed: false,
      path: addedExercises.map(ex => {
        return {
          id: uuidv4(),
          exerciseID: ex.exercise.id,
          reps: ex.reps,
          sets: ex.sets,
        }
      }),
    }

    createWorkout(newWorkout)
      .then(() => {
        clearForm()
        navigate('/')
      })
      .catch(err => {
        setError(`ERROR: ${err.code}`)
      })
    setLoading(false)
  }

  return (
    <CreateWorkout
      titleRef={titleRef}
      handleCreateWorkoutSubmit={handleCreateWorkoutSubmit}
      workoutName={workoutName}
      setWorkoutName={setWorkoutName}
      workoutDescription={workoutDescription}
      setWorkoutDescription={setWorkoutDescription}
      restTimeMinutes={restTimeMinutes}
      setRestTimeMinutes={setRestTimeMinutes}
      restTimeSeconds={restTimeSeconds}
      setRestTimeSeconds={setRestTimeSeconds}
      failedRestTimeMinutes={failedRestTimeMinutes}
      setFailedRestTimeMinutes={setFailedRestTimeMinutes}
      failedRestTimeSeconds={failedRestTimeSeconds}
      setFailedRestTimeSeconds={setFailedRestTimeSeconds}
      addedExercises={addedExercises}
      setAddedExercise={setAddedExercises}
      changeAddedExerciseData={changeAddedExerciseData}
      deleteAddedExercise={deleteAddedExercise}
      addExercise={addExercise}
      error={error}
      loading={loading}
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createWorkout: data => dispatch(createWorkout(data)),
  }
}

export default connect(null, mapDispatchToProps)(CreateWorkoutContainer)
