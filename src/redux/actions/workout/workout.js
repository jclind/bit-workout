import {
  FETCH_WORKOUT_DATA,
  SET_COMPLETED_WORKOUT_DATA,
  SET_WORKOUT_DATA,
  SET_WORKOUT_FINISHED,
} from '../../types'
import { db } from '../../../firebase'
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
  deleteDoc,
  increment,
} from 'firebase/firestore'
import { exerciseList } from '../../../assets/data/exerciseList'
import { calcCoins, calcExp, logWorkout } from '../character/character'
import { v4 as uuidv4 } from 'uuid'
import { createWarmupPath } from '../../../util/createWarmupPath'
import { getExercisePRs, updateWorkoutStats } from '../stats/stats'

export const fetchWorkoutData = uid => async dispatch => {
  await getDoc(doc(db, 'workoutData', uid)).then(document => {
    const workoutData = document.data()
    dispatch({ type: FETCH_WORKOUT_DATA, payload: workoutData })
    const timeLastUpdated = workoutData.runningWorkout.timeLastUpdated
    const isWorkoutRunning = workoutData.isWorkoutRunning
    if (
      isWorkoutRunning &&
      (!timeLastUpdated || timeLastUpdated < new Date().getTime() - 1800000)
    ) {
      dispatch(stopWorkout())
    }
  })
}

export const updateWorkout = data => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid
  if (!uid) console.error('UID not defined in updateWorkout')
  const workoutRef = doc(db, 'workoutData', uid)

  dispatch({ type: SET_WORKOUT_DATA, payload: data })
  await updateDoc(workoutRef, {
    ...data,
  }).catch(err => {
    console.log(err)
    // !ERROR
  })
}
export const setWorkoutFinished = isFinished => {
  return {
    type: SET_WORKOUT_FINISHED,
    payload: isFinished,
  }
}

export const getSingleExercise = exerciseID => (dispatch, getState) => {
  const weights = getState().workout?.workoutData?.weights

  const exercise = exerciseList.find(
    ex => ex.id.toString() === exerciseID.toString()
  )

  const exerciseWeightData =
    weights &&
    weights.find(w => w.exerciseID.toString() === exerciseID.toString())
  let exerciseWeight
  if (!exerciseWeightData) {
    exerciseWeight = 45
  } else {
    exerciseWeight = exerciseWeightData.weight
  }

  return { ...exercise, exerciseWeight } || null
}

export const getSingleWorkout = id => (dispatch, getState) => {
  const weights = getState().workout.workoutData.weights
  const workoutData = getState().workout.workoutData

  const currExercise = exerciseList.find(ex => ex.id === id)
  const exerciseWeightData = weights.find(ex => ex.exerciseID === id)
  let exerciseWeight
  if (!exerciseWeightData) {
    exerciseWeight = 45
  } else {
    exerciseWeight = exerciseWeightData.weight
  }
  const currWorkoutData = workoutData.runningWorkout.currWorkout.path.find(
    ex => ex.exercise.id === id
  )

  return {
    ...currExercise,
    exerciseWeight,
    currWorkoutData,
  }
}
export const startWorkout = workoutData => async (dispatch, getState) => {
  const data = {
    isWorkoutRunning: true,
    runningWorkout: {
      workoutStartTime: new Date().getTime(),
      timeLastUpdated: new Date().getTime(),
      remainingWorkout: { currIdx: 0, currSet: 1 },
      currWorkout: workoutData,
      timer: {
        isTimer: false,
        timerStart: null,
      },
      coins: 0,
      exp: 0,
    },
  }
  dispatch(updateWorkout(data))
  dispatch(setWorkoutFinished(false))
}
export const addExerciseToWorkout =
  newExercise => async (dispatch, getState) => {
    const currWorkout =
      getState().workout.workoutData.runningWorkout.currWorkout
    const updatedWorkoutPath = [...currWorkout.path, newExercise]
    const updatedWorkoutData = {
      'runningWorkout.currWorkout.path': updatedWorkoutPath,
    }
    await dispatch(updateWorkout(updatedWorkoutData))
    return updatedWorkoutPath
  }
