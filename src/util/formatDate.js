export const formatDate = time => {
  const date = new Date(time)

  const month = date.getMonth() + 1
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month}/${day}/${year}`
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
