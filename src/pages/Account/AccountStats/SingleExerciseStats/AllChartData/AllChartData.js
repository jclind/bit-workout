import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'
import PageLoading from '../../../../../components/PageLoading/PageLoading'
import BackButton from '../../../../../components/SettingsComponents/BackButton/BackButton'
import { queryChartData } from '../../../../../redux/actions/stats/stats'
import { formatAMPM } from '../../../../../util/formatDate'
import { StatItem } from '../../AccountStats'
import './AllChartData.scss'

const AllChartData = ({
  exerciseStats,
  loading,
  appContainerRef,
  queryChartData,
}) => {
  const params = useParams()
  const exerciseID = params.exerciseID

  useEffect(() => {
    queryChartData(exerciseID)
  }, [])

  const singleExerciseStats = exerciseStats.find(ex => {
    return ex.exerciseID.toString() === exerciseID
  })
  const isData = !loading && !!singleExerciseStats

  const [currPage, setCurrPage] = useState(0)
  const limit = 30
  const [isMoreData, setIsMoreData] = useState(true)
  const [isPaginationLoading, setIsPaginationLoading] = useState(false)
  const [chartData, setChartData] = useState([])

  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    console.log('test')
    const newData = singleExerciseStats?.completedSetsPath ?? []
    const startIdx = limit * currPage
    const endIdx = limit * (currPage + 1)
    console.log('PAGINATION')
    const newChartDataArr = [
      ...chartData,
      ...newData
        .sort((a, b) => (a.date < b.date ? 1 : b.date < a.date ? -1 : 0))
        .slice(startIdx, endIdx),
    ]

    setChartData(newChartDataArr)
    setIsPaginationLoading(false)

    setIsMoreData(
      newChartDataArr.length < singleExerciseStats.completedSetsPath.length
    )
  }, [currPage])

  useEffect(() => {
    setIsPaginationLoading(false)
  }, [chartData.length])

  useEffect(() => {
    const appContainerCurrent = appContainerRef?.current
    if (appContainerRef && appContainerCurrent) {
      appContainerRef.current.addEventListener('scroll', handleScroll)

      return () => {
        appContainerCurrent.removeEventListener('scroll', handleScroll)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData, appContainerRef])

  const handleScroll = () => {
    console.log(isMoreData)
    if (!isMoreData) {
      return
    }
    if (appContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = appContainerRef.current
      console.log(scrollTop + clientHeight)
      if (scrollTop + clientHeight === scrollHeight && !isPaginationLoading) {
        setIsPaginationLoading(true)
        setCurrPage(prev => prev + 1)
      }
    }
  }

  const deleteItem = id => {
    const { pr1x1, pr1x5 } = singleExerciseStats
    const { weight, reps } = chartData.find(el => el.date === id)

    let newPR1x1ID = null
    if (id === pr1x1.date) {
      const maxWeight = Math.max.apply(
        Math,
        chartData.filter(el => el.date !== id).map(o => Number(o.weight))
      )
      newPR1x1ID = Math.min.apply(
        Math,
        chartData.filter(el => el.weight === maxWeight).map(o => Number(o.date))
      )
    }
    let newPR1x5ID = null
    if (id === pr1x5.date) {
      const maxWeight = Math.max.apply(
        Math,
        chartData
          .filter(el => el.date !== id && el.reps >= 5)
          .map(o => Number(o.weight))
      )
      newPR1x5ID = Math.min.apply(
        Math,
        chartData
          .filter(el => el.weight === maxWeight && el.reps >= 5)
          .map(o => Number(o.date))
      )
    }
  }

  return (
    <div className='all-chart-data-page page'>
      <div className='settings-title'>All Chart Data</div>
      <BackButton />
      <button className='edit-btn' onClick={() => setIsEditing(prev => !prev)}>
        {isEditing ? 'Done' : 'Edit'}
      </button>
      {loading ? (
        <PageLoading />
      ) : !isData ? (
        <div className='no-data-container'>
          <div className='title'>No Data</div>
          <p>Complete a workout to see progress.</p>
        </div>
      ) : (
        <div className='stats-container'>
          <div className='section-title'>LBS</div>
          <section>
            {chartData.map(el => {
              const dateStr = new Date(el.date).toDateString()
              const date = dateStr.substring(4, dateStr.length - 5)
              const time = formatAMPM(el.date)
              let isPR = false
              if (singleExerciseStats?.pr1x1?.date === el.date) {
                isPR = true
              }
              return (
                <StatItem
                  title={`${el.weight}`}
                  subTitle={`x ${el.reps}`}
                  value={`${date} at ${time}`}
                  isPR={isPR}
                  key={el.date}
                  isEditing={isEditing}
                  deleteItem={() => deleteItem(el.date)}
                />
              )
            })}
          </section>
          {isPaginationLoading && (
            <div className='fade-loader-container'>
              <div className='spinner-container'>
                <FadeLoader
                  color={'#548ca8'}
                  className='spinner'
                  height={8}
                  width={3}
                  radius={10}
                  margin={-8}
                />
              </div>
              <div className='text'>loading...</div>
            </div>
          )}
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
const mapDispatchToProps = dispatch => {
  return {
    queryChartData: exerciseID => dispatch(queryChartData(exerciseID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllChartData)
