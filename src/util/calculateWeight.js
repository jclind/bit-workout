import { roundNumber } from './roundNumber'

export const calculateWeight = (exercise, bodyWeight, gender) => {
  const ex = exercise.toLowerCase()

  const calcSquat = (bodyWeight, gender) => {
    if (gender === 'male') {
      if (bodyWeight < 110) {
        return 70
      } else if (bodyWeight > 320) {
        return 150
      }
      return roundNumber(1.045 * bodyWeight - 43.9, 5)
    }
    if (bodyWeight < 90) {
      return 45
    } else if (bodyWeight > 260) {
      return 120
    }
    return roundNumber(0.44 * bodyWeight + 5.3, 5)
  }
  const calcBenchPress = (bodyWeight, gender) => {
    if (gender === 'male') {
      if (bodyWeight < 110) {
        return 50
      } else if (bodyWeight > 310) {
        return 200
      }
      return roundNumber(0.85 * bodyWeight - 43.5, 5)
    }
    if (bodyWeight < 90) {
      return 20
    } else if (bodyWeight > 260) {
      return 80
    }
    return roundNumber(0.36 * bodyWeight - 12.3, 5)
  }
  const calcDeadlift = (bodyWeight, gender) => {
    if (gender === 'male') {
      if (bodyWeight < 110) {
        return 90
      } else if (bodyWeight > 310) {
        return 300
      }
      return roundNumber(1.28 * bodyWeight - 50, 5)
    }
    if (bodyWeight < 90) {
      return 55
    } else if (bodyWeight > 260) {
      return 145
    }
    return roundNumber(0.53 * bodyWeight + 7.4, 5)
  }
  const calcBarbellRow = (bodyWeight, gender) => {
    if (gender === 'male') {
      if (bodyWeight < 110) {
        return 45
      } else if (bodyWeight > 310) {
        return 185
      }
      return roundNumber(0.7 * bodyWeight - 32, 5)
    }
    if (bodyWeight < 90) {
      return 25
    } else if (bodyWeight > 260) {
      return 55
    }
    return roundNumber(0.18 * bodyWeight + 9.1, 5)
  }
  const calcOverheadPress = (bodyWeight, gender) => {
    if (gender === 'male') {
      if (bodyWeight < 110) {
        return 30
      } else if (bodyWeight > 310) {
        return 140
      }
      roundNumber(0.55 * bodyWeight - 30.5, 5)
    }
    if (bodyWeight < 90) {
      return 15
    } else if (bodyWeight > 260) {
      return 50
    }
    return roundNumber(0.21 * bodyWeight - 3.5, 5)
  }

  switch (exercise) {
    case ex === 'squat':
      return calcSquat(bodyWeight, gender)

    case ex === 'bench press':
      return calcBenchPress(bodyWeight, gender)
    case ex === 'deadlift':
      return calcDeadlift(bodyWeight, gender)
    case ex === 'barbell row':
      return calcBarbellRow(bodyWeight, gender)
    case ex === 'overhead press':
      return calcOverheadPress(bodyWeight, gender)

    default:
      console.log('help me! there is no case in that switch statement for me!')
  }
}
