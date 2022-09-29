import React, { useState } from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import PageLoading from '../../../../../components/PageLoading/PageLoading'
import BackButton from '../../../../../components/SettingsComponents/BackButton/BackButton'
import { formatAMPM } from '../../../../../util/formatDate'
import { StatItem } from '../../AccountStats'
import './AllChartData.scss'

const AllChartData = ({ exerciseStats, loading }) => {
  const params = useParams()
  const exerciseID = params.exerciseID

  const singleExerciseStats = exerciseStats.find(ex => {
    return ex.exerciseID.toString() === exerciseID
  })
  const isData = !loading && !!singleExerciseStats

  const [currPage, setCurrPage] = useState(0)
  const limit = 2
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    console.log('test')
    const newData = singleExerciseStats?.completedSetsPath ?? []
    const startIdx = limit * currPage
    const endIdx = limit * (currPage + 1)

    console.log(startIdx, endIdx)

    setChartData([
      ...chartData,
      ...newData
        .sort((a, b) => (a.date < b.date ? 1 : b.date < a.date ? -1 : 0))
        .slice(startIdx, endIdx),
    ])
  }, [currPage])

  return (
    <div className='all-chart-data-page page'>
      <div className='settings-title'>All Chart Data</div>
      <BackButton />
      {loading ? (
        <PageLoading />
      ) : !isData ? (
        <div className='no-data-container'>
          <div className='title'>No Data</div>
          <p>Complete a workout to see progress.</p>
        </div>
      ) : (
        <div className='stats-container'>
          <section>
            {chartData.map(el => {
              const dateStr = new Date(el.date).toDateString()
              const date = dateStr.substring(4, dateStr.length - 5)
              const time = formatAMPM(el.date)
              const isPR = el.isNewPR1x1
              console.log(isPR)
              return (
                <StatItem
                  title={`${el.weight} lbs`}
                  value={`${date} at ${time}`}
                  isPR={isPR}
                  key={el.date}
                />
                // <div className='chart-data-item' key={el.date}>
                //   <div className='weight'>{el.weight}</div>
                //   <div className='date'>{`${date} at ${time}`}</div>
                // </div>
              )
            })}
          </section>
          <button onClick={() => setCurrPage(prev => prev + 1)}>INC</button>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const loading = !state.auth.userAccountData.accountStats

  return {
    exerciseStats: state?.auth?.userAccountData?.accountStats?.exerciseStats,
    loading,
  }
}

export default connect(mapStateToProps)(AllChartData)
