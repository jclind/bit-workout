export const estimateTime = exercise => {
  const restTime = Number(exercise.restTime)
  const timeForEachSet = 55000
  const numSets = exercise.path.reduce((prev, curr) => {
    return Number(prev) + Number(curr.sets.length)
  }, 0)
  const totalTime = (restTime + timeForEachSet) * numSets
  return totalTime
}
