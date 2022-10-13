import React, { useState } from 'react'
import { getTimeSpanData } from '../../../../../util/getDaysArray'
import colors from '../../../../../helpers.scss'
import SingleExerciseStatsChart from './SingleExerciseStatsChart'
import { connect } from 'react-redux'
import { queryChartData } from '../../../../../redux/actions/stats/stats'
import { useEffect } from 'react'

const timeSpanOptions = [
  { value: 'month', label: 'M' },
  { value: 'six-month', label: '6M' },
  { value: 'year', label: 'Y' },
  { value: 'all', label: 'A' },
]

const SingleExerciseChartContainer = ({ exerciseID, queryChartData }) => {
  const [queriedData, setQueriedData] = useState([])
  const [loading, setLoading] = useState(true)

  const isData = !loading && queriedData.length > 0

  useEffect(() => {
    const startDate = new Date()
    startDate.setMonth(startDate.getMonth() - 1)

    queryChartData(exerciseID, null, null, startDate.getTime()).then(res => {
      setQueriedData(res.data)
      setLoading(false)
    })
  }, [])

  const [selectedTimeSpan, setSelectedTimeSpan] = useState(timeSpanOptions[0])

  if (loading) return 'loading'

  const timeSpanData = isData && getTimeSpanData(selectedTimeSpan, queriedData)
  console.log(timeSpanData)
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
    queriedData.map(o => Number(o.weight))
  )
  const minDataVal = Math.min.apply(
    Math,
    queriedData.map(o => Number(o.weight))
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

const mapDispatchToProps = dispatch => {
  return {
    queryChartData: (exerciseID, numResults, latestDoc, endDate) =>
      dispatch(queryChartData(exerciseID, numResults, latestDoc, endDate)),
  }
}

export default connect(null, mapDispatchToProps)(SingleExerciseChartContainer)
