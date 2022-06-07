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
import { connect } from 'react-redux'
Chart.register(...registerables)

const WeightData = ({ weightData }) => {
  const timeSpanOptions = [
    { value: 'week', label: 'W' },
    { value: 'month', label: 'M' },
    { value: 'six-month', label: '6M' },
    { value: 'year', label: 'Y' },
    { value: 'all', label: 'A' },
  ]

  const [selectedTimeSpan, setSelectedTimeSpan] = useState(timeSpanOptions[0])

  const timeSpanData = getTimeSpanData(selectedTimeSpan, weightData)
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
        radius:
          selectedTimeSpan.value === 'week' || weightData.length < 3 ? 3 : 0,
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

const mapStateToProps = state => {
  const weights = state.auth.userAccountData.weight

  let weightsArray = []
  if (!Array.isArray(weights)) {
    const createdDate = state.auth.userAuth.createdAd
    const weight = state.auth.userAccountData.weight
    weightsArray = [{ date: createdDate, weight }]
  } else {
    weightsArray = weights
  }
  console.log(weightsArray)
  return {
    weightData: weightsArray,
  }
}

export default connect(mapStateToProps)(WeightData)