export const removeExerciseFromWorkout =
  exerciseIdx => async (dispatch, getState) => {
    const currWorkout =
      getState().workout.workoutData.runningWorkout.currWorkout
    const updatedWorkoutPath = [...currWorkout.path]
    updatedWorkoutPath.splice(exerciseIdx, 1)
    const updatedWorkoutData = {
      'runningWorkout.currWorkout.path': updatedWorkoutPath,
    }
    await dispatch(updateWorkout(updatedWorkoutData))
    return updatedWorkoutPath
  }

export const completeSet =
  (currSetTotal, completedReps, exerciseID, weight, lastSetFailed) =>
  async (dispatch, getState) => {
    const weights = getState().workout.workoutData.weights
    const runningWorkout = getState().workout.workoutData.runningWorkout
    const timeLastUpdated = runningWorkout.timeLastUpdated
    const currSet = runningWorkout.remainingWorkout.currSet
    const currIdx = runningWorkout.remainingWorkout.currIdx
    const currWorkoutPathLength = runningWorkout.currWorkout.path.length
    const elapsedTime = new Date().getTime() - timeLastUpdated

    // If user doesn't have recorded weight for current exercise, set to 45
    let currExerciseWeight
    if (
      weights.find(w => w.exerciseID === exerciseID) === undefined &&
      exerciseID
    ) {
      currExerciseWeight = 45
      dispatch(addNewExerciseWeight(45, exerciseID))
    } else {
      currExerciseWeight = weight
    }
    let updatedPath = [...runningWorkout.currWorkout.path]
    const currSetPath = updatedPath[currIdx].setPath || []
    const currSetID = uuidv4()
    updatedPath[currIdx].setPath = [
      ...currSetPath,
      {
        id: currSetID,
        setNum: currSet,
        completedReps,
        weight: currExerciseWeight,
        isFailed: lastSetFailed || false,
      },
    ]

    const currCoins = runningWorkout.coins ? runningWorkout.coins : 0
    const earnedCoins = calcCoins(completedReps)
    const totalCoins = earnedCoins + currCoins
    const currExp = runningWorkout.exp ? runningWorkout.exp : 0
    const earnedExp = calcExp(completedReps)
    const totalExp = earnedExp + currExp

    const currTotalWeight = runningWorkout.totalWeight
      ? runningWorkout.totalWeight
      : 0
    const totalWeight = currTotalWeight + Number(weight)

    dispatch(
      updateWorkoutStats(
        1,
        completedReps,
        weight,
        exerciseID,
        elapsedTime,
        earnedCoins,
        earnedExp,
        currSetID
      )
    )
    // If the current set is the last set
    // Else start rest timer, increment set, and updateWorkout
    if (currSet >= currSetTotal) {
      // If the last set of the last exercise is finished then call finishWorkout
      // Else begin next rest timer, increment currSet and currIdx, and updateWorkout
      if (currIdx >= currWorkoutPathLength - 1) {
        dispatch(finishWorkout(totalCoins, totalExp))
      } else {
        const startTime = new Date().getTime()
        const nextIdx = currIdx + 1
        const nextSet = 1

        const updatedData = {
          'runningWorkout.remainingWorkout.currIdx': nextIdx,
          'runningWorkout.remainingWorkout.currSet': nextSet,
          'runningWorkout.timer.isTimer': true,
          'runningWorkout.timer.timerStart': startTime,
          'runningWorkout.currWorkout.lastSetFailed': false,
          'runningWorkout.timeLastUpdated': new Date().getTime(),
          'runningWorkout.coins': totalCoins,
          'runningWorkout.exp': totalExp,
          'runningWorkout.currWorkout.path': updatedPath,
          'runningWorkout.totalWeight': totalWeight,
        }

        dispatch(updateWorkout(updatedData))
      }
    } else {
      const startTime = new Date().getTime()
      const nextSet = currSet + 1

      const updatedData = {
        'runningWorkout.remainingWorkout.currSet': nextSet,
        'runningWorkout.timer.isTimer': true,
        'runningWorkout.timer.timerStart': startTime,
        'runningWorkout.currWorkout.lastSetFailed': lastSetFailed || false,
        'runningWorkout.timeLastUpdated': new Date().getTime(),
        'runningWorkout.coins': totalCoins,
        'runningWorkout.exp': totalExp,
        'runningWorkout.totalWeight': totalWeight,
      }
      dispatch(updateWorkout(updatedData))
    }

    // Calculate character stats based on completed reps
    dispatch(logWorkout(completedReps))
  }
