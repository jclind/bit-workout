import React, { useState } from 'react'
import { getTimeSpanData } from '../../../../../util/getDaysArray'
import colors from '../../../../../helpers.scss'
import SingleExerciseStatsChart from './SingleExerciseStatsChart'

// const tempData = [
//   { weight: 50, date: 1664239087521, reps: 5 },
//   { weight: 55, date: 1664066215521, reps: 5 },
//   { weight: 60, date: 1663893343521, reps: 5 },
//   { weight: 65, date: 1663720471521, reps: 5 },
//   { weight: 70, date: 1663547599521, reps: 5 },
//   { weight: 75, date: 1663374727521, reps: 5 },
//   { weight: 80, date: 1663201855521, reps: 5 },
//   { weight: 85, date: 1663028983521, reps: 5 },
//   { weight: 90, date: 1662856111521, reps: 5 },
//   { weight: 95, date: 1662683239521, reps: 5 },
//   { weight: 100, date: 1662510367521, reps: 5 },
//   { weight: 105, date: 1662337495521, reps: 5 },
//   { weight: 110, date: 1662164623521, reps: 5 },
//   { weight: 115, date: 1661991751521, reps: 5 },
//   { weight: 120, date: 1661818879521, reps: 5 },
//   { weight: 125, date: 1661646007521, reps: 5 },
//   { weight: 130, date: 1661473135521, reps: 5 },
//   { weight: 135, date: 1661300263521, reps: 5 },
//   { weight: 140, date: 1661127391521, reps: 5 },
//   { weight: 145, date: 1660954519521, reps: 5 },
//   { weight: 150, date: 1660781647521, reps: 5 },
//   { weight: 155, date: 1660608775521, reps: 5 },
//   { weight: 160, date: 1660435903521, reps: 5 },
//   { weight: 165, date: 1660263031521, reps: 5 },
//   { weight: 170, date: 1660090159521, reps: 5 },
//   { weight: 175, date: 1659917287521, reps: 5 },
//   { weight: 180, date: 1659744415521, reps: 5 },
//   { weight: 185, date: 1659571543521, reps: 5 },
//   { weight: 190, date: 1659398671521, reps: 5 },
//   { weight: 195, date: 1659225799521, reps: 5 },
// ]
const timeSpanOptions = [
  { value: 'month', label: 'M' },
  { value: 'six-month', label: '6M' },
  { value: 'year', label: 'Y' },
  { value: 'all', label: 'A' },
]

const SingleExerciseChartContainer = ({ pathData = [] }) => {
  const isData = pathData.length > 0

  const [selectedTimeSpan, setSelectedTimeSpan] = useState(timeSpanOptions[0])

  const timeSpanData = isData && getTimeSpanData(selectedTimeSpan, pathData)
  const labels = isData && timeSpanData.labels
  const chartData = isData && timeSpanData.data

  const pointRadiusArr =
    isData &&
    chartData.map((el, idx, arr) => {
      if (arr.length <= 15) return 3

      const endIdx = arr.length - 1
      const pointIdxs = [
        0,
        Math.round(endIdx / 8),
        Math.round(endIdx / 4),
        Math.round((endIdx * 3) / 8),
        Math.round(endIdx / 2),
        Math.round((endIdx * 5) / 8),
        Math.round((endIdx * 3) / 4),
        Math.round((endIdx * 7) / 8),
        endIdx,
      ]
      if (pointIdxs.find(el => el === idx) !== undefined) {
        return 3
      }
      return 0
    })

  const maxDataVal = Math.max.apply(
    Math,
    pathData.map(o => Number(o.weight))
  )
  const minDataVal = Math.min.apply(
    Math,
    pathData.map(o => Number(o.weight))
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
        data: chartData || [],
        borderColor: colors.secondaryColor,
        backgroundColor: colors.secondaryColor,
        pointRadius: pointRadiusArr,
      },
    ],
  }

  return (
    <>
      <SingleExerciseStatsChart
        options={options}
        data={data}
        selectedTimeSpan={selectedTimeSpan}
        setSelectedTimeSpan={setSelectedTimeSpan}
        timeSpanOptions={timeSpanOptions}
        isData={isData}
      />
    </>
  )
}

export default SingleExerciseChartContainer
