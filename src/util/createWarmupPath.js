import { roundNumber } from './roundNumber'

export const createWarmupPath = (startWeight, endWeight) => {
  const weightDifference = endWeight - startWeight
  let divisor = 4
  if (weightDifference < 20) {
    divisor = 1
  } else if (weightDifference < 50) {
    divisor = 2
  } else if (weightDifference < 80) {
    divisor = 3
  }

  const weightBetweenSets = weightDifference / divisor
  console.log(weightBetweenSets)
  let sets = []
  for (let i = 0; i < divisor; i++) {
    const weight = roundNumber(startWeight + weightBetweenSets * i, 5)
    if (i <= 1) {
      sets.push({ weight, sets: 5 })
    } else if (i === 2) {
      sets.push({ weight, sets: 3 })
    } else if (i >= 3) {
      sets.push({ weight, sets: 2 })
    }
  }
  console.log(sets)
}
