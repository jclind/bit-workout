export const formatTime = timeMS => {
  let m,
    s = 0
  m = Math.floor(timeMS / 60000)
  s = ((timeMS % 60000) / 1000).toFixed(0)

  return `${m}:${s < 10 ? '0' : ''}${s}`
}
