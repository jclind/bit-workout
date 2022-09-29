import React from 'react'
import { Line } from 'react-chartjs-2'

const SingleExerciseStatsChart = ({
  options,
  data,
  selectedTimeSpan,
  setSelectedTimeSpan,
  timeSpanOptions,
}) => {
  return (
    <div className='weight-data page'>
      <div className='settings-title'>Weight</div>
      <div className='options'>
        {/* <WeightChartOptions
          selectedTimeSpan={selectedTimeSpan}
          setSelectedTimeSpan={setSelectedTimeSpan}
          timeSpanOptions={timeSpanOptions}
        /> */}
      </div>
      <div className='chart-container'>
        <Line options={options} data={data} />
      </div>
    </div>
  )
}

export default SingleExerciseStatsChart
