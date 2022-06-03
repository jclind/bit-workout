export const formatTime = timeMS => {
  let m,
    s = 0
  m = Math.floor(timeMS / 60000)
  s = ((timeMS % 60000) / 1000).toFixed(0)

  return `${m}:${s < 10 ? '0' : ''}${s}`
}

export const formatTimeToObject = timeMS => {
  let h,
    m,
    s = 0
  m = Math.floor((timeMS % 3600000) / 60000)
  s = ((timeMS % 60000) / 1000).toFixed(0)
  h = Math.floor((timeMS / (1000 * 60 * 60)) % 24)

  return { h, m, s }
}
