import React, { useState, useEffect, useContext } from 'react'
import { db } from '../firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { exerciseList } from '../assets/data/exerciseList'
import { calculateWeight } from '../util/calculateWeight'
import { useAuth } from './AuthContext'

const WorkoutContext = React.createContext()

export function useWorkout() {
  return useContext(WorkoutContext)
}

export function setWorkout(weight, gender, uid) {
  const weights = exerciseList.map(ex => {
    const id = ex.id
    console.log(id)
    console.log(calculateWeight(id, 149, 'male'))
    return { exerciseID: id, weight: calculateWeight(id, weight, gender) }
  })
  console.log(weights)
  return setDoc(doc(db, 'workoutData', uid), {
    weights,
  })
}

export const WorkoutProvider = ({ children }) => {
  const [workoutData, setWorkoutData] = useState()
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuth()

  async function getWorkoutData(uid) {
    let data
    console.log('Im here')
    await getDoc(doc(db, 'workoutData', uid)).then(document => {
      console.log('and now here', document)
      data = document.data()
    })
    return setWorkoutData(data)
  }
  useEffect(() => {
    setLoading(true)
    getWorkoutData(currentUser.uid)
  }, [])

  useEffect(() => {
    console.log('run')
    if (workoutData) {
      setLoading(false)
      console.log(workoutData)
    }
  }, [workoutData])

  const value = { workoutData }
  return (
    <WorkoutContext.Provider value={value}>
      {loading ? <div>Loading Workout....</div> : children}
    </WorkoutContext.Provider>
  )
}
