export const trimString = (str, numChars, addEllipsis) => {
  let subStr = str.substring(0, numChars).trim()
  if (addEllipsis) {
    subStr += '...'
  }
  return subStr
}
