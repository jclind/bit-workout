import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './WeightData.scss'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import { getTimeSpanData } from '../../../util/getDaysArray'
import WeightChartOptions from '../../../components/AccountComponents/WeightData/WeightChartOptions/WeightChartOptions'
import { Line } from 'react-chartjs-2'
import colors from '../../../helpers.scss'
import { AiOutlinePlus } from 'react-icons/ai'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const WeightData = () => {
  const timeSpanOptions = [
    { value: 'week', label: 'W' },
    { value: 'month', label: 'M' },
    { value: 'six-month', label: '6M' },
    { value: 'year', label: 'Y' },
    { value: 'all', label: 'A' },
  ]

  const [selectedTimeSpan, setSelectedTimeSpan] = useState(timeSpanOptions[0])

  const tempData = [
    { date: 1651273676214, weight: 144 },
    { date: 1651100876214, weight: 143.2 },
    { date: 1650928076214, weight: 142 },
    { date: 1650755276214, weight: 139.6 },
    { date: 1650582476214, weight: 136.9 },
    { date: 1650409676214, weight: 136.2 },
    { date: 1650236876214, weight: 132 },
    { date: 1649891276214, weight: 130 },
    { date: 1648891276214, weight: 130 },
    { date: 1647891276214, weight: 129 },
  ]

  const timeSpanData = getTimeSpanData(selectedTimeSpan, tempData)
  const labels = timeSpanData.labels
  const chartData = timeSpanData.data

  const maxDataVal = Math.max.apply(
    Math,
    chartData.map(o => o.weight)
  )
  const minDataVal = Math.min.apply(
    Math,
    chartData.map(o => o.weight)
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
        radius: selectedTimeSpan.value === 'week' ? 3 : 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  }

  // console.log(labels)
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
    <div className='weight-data page'>
      <div className='settings-title'>Weight</div>
      <Link to='/account/weight/add-weight'>
        <button className='add-weight'>
          <AiOutlinePlus className='icon' />
        </button>
      </Link>
      <div className='options'>
        <WeightChartOptions
          selectedTimeSpan={selectedTimeSpan}
          setSelectedTimeSpan={setSelectedTimeSpan}
          timeSpanOptions={timeSpanOptions}
        />
      </div>
      <div className='chart-container'>
        <Line options={options} data={data} />
      </div>
      <BackButton />
    </div>
  )
}

export default WeightData
