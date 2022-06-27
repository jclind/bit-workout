export const formatDate = time => {
  const date = new Date(time)

  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month}/${day}/${year}`
}

// Code from @bbrame https://stackoverflow.com/a/8888498/12269295
export const formatAMPM = d => {
  const date = new Date(d)
  console.log(d)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? '0' + minutes : minutes

  return hours + ':' + minutes + ampm
}

export const formatDateMonthDay = time => {
  const date = new Date(time)
  const day = date.getDate()
  const month = date.getMonth() + 1

  return `${month}/${day}`
}

export const formatYearMonthDay = time => {
  const date = new Date(time)

  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()

  return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`
}
