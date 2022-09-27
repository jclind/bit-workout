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
  let hours = ((duration / (1000 * 60 * 60)) % 24).toFixed(1),
    days = Math.floor(duration / (1000 * 60 * 60 * 24))

  return (days ? days + 'd, ' : '') + (hours ? hours + 'h' : '')
}
