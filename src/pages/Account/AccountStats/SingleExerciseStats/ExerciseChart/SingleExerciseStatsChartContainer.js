import React, { useState } from 'react'
import { getTimeSpanData } from '../../../../../util/getDaysArray'
import colors from '../../../../../helpers.scss'
import SingleExerciseStatsChart from './SingleExerciseStatsChart'

const tempData = [
  { weight: 50, date: 1664239087521, reps: 5 },
  { weight: 55, date: 1664066215521, reps: 5 },
  { weight: 60, date: 1663893343521, reps: 5 },
  { weight: 65, date: 1663720471521, reps: 5 },
  { weight: 70, date: 1663547599521, reps: 5 },
  { weight: 75, date: 1663374727521, reps: 5 },
  { weight: 80, date: 1663201855521, reps: 5 },
  { weight: 85, date: 1663028983521, reps: 5 },
  { weight: 90, date: 1662856111521, reps: 5 },
  { weight: 95, date: 1662683239521, reps: 5 },
  { weight: 100, date: 1662510367521, reps: 5 },
  { weight: 105, date: 1662337495521, reps: 5 },
  { weight: 110, date: 1662164623521, reps: 5 },
  { weight: 115, date: 1661991751521, reps: 5 },
  { weight: 120, date: 1661818879521, reps: 5 },
  { weight: 125, date: 1661646007521, reps: 5 },
  { weight: 130, date: 1661473135521, reps: 5 },
  { weight: 135, date: 1661300263521, reps: 5 },
  { weight: 140, date: 1661127391521, reps: 5 },
  { weight: 145, date: 1660954519521, reps: 5 },
  { weight: 150, date: 1660781647521, reps: 5 },
  { weight: 155, date: 1660608775521, reps: 5 },
  { weight: 160, date: 1660435903521, reps: 5 },
  { weight: 165, date: 1660263031521, reps: 5 },
  { weight: 170, date: 1660090159521, reps: 5 },
  { weight: 175, date: 1659917287521, reps: 5 },
  { weight: 180, date: 1659744415521, reps: 5 },
  { weight: 185, date: 1659571543521, reps: 5 },
  { weight: 190, date: 1659398671521, reps: 5 },
  { weight: 195, date: 1659225799521, reps: 5 },
]
const timeSpanOptions = [
  { value: 'month', label: 'M' },
  { value: 'six-month', label: '6M' },
  { value: 'year', label: 'Y' },
  { value: 'all', label: 'A' },
]

const SingleExerciseChartContainer = () => {
  const [selectedTimeSpan, setSelectedTimeSpan] = useState(timeSpanOptions[0])

  const timeSpanData = getTimeSpanData({ value: 'all', label: 'A' }, tempData)
  const labels = timeSpanData.labels
  const chartData = timeSpanData.data
  console.log(labels, chartData)

  const maxDataVal = Math.max.apply(
    Math,
    tempData.map(o => Number(o.weight))
  )
  const minDataVal = Math.min.apply(
    Math,
    tempData.map(o => Number(o.weight))
  )

  const options = {
    scales: {
      y: {
        max: maxDataVal + 5,
        min: minDataVal - 5,
      },
      x: {
        offset: true,
        grid: {
          offset: true,
        },
        ticks: {
          display: true,
          autoSkip: true,
          maxTicksLimit: 6,
        },
      },
    },
    // elements: {
    //   point: {
    //     radius:
    //       selectedTimeSpan.value === 'week' || chartData.length <= 3 ? 3 : 0,
    //   },
    // },
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }
  const data = {
    labels: labels,
    datasets: [
      {
        data: chartData,
        borderColor: colors.secondaryColor,
        backgroundColor: colors.secondaryColor,
      },
    ],
  }

  return (
    <SingleExerciseStatsChart
      options={options}
      data={data}
      selectedTimeSpan={selectedTimeSpan}
      setSelectedTimeSpan={setSelectedTimeSpan}
      timeSpanOptions={timeSpanOptions}
    />
  )
}

export default SingleExerciseChartContainer
