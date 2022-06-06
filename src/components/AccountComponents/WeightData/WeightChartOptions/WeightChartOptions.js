import React, { useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import './WeightChartOptions.scss'

const WeightChartOptions = ({
  selectedTimeSpan,
  setSelectedTimeSpan,
  timeSpanOptions,
}) => {
  useEffect(() => {
    setSelectedTimeSpan(timeSpanOptions[0])
  }, [])

  const selectTimeSpan = val => {
    const newTimeSpan = timeSpanOptions.find(t => t.value === val)
    setSelectedTimeSpan(newTimeSpan)
  }
  return (
    <div className='weight-chart-options'>
      <div className='time-span-selection'>
        {timeSpanOptions.map(timeSpan => {
          return (
            <>
              {selectedTimeSpan ? (
                <button
                  className={
                    selectedTimeSpan.value === timeSpan.value
                      ? 'time-span-btn selected'
                      : 'time-span-btn'
                  }
                  onClick={() => selectTimeSpan(timeSpan.value)}
                  key={timeSpan.value}
                >
                  {timeSpan.label}
                </button>
              ) : (
                <Skeleton />
              )}
            </>
          )
        })}
      </div>
    </div>
  )
}

export default WeightChartOptions