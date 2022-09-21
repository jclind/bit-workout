import { roundNumber } from './roundNumber'

export const createWarmupPath = (startWeight, endWeight) => {
  const weightDifference = endWeight - startWeight
  let divisor = 4
  if (weightDifference < 40) {
    divisor = 2
  } else if (weightDifference < 80) {
    divisor = 3
  } else if (weightDifference < 120) {
    divisor = 4
  }

  const weightBetweenSets = weightDifference / divisor
  let sets = [{ weight: startWeight, reps: 5 }]
  for (let i = 0; i < divisor; i++) {
    const weight = roundNumber(startWeight + weightBetweenSets * i, 5)
    if (i <= 1) {
      sets.push({ weight, reps: 5 })
    } else if (i === 2) {
      sets.push({ weight, reps: 3 })
    } else if (i >= 3) {
      sets.push({ weight, reps: 2 })
    }
  }
  return sets
}
