export const formatDate = time => {
  const date = new Date(time)

  const month = date.getMonth()
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month}/${day}/${year}`
}
