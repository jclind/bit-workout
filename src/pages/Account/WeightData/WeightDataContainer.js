import React, { useState } from 'react'
import './WeightData.scss'
import { getTimeSpanData } from '../../../util/getDaysArray'
import colors from '../../../helpers.scss'
import { Chart, registerables } from 'chart.js'
import { connect } from 'react-redux'
import WeightData from './WeightData'
Chart.register(...registerables)

const WeightDataContainer = ({ weightData }) => {
  const timeSpanOptions = [
    { value: 'week', label: 'W' },
    { value: 'month', label: 'M' },
    { value: 'six-month', label: '6M' },
    { value: 'year', label: 'Y' },
    { value: 'all', label: 'A' },
  ]

  const [selectedTimeSpan, setSelectedTimeSpan] = useState(
    timeSpanOptions[0].value
  )
  const timeSpanData = getTimeSpanData(selectedTimeSpan, weightData)
  const labels = timeSpanData.labels
  const chartData = timeSpanData.data

  const maxDataVal = Math.max.apply(
    Math,
    chartData.map(o => Number(o.weight))
  )
  const minDataVal = Math.min.apply(
    Math,
    chartData.map(o => Number(o.weight))
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
    elements: {
      point: {
        radius:
          selectedTimeSpan.value === 'week' || chartData.length <= 3 ? 3 : 0,
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
    <WeightData
      options={options}
      data={data}
      selectedTimeSpan={selectedTimeSpan}
      setSelectedTimeSpan={setSelectedTimeSpan}
      timeSpanOptions={timeSpanOptions}
    />
  )
}

const mapStateToProps = state => {
  const weights = state.auth.userAccountData.weight

  let weightsArray = []
  if (!Array.isArray(weights)) {
    const createdDate = state.auth.userAuth.createdAt
    const weight = Number(state.auth.userAccountData.weight)
    weightsArray = [{ date: createdDate, weight }]
  } else {
    weightsArray = weights.map(w => {
      return { ...w, weight: Number(w.weight) }
    })
  }
  return {
    weightData: weightsArray,
  }
}

export default connect(mapStateToProps)(WeightDataContainer)