export const addWarmup = currWeight => async (dispatch, getState) => {
  const runningWorkout = getState().workout.workoutData.runningWorkout
  const currIdx = runningWorkout.remainingWorkout.currIdx
  const currPath = runningWorkout.currWorkout.path
  const barbellWeight =
    Number(getState().auth.userAccountData.barbellWeight) || 45

  const updatedPath = [...currPath]
  const currPathExercise = updatedPath[currIdx]
  updatedPath[currIdx] = {
    ...currPathExercise,
    warmupPath: createWarmupPath(barbellWeight, Number(currWeight)),
  }

  const updatedData = {
    'runningWorkout.remainingWorkout.currWarmupSetIdx': 0,
    'runningWorkout.currWorkout.isWarmupRunning': true,
    'runningWorkout.currWorkout.path': updatedPath,
  }

  dispatch(updateWorkout(updatedData))
}
export const completeWarmupSet = weight => async (dispatch, getState) => {
  const runningWorkout = getState().workout.workoutData.runningWorkout
  const currIdx = runningWorkout.remainingWorkout.currIdx
  const currWarmupSetIdx = runningWorkout.remainingWorkout.currWarmupSetIdx
  const currExercise = runningWorkout.currWorkout.path[currIdx]
  const warmupPath = currExercise.warmupPath
  const exerciseID = currExercise.exerciseID
  const numSets = warmupPath.length
  const completedReps = warmupPath[currWarmupSetIdx].reps
  const timeLastUpdated = runningWorkout.timeLastUpdated
  const elapsedTime = new Date().getTime() - timeLastUpdated

  const currCoins = runningWorkout.coins ? runningWorkout.coins : 0
  const earnedCoins = calcCoins(completedReps)
  const totalCoins = earnedCoins + currCoins
  const currExp = runningWorkout.exp ? runningWorkout.exp : 0
  const earnedExp = calcExp(completedReps)
  const totalExp = earnedExp + currExp

  const currSetID = uuidv4()

  dispatch(
    updateWorkoutStats(
      1,
      completedReps,
      weight,
      exerciseID,
      elapsedTime,
      earnedCoins,
      earnedExp,
      currSetID
    )
  )

  if (currWarmupSetIdx >= numSets - 1) {
    const updatedData = {
      'runningWorkout.remainingWorkout.currWarmupSetIdx': 0,
      'runningWorkout.currWorkout.isWarmupRunning': false,
      'runningWorkout.timeLastUpdated': new Date().getTime(),
      'runningWorkout.coins': totalCoins,
      'runningWorkout.exp': totalExp,
    }
    return dispatch(updateWorkout(updatedData))
  } else {
    const updatedData = {
      'runningWorkout.remainingWorkout.currWarmupSetIdx': currWarmupSetIdx + 1,
      'runningWorkout.timeLastUpdated': new Date().getTime(),
      'runningWorkout.coins': totalCoins,
      'runningWorkout.exp': totalExp,
    }
    return dispatch(updateWorkout(updatedData))
  }
}
export const endWarmup = () => async (dispatch, getState) => {
  const updatedData = {
    'runningWorkout.currWorkout.isWarmupRunning': false,
  }
  dispatch(updateWorkout(updatedData))
}
export const failSet =
  (newWeight, exerciseID, currSetTotal, completedReps, currWeight) =>
  async (dispatch, getState) => {
    const weights = getState().workout.workoutData.weights

    const modWeights = weights.map(weight => {
      if (weight.exerciseID === exerciseID) {
        return { ...weight, weight: newWeight }
      }
      return weight
    })
    await dispatch(
      completeSet(currSetTotal, completedReps, exerciseID, currWeight, true)
    )
    await dispatch(
      updateWorkout({
        weights: modWeights,
      })
    )
  }

