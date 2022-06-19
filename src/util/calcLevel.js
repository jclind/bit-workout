const X = 0.3
const Y = 2

export const calcLevel = exp => {
  return X * Math.pow(exp, 1 / Y)
}
export const calcExp = level => {
  return Math.floor(Math.pow(level / X, Y))
}

export const expToAdvanceFrom = level => {
  const nextLevel = level + 1
  const nextLevelExp = calcExp(nextLevel)
  const currLevelExp = calcExp(level)

  return nextLevelExp - currLevelExp
}

export const expToLevelAndDifference = totalExp => {
  let expLeft = totalExp
  let level = 0
  while (expLeft >= 0) {
    expLeft = expLeft - expToAdvanceFrom(level)
    level++
  }
  if (expLeft < 0) level--

  const expThroughCurrLevel = totalExp - calcExp(level)
  const levelDifference = calcExp(level + 1) - calcExp(level)
  return { level, expThroughCurrLevel, levelDifference }
}
