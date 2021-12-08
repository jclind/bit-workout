import { roundNumber } from './roundNumber'

export const calculateWeight = (exercise, bodyWeight, gender) => {
  const ex = exercise.toLowerCase()

  switch (exercise) {
    case ex === 'squat':
      if (gender === 'male') {
        if (bodyWeight < 110) {
          return 70
        } else if (bodyWeight > 320) {
          return 150
        }
        return roundNumber(0.48 * bodyWeight + 14.4, 5)
      }
      if (bodyWeight < 90) {
        return 45
      } else if (bodyWeight > 260) {
        return 120
      }
      return roundNumber(0.45 * bodyWeight + 4.2, 5)
    // case ex === 'bench press':

    default:
      console.log('help me! there is no case in that switch statement for me!')
  }
}
