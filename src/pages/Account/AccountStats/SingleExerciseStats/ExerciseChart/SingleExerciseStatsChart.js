import React from 'react'
import { Line } from 'react-chartjs-2'
// import WeightChartOptions from '../../../../../components/AccountComponents/WeightData/WeightChartOptions/WeightChartOptions'

const SingleExerciseStatsChart = ({
  options,
  data,
  selectedTimeSpan,
  setSelectedTimeSpan,
  timeSpanOptions,
  isData,
}) => {
  return (
    <div className='weight-data'>
      {isData ? (
        <>
          <div className='options'>
            <div className='time-span-label'>One Month Progress</div>
            {/* <WeightChartOptions
              selectedTimeSpan={selectedTimeSpan}
              setSelectedTimeSpan={setSelectedTimeSpan}
              timeSpanOptions={timeSpanOptions}
            /> */}
          </div>
          <div className='chart-container'>
            <Line options={options} data={data} />
          </div>
        </>
      ) : (
        <div className='no-data-container'>
          <div className='title'>No Chart Data</div>
          <p>Complete an exercise to see progress.</p>
        </div>
      )}
    </div>
  )
}

export default SingleExerciseStatsChart
