import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import WeightChartOptions from '../../../components/AccountComponents/WeightData/WeightChartOptions/WeightChartOptions'

const WeightData = ({
  options,
  data,
  selectedTimeSpan,
  setSelectedTimeSpan,
  timeSpanOptions,
}) => {
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
