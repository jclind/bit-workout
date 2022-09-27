export const msToTime = duration => {
  let minutes = Math.round(Math.floor((duration / (1000 * 60)) % 60) / 5) * 5,
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  if (hours === 0) {
    hours = null
  }

  minutes = minutes < 10 && hours ? '0' + minutes : minutes

  return (hours ? hours + 'hr, ' : '') + minutes + 'min'
}

export const msToDayHour = duration => {
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
    days = Math.floor(duration / (1000 * 60 * 60 * 24))

  if (days === 0) {
    days = null
  }

  return (days ? days + 'd, ' : '') + (hours ? hours + 'h' : '')
}
