import { doc, increment, updateDoc } from 'firebase/firestore'
import { db } from '../../../firebase'

// export const incCurrWorkoutStats = (
//   currWorkoutStats,
//   incSets,
//   incReps,
//   weight,
//   exerciseID,
//   incTotalTime,
//   incCoins,
//   incExp
// ) => {
// const workoutStats = currWorkoutStats
//   ? currWorkoutStats
//   : {
//       totalStats: {
//         totalReps: 0,
//         totalSets: 0,
//         totalWorkoutTime: 0,
//       },
//       exerciseStats: [],
//     }
// if (incTotalTime) {
//   workoutStats.totalStats.totalWorkoutTime =
//     Number(workoutStats.totalStats.totalWorkoutTime) + Number(incTotalTime)
// }
// if (exerciseID || exerciseID === 0) {
//   if (
//     workoutStats.exerciseStats.findIndex(
//       exercise => exercise.exerciseID === exerciseID
//     ) === -1
//   ) {
//     workoutStats.exerciseStats.push({
//       exerciseID,
//       totalReps: 0,
//       totalSets: 0,
//       totalWeightLifted: 0,
//     })
//   }
//   const exerciseStatsIdx = workoutStats.exerciseStats.findIndex(
//     exercise => exercise.exerciseID === exerciseID
//   )
//   if (incSets) {
//     workoutStats.totalStats.totalSets += 1
//     workoutStats.exerciseStats[exerciseStatsIdx].totalSets =
//       Number(workoutStats.exerciseStats[exerciseStatsIdx].totalSets) + 1
//   }
//   let isNewPR1x1 = false
//   if (weight) {
//     const netWeightInc = Number(weight) * Number(incReps)
//     const totalWeightLifted =
//       Number(workoutStats.totalStats.totalWeightLifted) || 0
//     workoutStats.totalStats.totalWeightLifted =
//       Number(totalWeightLifted) + Number(netWeightInc)

//     const prevExerciseWeightLifted =
//       Number(workoutStats.totalStats.totalWeightLifted) || 0
//     const totalExerciseWeightLifted =
//       Number(prevExerciseWeightLifted) + Number(netWeightInc)

//     const currPR1x1 = workoutStats.exerciseStats[exerciseStatsIdx].pr1x1 || {
//       weight: 0,
//       date: null,
//     }
//     if (weight > currPR1x1.weight) isNewPR1x1 = true
//     const newPR1x1 =
//       weight > currPR1x1.weight
//         ? { weight, date: new Date().getTime() }
//         : currPR1x1

//     const currPR1x5 = workoutStats.exerciseStats[exerciseStatsIdx].pr1x5 || {
//       weight: 0,
//       date: null,
//     }
//     let newPR1x5 = currPR1x5
//     if (incReps >= 5 && weight > currPR1x5.weight) {
//       newPR1x5 = { weight, date: new Date().getTime() }
//     }

//     workoutStats.exerciseStats[exerciseStatsIdx] = {
//       ...workoutStats.exerciseStats[exerciseStatsIdx],
//       totalExerciseWeightLifted,
//       pr1x1: newPR1x1,
//       pr1x5: newPR1x5,
//     }
//   }
//   if (incReps) {
//     workoutStats.totalStats.totalReps += Number(incReps)
//     workoutStats.exerciseStats[exerciseStatsIdx].totalReps =
//       Number(workoutStats.exerciseStats[exerciseStatsIdx].totalReps) +
//       Number(incReps)
//     const date = new Date().getTime()
//     const completedSetsPath =
//       workoutStats.exerciseStats[exerciseStatsIdx]?.completedSetsPath ?? []
//     const completedSetData = {
//       reps: Number(incReps),
//       date: date,
//       weight,
//       isNewPR1x1,
//     }
//     if (completedSetsPath.length > 0) {
//       workoutStats.exerciseStats[exerciseStatsIdx].completedSetsPath.push(
//         completedSetData
//       )
//     } else {
//       workoutStats.exerciseStats[exerciseStatsIdx].completedSetsPath = [
//         completedSetData,
//       ]
//     }
//   }

export const incCurrWorkoutStats =
  (
    incSets = 0,
    incReps = 0,
    weight = 0,
    exerciseID,
    incTotalTime = 0,
    incCoins = 0,
    incExp = 0
  ) =>
  async (dispatch, getState) => {
    const uid = getState().auth.userAuth.uid

    const userStatsRef = doc(db, 'userStats', uid)
    await updateDoc(userStatsRef, {
      totalSets: increment(Number(incSets)),
      totalReps: increment(Number(incReps)),
      totalWeightLifted: increment(Number(weight)),
      totalWorkoutTime: increment(Number(incTotalTime)),
      totalCoins: increment(Number(incCoins)),
      totalExp: increment(Number(incExp)),
    })
  }

export const setAccountStats = data => async (dispatch, getState) => {
  // const currUserStats = {
  //   ...getState().auth.userAccountData,
  //   [prop]: val,
  // }

  const uid = getState().auth.userAuth.uid

  const userStatsRef = doc(db, 'userStats', uid)
  await updateDoc(userStatsRef, {
    ...data,
  })

  // dispatch(updateUserAccountData({ prop: 'accountStats', val: data }))
}