const updateWeights = (weights, currWorkoutPath) => {
  const modWeights = [...weights]
  currWorkoutPath.forEach(ex => {
    const exerciseID = ex.exerciseID

    modWeights.forEach(w => {
      if (w.exerciseID === exerciseID && ex.type === 'straight') {
        w.weight += 5
      }
    })
  })
  return modWeights
}
export const addNewExerciseWeight =
  (newWeight, exerciseID) => async (dispatch, getState) => {
    const weights = getState().workout.workoutData.weights
    const newWeights = [...weights, { weight: newWeight, exerciseID }]
    dispatch(
      updateWorkout({
        weights: newWeights,
      })
    )
  }
export const addWorkoutToPastWorkouts = data => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid
  const userWorkoutDataRef = doc(db, 'workoutData', uid)
  const userPastWorkoutsRef = collection(userWorkoutDataRef, 'pastWorkouts')

  const workoutId = uuidv4()

  addDoc(userPastWorkoutsRef, { ...data, id: workoutId }).catch(err => {
    console.log('workout not added to data:', err)
    // !ERROR
  })
}
export const finishWorkout = (coins, exp) => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid
  const workoutData = getState().workout.workoutData
  const runningWorkout = workoutData.runningWorkout
  const currWorkout = runningWorkout.currWorkout
  const weights = workoutData.weights
  const newDate = new Date().getTime()
  const workoutStartTime = runningWorkout.workoutStartTime
  const totalWorkoutTime = newDate - workoutStartTime

  const exerciseIDs = new Set()

  const path = currWorkout.path
  // Get path data with weights included for pastWorkoutData stats
  const pathData = path.map(ex => {
    const exerciseID = ex.exerciseID
    exerciseIDs.add(exerciseID)
    const imageURL = exerciseList.find(ex => ex.id === exerciseID).imageURL
    let currWeight = null
    weights.forEach(w => {
      // Only update weight if the set type is straight
      if (w.exerciseID === exerciseID) {
        currWeight = w.weight
      }
    })
    return { ...ex, weight: currWeight, imageURL }
  })

  const prs = { pr1x1s: [], pr1x5s: [] }

  const exercisePRPromises = []

  exerciseIDs.forEach(id => {
    exercisePRPromises.push(getExercisePRs(id, uid))
  })

  const prRes = await Promise.all(exercisePRPromises)
  prRes.forEach(res => {
    const { pr1x1, pr1x5, exerciseID } = res
    if (pr1x1 && pr1x1.date > workoutStartTime && pr1x1.date < newDate)
      prs.pr1x1s.push({ ...pr1x1, exerciseID })
    if (pr1x5 && pr1x5.date > workoutStartTime && pr1x5.date < newDate)
      prs.pr1x5s.push({ ...pr1x5, exerciseID })
  })

  const updatedWeights = await updateWeights(
    weights,
    workoutData.runningWorkout.currWorkout.path
  )

  const updatedData = {
    isWorkoutRunning: false,
    weights: updatedWeights,
  }

  const finishedWorkoutData = {
    workoutName: currWorkout.name || 'Temp Workout',
    workoutRestTime: currWorkout.restTime,
    workoutStartTime,
    totalWorkoutTime,
    coinsEarned: coins,
    expEarned: exp,
    path: pathData,
    totalWeight: runningWorkout.totalWeight,
    prs,
  }
  dispatch(updateWorkout(updatedData))
  dispatch({ type: SET_COMPLETED_WORKOUT_DATA, payload: finishedWorkoutData })
  dispatch(setWorkoutFinished(true))
  dispatch(addWorkoutToPastWorkouts(finishedWorkoutData))
}

