export const calculatePlates = (barWeight, totalWeight) => {
  if (barWeight > totalWeight) {
    barWeight = 5
  }

  // Get weight that will be on each side of the bar (hence '/ 2')
  const remTotWeight = (totalWeight - barWeight) / 2

  const w45 = Math.floor(remTotWeight / 45)
  const w25 = Math.floor((remTotWeight % 45) / 25)
  const w10 = Math.floor(((remTotWeight % 45) % 25) / 10)
  const w5 = Math.floor((((remTotWeight % 45) % 25) % 10) / 5)
  const w2_5 = Math.floor(((((remTotWeight % 45) % 25) % 10) % 5) / 2.5)

  return [
    { name: '45', amount: w45 },
    { name: '25', amount: w25 },
    { name: '10', amount: w10 },
    { name: '5', amount: w5 },
    { name: '2.5', amount: w2_5 },
  ]
}
