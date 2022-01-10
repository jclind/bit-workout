import React, { useState, useEffect, useContext } from 'react'
import { db } from '../firebase'
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'
import { exerciseList } from '../assets/data/exerciseList'
import { calculateWeight } from '../util/calculateWeight'
import { useAuth } from './AuthContext'
import firebase from 'firebase/compat/app'

const WorkoutContext = React.createContext()

export function useWorkout() {
  return useContext(WorkoutContext)
}

export function setWorkout(weight, gender, uid) {
  // Map over list of exercises for current user and return the id and weight for each
  const weights = exerciseList.map(ex => {
    const id = ex.id
    return { exerciseID: id, weight: calculateWeight(id, weight, gender) }
  })
  // Set current user workout data with prop name of current user id
  return setDoc(doc(db, 'workoutData', uid), {
    weights,
    isWorkoutRunning: false,
    runningWorkout: {},
  })
}

export const WorkoutProvider = ({ children }) => {
  const {
    currentUser,
    isWorkoutRunning,
    setIsWorkoutRunning,
    workoutData,
    setWorkoutData,
  } = useAuth()
  useEffect(() => {
    if (!currentUser) {
      setLoading(false)
    }
  }, [currentUser])

  const [loading, setLoading] = useState(true)

  // Current Workout States
  const [currIdx, setCurrIdx] = useState()
  const [currSet, setCurrSet] = useState()
  const [isTimer, setIsTimer] = useState()
  const [currExercise, setCurrExercise] = useState()
  const [timerStart, setTimerStart] = useState(null)

  // Update workout data with starting data
  const startWorkout = exercise => {
    const data = {
      isWorkoutRunning: true,
      runningWorkout: {
        remainingWorkout: { currIdx: 0, currSet: 1 },
        currWorkout: exercise,
        timer: {
          isTimer: false,
          timerStart: null,
        },
      },
    }
    setLoading(true)
    updateWorkout(data)
  }

  // Set current workout states initially
  useEffect(() => {
    const setStates = async () => {
      const currWorkoutData = workoutData.runningWorkout

      const currIdx = currWorkoutData.remainingWorkout.currIdx
      const currSet = currWorkoutData.remainingWorkout.currSet

      await setIsTimer(currWorkoutData.timer.isTimer)

      const currExercise = currWorkoutData.currWorkout.path[currIdx]
      const tempExerciseID = currExercise.exerciseID
      await setTimerStart(currWorkoutData.timer.timerStart)
      await setCurrIdx(currIdx)
      await setCurrSet(currSet)

      const currExerciseData = await getSingleWorkout(
        tempExerciseID,
        workoutData.weights
      )
      return await setCurrExercise(currExerciseData)
    }

    // If workout is already running, set loading and states, else retrieve user workout data
    if (currentUser) {
      if (isWorkoutRunning) {
        setLoading(true)
        setStates()
      } else {
        getWorkoutData(currentUser.uid)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWorkoutRunning])

  const completeSet = async () => {
    // Set current set to the number of sets in the current workout
    const currSetTotal = currExercise.currWorkoutData.sets

    // If the current set is the last set
    // Else start rest timer, increment set, and updateWorkout
    if (currSet === currSetTotal) {
      // If the last set of the last exercise is finished then call finishWorkout
      // Else begin next rest timer, increment currSet and currIdx, and updateWorkout
      if (currIdx >= workoutData.runningWorkout.currWorkout.path.length - 1) {
        console.log('Im here about to call finishWorkout!')
        setIsWorkoutFinished(true)
        if (!isWorkoutFinished) {
          return finishWorkout()
        }
      } else {
        setIsTimer(true)
        const startTime = new Date().getTime()
        setTimerStart(startTime)

        const nextIdx = currIdx + 1
        const nextSet = 1
        setCurrIdx(nextIdx)
        setCurrSet(nextSet)

        await updateWorkout({
          'runningWorkout.remainingWorkout.currIdx': nextIdx,
          'runningWorkout.remainingWorkout.currSet': nextSet,
          'runningWorkout.timer.isTimer': true,
          'runningWorkout.timer.timerStart': startTime,
        })
      }
    } else {
      const startTime = new Date().getTime()
      setTimerStart(startTime)
      setIsTimer(true)

      const nextSet = currSet + 1
      setCurrSet(nextSet)

      await updateWorkout({
        'runningWorkout.remainingWorkout.currSet': nextSet,
        'runningWorkout.timer.isTimer': true,
        'runningWorkout.timer.timerStart': startTime,
      })
    }
  }

  const [isWorkoutFinished, setIsWorkoutFinished] = useState()
  // On workout finish, get list of weights and increment each by 5
  const finishWorkout = async () => {
    console.log('workout finished')
    const weightsArray = workoutData.weights
    // Map through the just finished current workout
    workoutData.runningWorkout.currWorkout.path.forEach(ex => {
      const exerciseID = ex.exerciseID
      // For each workout, increment every completed exercise weight
      weightsArray.forEach(w => {
        if (w.exerciseID === exerciseID) {
          w.weight = w.weight + 5
        }
      })
    })
    // Update user workout data with new weights
    await updateWorkout({
      isWorkoutRunning: false,
      weights: weightsArray,
    })
  }

  // Get data from single exercise with id and user weightsList
  async function getSingleWorkout(id, weightsList) {
    const currExercise = exerciseList.find(ex => ex.id === id)
    const exerciseWeight = weightsList.find(ex => ex.exerciseID === id)
    const currWorkoutData = workoutData.runningWorkout.currWorkout.path.find(
      ex => ex.exerciseID === id
    )

    return {
      ...currExercise,
      exerciseWeight: exerciseWeight.weight,
      currWorkoutData,
    }
  }

  // Takes data and passes it as update to the firestore
  async function updateWorkout(data) {
    // Get current user and update workout data with user's uid
    const user = firebase.auth().currentUser
    const workoutRef = doc(db, 'workoutData', user.uid)
    await updateDoc(workoutRef, {
      ...data,
    })
    await setWorkoutData(prevState => ({
      ...prevState,
      ...data,
    }))
  }

  // Retrieve workout data from firestore with uid prop
  async function getWorkoutData(uid) {
    console.log('Getting data!!!')
    let data
    await getDoc(doc(db, 'workoutData', uid)).then(document => {
      data = document.data()
      setWorkoutData(data)
    })
    return data
  }

  // On workoutData change, if currExercise exists, update currExercise.
  // If workoutData exists, setIsWorkoutRunning to curr bool val
  useEffect(() => {
    // Get curr exercise data using getSingleWorkout and setCurrExercise
    const setCurrExerciseData = async () => {
      const currWorkoutData = workoutData.runningWorkout
      const currExercise = currWorkoutData.currWorkout.path[currIdx]

      const tempExerciseID = currExercise.exerciseID
      const currExerciseData = await getSingleWorkout(
        tempExerciseID,
        workoutData.weights
      )
      await setCurrExercise(currExerciseData)
    }

    // If currExercise exists then setCurrExercise
    if (workoutData && currExercise) {
      setCurrExerciseData()
    }

    // If workoutData Exists, setIsWorkoutRunning to current bool value of workoutData.isWorkoutRunning
    if (workoutData) {
      setIsWorkoutRunning(workoutData.isWorkoutRunning)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workoutData])

  useEffect(() => {
    if (workoutData && !workoutData.isWorkoutRunning) {
      setLoading(false)
    } else if (workoutData && currExercise) {
      setLoading(false)
    }
  }, [workoutData, currExercise])

  // Hold all values to be used from WorkoutContext
  const value = {
    workoutData,
    finishWorkout,
    currExercise,
    startWorkout,
    isWorkoutFinished,
    setIsWorkoutFinished,
    updateWorkout,
    getSingleWorkout,
    completeSet,
    currIdx,
    currSet,
    isTimer,
    setIsTimer,
    timerStart,
  }

  return (
    <WorkoutContext.Provider value={value}>
      {loading ? <div>Loading Workout...</div> : children}
    </WorkoutContext.Provider>
  )
}