export const stopWorkout = () => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid
  const workoutData = getState().workout.workoutData
  const runningWorkout = workoutData.runningWorkout
  const currWorkout = runningWorkout.currWorkout
  const workoutStartTime = runningWorkout.workoutStartTime
  const timeLastUpdated = runningWorkout.timeLastUpdated
  const totalWorkoutTime = timeLastUpdated - workoutStartTime
  const weights = workoutData.weights

  const coins = runningWorkout.coins ? runningWorkout.coins : 0
  const exp = runningWorkout.exp ? runningWorkout.exp : 0

  const remainingWorkout = runningWorkout.remainingWorkout
  const { currIdx, currSet } = remainingWorkout

  const exerciseIDs = new Set()

  const path = [...currWorkout.path.slice(0, currIdx + 1)]
  // Get path data with weights included for pastWorkoutData stats
  const pathData = path.map(ex => {
    const exerciseID = ex.exerciseID
    exerciseIDs.add(exerciseID)
    const imageURL = exerciseList.find(ex => ex.id === exerciseID).imageURL
    const setPath = ex.setPath || []
    let currWeight = null
    weights.forEach(w => {
      if (w.exerciseID === exerciseID) {
        currWeight = w.weight
      }
    })
    return { ...ex, weight: currWeight, imageURL, setPath }
  })

  const prs = { pr1x1s: [], pr1x5s: [] }

  const exercisePRPromises = []

  exerciseIDs.forEach(id => {
    exercisePRPromises.push(getExercisePRs(id, uid))
  })

  const prRes = await Promise.all(exercisePRPromises)
  prRes.forEach(res => {
    const { pr1x1, pr1x5, exerciseID } = res
    if (pr1x1 && pr1x1.date > workoutStartTime && pr1x1.date < timeLastUpdated)
      prs.pr1x1s.push({ ...pr1x1, exerciseID })
    if (pr1x5 && pr1x5.date > workoutStartTime && pr1x5.date < timeLastUpdated)
      prs.pr1x5s.push({ ...pr1x5, exerciseID })
  })

  const finishedWorkoutData = {
    workoutName: currWorkout.name,
    workoutRestTime: currWorkout.restTime,
    workoutStartTime,
    totalWorkoutTime,
    coinsEarned: coins,
    expEarned: exp,
    path: pathData,
    totalWeight: runningWorkout.totalWeight,
    prs,
  }

  await dispatch(updateWorkout({ isWorkoutRunning: false }))

  // If the no sets have been completed in the workout, don't add it to past workout list
  const setsHaveBeenCompleted = currIdx > 0 || currSet > 1
  if (setsHaveBeenCompleted) {
    dispatch({ type: SET_COMPLETED_WORKOUT_DATA, payload: finishedWorkoutData })
    dispatch(setWorkoutFinished(true))
    dispatch(addWorkoutToPastWorkouts(finishedWorkoutData))
  }
}

// PAST WORKOUT DATA
export const queryPastWorkoutData =
  (order, numResults, latestDoc, descending = true) =>
  async (dispatch, getState) => {
    const uid = getState().auth.userAuth.uid
    const userWorkoutDataRef = doc(db, 'workoutData', uid)
    const userPastWorkoutsRef = collection(userWorkoutDataRef, 'pastWorkouts')

    const queriedData = []

    // If latestDoc is not pasted in, get results from beginning of collection
    let q
    if (latestDoc) {
      if (descending) {
        q = query(
          userPastWorkoutsRef,
          orderBy(order, 'desc'),
          startAfter(latestDoc),
          limit(numResults)
        )
      } else {
        q = query(
          userPastWorkoutsRef,
          orderBy(order),
          startAfter(latestDoc),
          limit(numResults)
        )
      }
    } else {
      if (descending) {
        q = query(
          userPastWorkoutsRef,
          orderBy(order, 'desc'),
          limit(numResults)
        )
      } else {
        q = query(userPastWorkoutsRef, orderBy(order), limit(numResults))
      }
    }

    const querySnapshot = await getDocs(q)
    const newLatestDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
    // If dataExists is false, will return no data response
    let dataExists
    querySnapshot.forEach(doc => {
      dataExists = true
      const data = doc.data()
      queriedData.push(data)
    })
    if (dataExists) {
      return { data: queriedData, latestDoc: newLatestDoc }
    }
    return { isResponse: false }
  }

// CREATE NEW WORKOUT

