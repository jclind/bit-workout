import React, { useState, useEffect, useContext } from 'react'

const WorkoutContext = React.createContext()

export function useWorkout() {
  return useContext(WorkoutContext)
}

export const WorkoutProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [isWorkout, setIsWorkout] = useState(false)

  const value = { isWorkout }

  return (
    <WorkoutContext.Provider value={value}>
      {loading ? <div>Loading Workout....</div> : children}
    </WorkoutContext.Provider>
  )
}
