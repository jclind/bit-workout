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
  const weights = exerciseList.map(ex => {
    const id = ex.id
    return { exerciseID: id, weight: calculateWeight(id, weight, gender) }
  })
  return setDoc(doc(db, 'workoutData', uid), {
    weights,
    isWorkoutRunning: false,
    runningWorkout: {},
  })
}

export const WorkoutProvider = ({ children }) => {
  const [workoutData, setWorkoutData] = useState()
  const [loading, setLoading] = useState(true)
  const { currentUser } = useAuth()

  const [isWorkoutRunning, setIsWorkoutRunning] = useState(false)

  // Current Workout States
  const [currIdx, setCurrIdx] = useState()
  const [currSet, setCurrSet] = useState()
  const [isTimer, setIsTimer] = useState()
  const [currExercise, setCurrExercise] = useState()
  const [timerStart, setTimerStart] = useState(null)
  const getCurrentExerciseID = idx => {
    const currExercise = workoutData.runningWorkout.currWorkout.path[idx]
    return currExercise.exerciseID
  }

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
    updateWorkout(data).then(() => {
      setLoading(false)
    })
  }

  // Set current workout states initially
  useEffect(() => {
    console.log('in isWorkoutRunning useEffect', isWorkoutRunning)
    const setStates = async () => {
      console.log('Im in setState')
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

    if (isWorkoutRunning) {
      setLoading(true)
      setStates()
    } else {
      getWorkoutData(currentUser.uid)
    }
  }, [isWorkoutRunning])

  const completeSet = async () => {
    const currSetTotal = currExercise.currWorkoutData.sets

    if (currSet === currSetTotal) {
      // If the last set of the last exercise is finished
      if (currIdx >= workoutData.runningWorkout.currWorkout.path.length - 1) {
        return finishWorkout()
      } else {
        setIsTimer(true)
        const startTime = new Date().getTime()
        setTimerStart(startTime)

        const nextIdx = currIdx + 1
        const nextSet = 1
        setCurrIdx(nextIdx)
        setCurrSet(nextSet)

        // const nextExerciseID = getCurrentExerciseID(nextIdx)
        // const currExerciseData = await getSingleWorkout(
        //   nextExerciseID,
        //   workoutData.weights
        // )
        // await setCurrExercise(currExerciseData)

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
  const finishWorkout = async () => {
    console.log('workout finished')
    const weightsArray = workoutData.weights
    workoutData.runningWorkout.currWorkout.path.forEach(ex => {
      const exerciseID = ex.exerciseID
      weightsArray.forEach(w => {
        if (w.exerciseID === exerciseID) {
          w.weight = w.weight + 5
        }
      })
    })
    await updateWorkout({
      isWorkoutRunning: false,
      weights: weightsArray,
    })
    await setIsWorkoutFinished(true)
  }

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
  async function updateWorkout(data) {
    console.log('updating workout data')
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

  async function getWorkoutData(uid) {
    console.log('Getting data!!!')
    let data
    await getDoc(doc(db, 'workoutData', uid)).then(document => {
      data = document.data()
      console.log('in getDoc (getWorkoutData)', data)
      setWorkoutData(data)
    })
    return data
  }

  useEffect(() => {
    console.log('Now in workoutData useEffect')
    const setCurrExerciseData = async () => {
      const currWorkoutData = workoutData.runningWorkout
      const currExercise = currWorkoutData.currWorkout.path[currIdx]

      const tempExerciseID = currExercise.exerciseID
      const currExerciseData = await getSingleWorkout(
        tempExerciseID,
        workoutData.weights
      )
      console.log(currExerciseData)
      await setCurrExercise(currExerciseData)
      console.log(currExercise)
    }

    if (currExercise) {
      console.log('if currExercise Exists (workoutData useEffect)')
      setCurrExerciseData()
    }
    if (workoutData) {
      console.log(
        'if workoutData Exists (workoutData useEffect)',
        workoutData.isWorkoutRunning
      )
      setIsWorkoutRunning(workoutData.isWorkoutRunning)
    }
  }, [workoutData])

  useEffect(() => {
    if (workoutData && !workoutData.isWorkoutRunning) {
      setLoading(false)
    } else if (workoutData && currExercise) {
      console.log(workoutData, currExercise)
      setLoading(false)
      console.log('hopefully 2')
    }
  }, [workoutData, currExercise])

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
      {loading ? <div>Loading Workout....</div> : children}
    </WorkoutContext.Provider>
  )
}
