import React from 'react'
import './WeightData.scss'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'

import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const WeightData = () => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  }
  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ]

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Second dataset',
        // data: [33, 25, 35, 51, 54, 76],
        data: [43],
        fill: false,
        borderColor: '#742774',
      },
    ],
  }

  return (
    <div className='weight-data page'>
      <div className='settings-title'>Weight</div>
      <div className='chart-container'>
        <Line data={data} options={options} />
      </div>
      <BackButton />
    </div>
  )
}

export default WeightData
