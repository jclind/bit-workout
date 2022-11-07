import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FadeLoader } from 'react-spinners'
import PageLoading from '../../../../../components/PageLoading/PageLoading'
import BackButton from '../../../../../components/SettingsComponents/BackButton/BackButton'
import {
  queryChartData,
  removeChartData,
} from '../../../../../redux/actions/stats/stats'
import { formatAMPM } from '../../../../../util/formatDate'
import { StatItem } from '../../AccountStats'
import './AllChartData.scss'

const AllChartData = ({ appContainerRef, queryChartData, removeChartData }) => {
  const params = useParams()
  const exerciseID = params.exerciseID

  const [singleExerciseStats, setSingleExerciseStats] = useState(null)

  const limit = 30
  const [isMoreData, setIsMoreData] = useState(false)
  const [isPaginationLoading, setIsPaginationLoading] = useState(false)
  const [chartData, setChartData] = useState([])

  const [latestDoc, setLatestDoc] = useState(null)

  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [deleteIDsLoading, setDeleteIDsLoading] = useState([])

  useEffect(() => {
    setLoading(true)
    queryChartData(exerciseID, limit).then(res => {
      if (!res.data || res.data.length < limit) {
        setLoading(false)
        setIsMoreData(false)
        if (res.data.length === 0) return setChartData([])
      } else {
        setIsMoreData(true)
      }
      setSingleExerciseStats(res.exerciseStatsData)
      setLatestDoc(res.latestDoc)
      setChartData(res.data)
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getMoreData = () => {
    queryChartData(exerciseID, limit, latestDoc).then(res => {
      if (!res.data || res.data.length === 0) {
        setIsMoreData(false)
      } else {
        if (res.data.length < limit) {
          setIsMoreData(false)
        }
        setChartData(prevWorkouts => [...prevWorkouts, ...res.data])
      }
      setIsPaginationLoading(false)
    })
  }

  const isData = !loading && chartData.length > 0

  useEffect(() => {
    setIsPaginationLoading(false)
  }, [chartData.length])

  useEffect(() => {
    if (isMoreData) {
      const appContainerCurrent = appContainerRef?.current
      if (appContainerRef && appContainerCurrent) {
        appContainerRef.current.addEventListener('scroll', handleScroll)

        return () => {
          appContainerCurrent.removeEventListener('scroll', handleScroll)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData, appContainerRef])

  useEffect(() => {
    if (isPaginationLoading) {
      getMoreData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaginationLoading])

  const handleScroll = () => {
    if (!isMoreData) {
      return
    }
    if (appContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = appContainerRef.current
      if (scrollTop + clientHeight === scrollHeight && !isPaginationLoading) {
        setIsPaginationLoading(true) // called getMoreData in useEffect
      }
    }
  }

  const deleteItem = (id, reps) => {
    setDeleteIDsLoading(prev => [...prev, id])
    removeChartData(id, singleExerciseStats, reps).then(() => {
      setChartData(prev => prev.filter(el => el.id !== id))
      setDeleteIDsLoading(prev => prev.filter(currId => currId !== id))
    })
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
            {chartData.length >= 0 &&
              chartData.map(el => {
                const dateStr = new Date(el.date).toDateString()
                const date = dateStr.substring(4, dateStr.length - 5)
                const time = formatAMPM(el.date)
                let isPR = false
                if (singleExerciseStats?.pr1x1?.id === el.id) {
                  isPR = true
                }
                return (
                  <StatItem
                    title={`${el.weight}`}
                    subTitle={`x ${el.reps}`}
                    value={`${date} at ${time}`}
                    isPR={isPR}
                    key={el.id}
                    isEditing={isEditing}
                    deleteItem={() => deleteItem(el.id, el.reps)}
                    deleteLoading={!!deleteIDsLoading.find(id => id === el.id)}
                  />
                )
              })}
          </section>
          {isPaginationLoading && (
            <div className='pagination-fade-loader-container'>
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
  return {
    // exerciseStats: state?.auth?.userAccountData?.accountStats?.exerciseStats,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    queryChartData: (exerciseID, limit, latestDoc) =>
      dispatch(queryChartData(exerciseID, limit, latestDoc)),
    removeChartData: (id, singleExerciseStats, setReps) =>
      dispatch(removeChartData(id, singleExerciseStats, setReps)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllChartData)