export const createWorkout = workoutData => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid
  const dateCreated = new Date().getTime()

  const userWorkoutDataRef = doc(db, 'workoutData', uid)
  const userCreatedWorkoutsRef = collection(
    userWorkoutDataRef,
    'createdWorkouts'
  )

  const workoutId = workoutData.id

  addDoc(userCreatedWorkoutsRef, { id: workoutId, dateCreated }).catch(err => {
    console.log('workout not added to data:', err)
    // !ERROR
  })

  await setDoc(doc(db, 'workouts', workoutId), {
    ...workoutData,
    authorUID: uid,
    dateCreated,
    likes: 0,
  })
}

// GET WORKOUT LIST
export const getWorkouts = (queryString, order, limit) => async () => {
  const workoutsRef = collection(db, 'workouts')

  const q = query(workoutsRef, where('name', '>=', queryString))

  const querySnapshot = await getDocs(q)
  const arr = []
  querySnapshot.forEach(doc => {
    arr.push(doc.data())
  })

  return arr
}
export const getUserWorkouts =
  (queryString, order, numResults, latestDoc) => async (dispatch, getState) => {
    const uid = getState().auth.userAuth.uid
    const userWorkoutDataRef = doc(db, 'workoutData', uid)
    const userCreatedWorkoutsRef = collection(
      userWorkoutDataRef,
      'createdWorkouts'
    )
    let userCreatedWorkoutQuery
    if (latestDoc) {
      userCreatedWorkoutQuery = query(
        userCreatedWorkoutsRef,
        orderBy('dateCreated', 'desc'),
        startAfter(latestDoc),
        limit(numResults)
      )
    } else {
      userCreatedWorkoutQuery = query(
        userCreatedWorkoutsRef,
        orderBy('dateCreated', 'desc'),
        limit(numResults)
      )
    }

    const userCreatedWorkoutIdsSnapshot = await getDocs(userCreatedWorkoutQuery)

    const userCreatedWorkoutIds = []
    userCreatedWorkoutIdsSnapshot.forEach(doc => {
      userCreatedWorkoutIds.push(doc.data().id)
    })
    const promises = []
    userCreatedWorkoutIds.forEach(id => {
      const workoutsRef = doc(db, 'workouts', id)
      promises.push(getDoc(workoutsRef))
    })

    const newLatestDoc =
      userCreatedWorkoutIdsSnapshot.docs[
        userCreatedWorkoutIdsSnapshot.docs.length - 1
      ]

    const results = await Promise.allSettled([...promises])
    const workouts = []
    results.forEach(el => {
      const data = el.value.data()
      if (data) {
        workouts.push(el.value.data())
      }
    })
    return { data: workouts, latestDoc: newLatestDoc }
  }

export const getTrendingWorkouts =
  (queryString, order, numResults, latestDoc) => async () => {
    const workoutsCollection = collection(db, 'workouts')
    let workoutsQuery
    if (latestDoc) {
      workoutsQuery = query(
        workoutsCollection,
        orderBy('likes', 'desc'),
        startAfter(latestDoc),
        limit(numResults)
      )
    } else {
      workoutsQuery = query(
        workoutsCollection,
        orderBy('likes', 'desc'),
        limit(numResults)
      )
    }

    const workoutsSnapshot = await getDocs(workoutsQuery)

    const workouts = []
    workoutsSnapshot.forEach(doc => {
      const data = doc.data()
      if (data) {
        workouts.push(doc.data())
      }
    })

    const newLatestDoc = workoutsSnapshot.docs[workoutsSnapshot.docs.length - 1]
    return { data: workouts, latestDoc: newLatestDoc }
  }

export const getUserLikedWorkouts =
  (queryString, order, numResults, latestDoc) => async (dispatch, getState) => {
    const uid = getState().auth.userAuth.uid

    const workoutLikesCollection = collection(db, 'workoutLikes')

    let likesQuery
    if (latestDoc) {
      likesQuery = query(
        workoutLikesCollection,
        where('userID', '==', uid),
        orderBy('date', 'desc'),
        startAfter(latestDoc),
        limit(numResults)
      )
    } else {
      likesQuery = query(
        workoutLikesCollection,
        where('userID', '==', uid),
        orderBy('date', 'desc'),
        limit(numResults)
      )
    }

    const likedWorkoutsSnapshot = await getDocs(likesQuery)

    const userLikedWorkoutIDs = []
    likedWorkoutsSnapshot.forEach(doc => {
      userLikedWorkoutIDs.push(doc.data().workoutID)
    })

    const promises = []
    userLikedWorkoutIDs.forEach(workoutID => {
      const workoutRef = doc(db, 'workouts', workoutID)
      promises.push(getDoc(workoutRef))
    })

    const newLatestDoc =
      likedWorkoutsSnapshot.docs[likedWorkoutsSnapshot.docs.length - 1]

    const results = await Promise.allSettled([...promises])
    const workouts = []
    results.forEach(el => {
      const data = el.value.data()
      if (data) {
        workouts.push(data)
      }
    })
    return { data: workouts, latestDoc: newLatestDoc }
  }

