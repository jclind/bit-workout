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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectTimeSpan = val => {
    const newTimeSpan = timeSpanOptions.find(t => t.value === val)
    setSelectedTimeSpan(newTimeSpan)
  }
  return (
    <div className='weight-chart-options'>
      <div className='time-span-selection'>
        {timeSpanOptions.map((timeSpan, idx) => {
          return (
            <React.Fragment key={idx}>
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
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default WeightChartOptions
