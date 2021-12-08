export const msToTime = duration => {
  let minutes = Math.round(Math.floor((duration / (1000 * 60)) % 60) / 5) * 5,
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  console.log(minutes)

  if (hours !== 0) {
    hours = hours < 10 ? '0' + hours : hours
  } else {
    hours = null
  }
  minutes = minutes < 10 ? '0' + minutes : minutes

  return (hours && hours + 'hr, ') + minutes + 'min'
}
