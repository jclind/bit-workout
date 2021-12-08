export const estimateTime = exercise => {
  const restTime = exercise.restTime
  const timeForEachSet = 45000
  const numSets = exercise.path.reduce((prev, curr) => {
    return prev + curr.sets
  }, 0)

  const totalTime = (restTime + timeForEachSet) * numSets
  return totalTime
}
