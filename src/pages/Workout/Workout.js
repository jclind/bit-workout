import React, { useState, useEffect } from 'react'
import { useWorkout } from '../../contexts/WorkoutContext'
import WorkoutSelection from '../../components/Workout/WorkoutSelection'
import ActiveWorkoutContainer from '../../components/Workout/ActiveWorkoutContainer'
import WorkoutComplete from '../../components/Workout/WorkoutComplete'
import { e1 } from '../../assets/data/e1'

const Workout = () => {
  const { workoutData, updateWorkout } = useWorkout()
  const [loading, setLoading] = useState(false)

  const { isWorkoutRunning } = workoutData
  const [isWorkoutFinished, setIsWorkoutFinished] = useState()

  const startWorkout = exercise => {
    const data = {
      isWorkoutRunning: true,
      runningWorkout: {
        remainingWorkout: { currIdx: 0, currSet: 1 },
        currWorkout: e1,
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
    console.log(workoutData.runningWorkout.currWorkout.path)
  }

  return (
    <>
      <div className='page'>
        {loading ? (
          'Loading thangs!!!'
        ) : (
          <>
            {isWorkoutFinished ? (
              <WorkoutComplete setIsWorkoutFinished={setIsWorkoutFinished} />
            ) : isWorkoutRunning ? (
              <>
                <ActiveWorkoutContainer
                  workoutData={workoutData}
                  finishWorkout={finishWorkout}
                />
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
