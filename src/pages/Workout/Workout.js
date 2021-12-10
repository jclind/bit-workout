import React, { useState, useEffect } from 'react'
import { useWorkout } from '../../contexts/WorkoutContext'
import WorkoutSelection from '../../components/Workout/WorkoutSelection'
// import ActiveWorkoutContainer from '../../components/Workout/ActiveWorkoutContainer'
import { e1 } from '../../assets/data/e1'

const Workout = () => {
  const { workoutData, updateWorkout } = useWorkout()
  const [loading, setLoading] = useState(false)

  const [currIdx, setCurrIdx] = useState()
  const [currSet, setCurrSet] = useState()
  const [currSetTotal, setCurrSetTotal] = useState()

  const { isWorkoutRunning } = workoutData

  const startWorkout = exercise => {
    const data = {
      isWorkoutRunning: true,
      runningWorkout: {
        remainingWorkout: { currIdx: 0, currSet: 1 },
        currWorkout: e1.path,
      },
    }
    setLoading(true)
    updateWorkout(data).then(() => {
      setLoading(false)
    })
  }
  const completeSet = () => {}
  const stopWorkout = () => {
    const data = {
      isWorkoutRunning: false,
      runningWorkout: {
        remainingWorkout: null,
        currWorkout: null,
      },
    }
    updateWorkout(data)
  }

  useEffect(() => {
    if (isWorkoutRunning) {
      const currWorkoutData = workoutData.runningWorkout
      const currIdx = currWorkoutData.remainingWorkout.currIdx
      const currSet = currWorkoutData.remainingWorkout.currSet
      setCurrIdx(currIdx)
      setCurrSet(currSet)
      setCurrSetTotal(currWorkoutData.currWorkout[currIdx].sets)
    }
  }, [])

  return (
    <>
      <div className='page'>
        WORKOUT PAGE
        {loading ? (
          'Loading thangs!!!'
        ) : (
          <>
            {isWorkoutRunning ? (
              <>
                {currSet ? (
                  <div>{`Current Set ${currSet} / ${currSetTotal}`}</div>
                ) : null}
                <button className='submit-btn' onClick={completeSet}>
                  Complete Set
                </button>
                <button className='submit-btn' onClick={stopWorkout}>
                  Stop Workout
                </button>
                {/* <ActiveWorkoutContainer /> */}
              </>
            ) : (
              <WorkoutSelection startWorkout={startWorkout} />
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Workout
