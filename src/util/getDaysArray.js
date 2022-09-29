import { formatDateMonthDay } from './formatDate'

export const getDaysArray = (s, e) => {
  let start = new Date(s)
  let end = new Date(e)

  console.log(start, end)

  const arr = []
  while (start <= end) {
    const currStart = new Date(start)
    const formatedDate = formatDateMonthDay(currStart)
    arr.push(formatedDate)
    start.setDate(start.getDate() + 1)
  }

  return arr
}

export const getTimeSpanData = (timeSpan, data) => {
  let timeSpanData = []
  const endDate = new Date().getTime()
  let startDate = new Date()

  let hash = Object.create(null)
  for (let { date, weight } of data) {
    const currDay = new Date(Number(date)).toISOString().substring(0, 10)
    if (hash[currDay]) {
      if (hash[currDay].date < date) {
        hash[currDay] = { date, weight }
      }
    } else {
      hash[currDay] = { date, weight }
    }
  }

  switch (timeSpan.value) {
    case 'week':
      startDate.setDate(startDate.getDate() - 7)
      break
    case 'month':
      startDate.setMonth(startDate.getMonth() - 1)
      break
    case 'six-month':
      startDate.setMonth(startDate.getMonth() - 6)
      break
    case 'year':
      startDate.setYear(startDate.getFullYear() - 1)
      startDate.setDate(startDate.getDate() + 1)
      break
    case 'all':
      console.log('???')
      startDate = Math.min.apply(
        Math,
        data.map(o => o.date)
      )
      break
    default:
      break
  }

  timeSpanData = Object.entries(hash)
    .map(([dateDay, weightObj]) => ({
      weight: weightObj.weight,
      date: weightObj.date,
    }))
    .filter(el => el.date >= startDate)
    .map(el => {
      const currDate = el.date
      const weight = el.weight
      return {
        ...el,
        x: formatDateMonthDay(currDate),
        y: weight,
      }
    })
    .sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0))
  console.log(startDate, endDate)
  return {
    labels: getDaysArray(startDate, endDate),
    data: timeSpanData,
  }
}
