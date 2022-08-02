export const timeToMS = (minutes, seconds) => {
  let ms = 0

  ms += minutes ? minutes * 60000 : 0
  ms += seconds ? seconds * 1000 : 0

  return ms
}