const deleteUserWorkoutID = async (uid, workoutID) => {
  const userWorkoutData = doc(db, 'workoutData', uid)
  const createdWorkoutsCollection = collection(
    userWorkoutData,
    'createdWorkouts'
  )

  const workoutIDQuery = query(
    createdWorkoutsCollection,
    where('id', '==', workoutID)
  )
  const workoutIDSnapshot = await getDocs(workoutIDQuery)
  let deletedDoc
  workoutIDSnapshot.forEach(doc => {
    deletedDoc = doc.ref
  })

  if (deletedDoc) {
    return await deleteDoc(deletedDoc)
  }
}
const deleteWorkoutLikes = async workoutID => {
  const workoutLikesCollection = collection(db, 'workoutLikes')
  const likesQuery = query(
    workoutLikesCollection,
    where('workoutID', '==', workoutID)
  )
  const likesSnapshot = await getDocs(likesQuery)
  const promises = []
  likesSnapshot.forEach(doc => {
    promises.push(deleteDoc(doc.ref))
  })

  if (promises.length > 0) {
    return await Promise.allSettled([...promises])
  }
}
export const deleteWorkout = workoutID => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid

  const workoutCollection = collection(db, 'workouts')

  const workoutQuery = query(
    workoutCollection,
    where('id', '==', workoutID),
    where('authorUID', '==', uid)
  )

  const workoutSnapshot = await getDocs(workoutQuery)

  let workoutDoc
  workoutSnapshot.forEach(doc => {
    workoutDoc = doc.ref
  })

  try {
    await deleteWorkoutLikes(workoutID)
    await deleteUserWorkoutID(uid, workoutID)
    await deleteDoc(workoutDoc)

    return { status: 'success' }
  } catch (err) {
    console.error(err)
    return { err }
  }
}

export const isWorkoutLiked = workoutID => async (dispatch, getState) => {
  const uid = getState().auth.userAuth.uid

  const workoutLikesColl = collection(db, 'workoutLikes')
  const workoutLikesQuery = query(
    workoutLikesColl,
    where('userID', '==', uid),
    where('workoutID', '==', workoutID)
  )
  const workoutLikesSnapshot = await getDocs(workoutLikesQuery)

  return !workoutLikesSnapshot.empty
}

export const toggleLikeWorkout =
  (workoutID, isLiked) => async (dispatch, getState) => {
    const uid = getState().auth.userAuth.uid

    if (isLiked) {
      const workoutLikesColl = collection(db, 'workoutLikes')
      const workoutLikesQuery = query(
        workoutLikesColl,
        where('userID', '==', uid),
        where('workoutID', '==', workoutID)
      )
      const workoutLikesSnapshot = await getDocs(workoutLikesQuery)

      let deletedDoc
      workoutLikesSnapshot.forEach(doc => {
        deletedDoc = doc.ref
      })

      await deleteDoc(deletedDoc)
    } else {
      const likeID = uuidv4()

      const workoutLikesRef = doc(db, 'workoutLikes', likeID)

      await setDoc(workoutLikesRef, {
        id: likeID,
        userID: uid,
        workoutID: workoutID,
        date: new Date().getTime(),
      })
    }

    const workoutDoc = doc(db, 'workouts', workoutID)
    if (isLiked) {
      await updateDoc(workoutDoc, {
        likes: increment(-1),
      })
    } else {
      await updateDoc(workoutDoc, {
        likes: increment(1),
      })
    }
    return !isLiked
  }
