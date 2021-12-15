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

    // Current Workout States
    // const [currIdx, setCurrIdx] = useState()
    // const [currSet, setCurrSet] = useState()
    // const [currRepsTotal, setCurrRepsTotal] = useState()
    // const [currSetTotal, setCurrSetTotal] = useState()
    // const [restTime, setRestTime] = useState()
    // const [isTimer, setIsTimer] = useState()
    const [currExercise, setCurrExercise] = useState()
    // const [timerStart, setTimerStart] = useState(null)
    // const getCurrentExerciseID = idx => {
    // const currExercise = workoutData.runningWorkout.currWorkout.path[idx]
    // return currExercise.exerciseID
    // }
    // Set current workout states initially
    useEffect(() => {
        // const setStates = async () => {
        //     const currWorkoutData = workoutData.runningWorkout
        //     const currIdx = currWorkoutData.remainingWorkout.currIdx
        //     const currSet = currWorkoutData.remainingWorkout.currSet

        //     await setIsTimer(currWorkoutData.timer.isTimer)
        //     await setTimerStart(currWorkoutData.timer.timerStart)

        //     const currExercise = currWorkoutData.currWorkout.path[currIdx]

        //     const tempExerciseID = currExercise.exerciseID
        //     const currExerciseData = await getSingleWorkout(
        //         tempExerciseID,
        //         workoutData.weights
        //     )
        //     await setCurrExercise(currExerciseData)

        //     await setCurrIdx(currIdx)
        //     await setCurrSet(currSet)
        //     await setCurrRepsTotal(currExercise.reps)
        //     await setCurrSetTotal(currExercise.sets)
        //     await setRestTime(currWorkoutData.currWorkout.restTime)
        // }

        // Set states if workout is running
        setLoading(true)
        getWorkoutData(currentUser.uid)

        // if (workoutData.isWorkoutRunning) {
        // setStates()
        // }
    }, [])

    const completeSet = async () => {
        if (currSet === currSetTotal) {
            // If the last set of the last exercise is finished
            if (
                currIdx >=
                workoutData.runningWorkout.currWorkout.path.length - 1
            ) {
                return finishWorkout()
            } else {
                setIsTimer(true)
                const startTime = new Date().getTime()
                setTimerStart(startTime)

                const nextIdx = currIdx + 1
                const nextSet = 1
                setCurrIdx(nextIdx)
                setCurrSet(nextSet)

                const nextExerciseID = getCurrentExerciseID(nextIdx)
                const currExerciseData = await getSingleWorkout(
                    nextExerciseID,
                    workoutData.weights
                )
                await setCurrExercise(currExerciseData)

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
        console.log(workoutData.runningWorkout.currWorkout.path)
    }
    async function getSingleWorkout(id, weightsList) {
        const currExercise = exerciseList.find(ex => ex.id === id)
        const exerciseWeight = weightsList.find(ex => ex.exerciseID === id)
        const currWorkoutData = workoutData.runningWorkout.currWorkout.find(
            ex => ex.exerciseID === id
        )

        console.log(id)
        return {
            ...currExercise,
            exerciseWeight: exerciseWeight.weight,
            currWorkoutData,
        }
    }
    async function updateWorkout(data) {
        console.log('updating workout data')
        // const obj = data.map(el => {
        // return { [el.prop]: el.val }
        // })
        // console.log(obj)
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
        let data
        console.log('Im here')
        await getDoc(doc(db, 'workoutData', uid)).then(document => {
            console.log('and now here', document)
            data = document.data()
        })
        return setWorkoutData(data)
    }

    useEffect(() => {
        const setCurrExerciseData = async () => {
            const currWorkoutData = workoutData.runningWorkout
            const currIdx = currWorkoutData.remainingWorkout.currIdx
            const currExercise = currWorkoutData.currWorkout.path[currIdx]

            const tempExerciseID = currExercise.exerciseID
            const currExerciseData = await getSingleWorkout(
                tempExerciseID,
                workoutData.weights
            )
            await setCurrExercise(currExerciseData)
        }
        if (currExercise) {
            setCurrExerciseData()
        }
        if (workoutData) {
            setLoading(false)
        }
    }, [workoutData])

    const value = {
        workoutData,
        finishWorkout,
        startWorkout,
        isWorkoutFinished,
        updateWorkout,
        getSingleWorkout,
        completeSet,
    }
    return (
        <WorkoutContext.Provider value={value}>
            {loading ? <div>Loading Workout....</div> : children}
        </WorkoutContext.Provider>
    )
}
