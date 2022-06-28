import React, { useState, useEffect, useRef } from 'react'
import BackButton from '../../components/SettingsComponents/BackButton/BackButton'
import { connect } from 'react-redux'
import PastWorkoutsItem from '../../components/PastWorkoutsItem/PastWorkoutsItem'
import { queryPastWorkoutData } from '../../redux/actions/workout/workout'
import noDataImage from '../../assets/images/no-past-workout-data.svg'
import './PastWorkouts.scss'
import { Link } from 'react-router-dom'

const NoPastWorkoutData = () => {
  return (
    <div className='no-data-container'>
      <div className='image'>
        <img src={noDataImage} alt='' />
      </div>
      <h2 className='title'>No Past Workouts</h2>
      <p className='description'>
        Your completed workouts will be shown here. Want to check it out? Go
        ahead and complete a workout:
      </p>
      <Link to='/workout'>
        <button className='start-workout'>Start A Workout</button>
      </Link>
    </div>
  )
}

const PastWorkouts = ({ queryPastWorkoutData }) => {
  const [pastWorkoutData, setPastWorkoutData] = useState(null)
  const [order, setOrder] = useState('workoutStartTime')
  const [limit, setLimit] = useState(8)
  const [latestDoc, setLatestDoc] = useState(null)
  const [isPaginationLoading, setIsPaginationLoading] = useState(false)
  const [isMoreData, setIsMoreData] = useState(true)

  useEffect(() => {
    queryPastWorkoutData(order, limit, latestDoc).then(res => {
      if (!res.data || res.data.length === 0) {
        return setIsMoreData(false)
      }
      setLatestDoc(res.latestDoc) // Set latestDoc to last element in data
      setPastWorkoutData(res.data)
    })
  }, [])

  const getMoreWorkoutData = () => {
    queryPastWorkoutData(order, limit, latestDoc).then(res => {
      if (!res.data || res.data.length === 0) {
        setIsMoreData(false)
      } else {
        const newWorkoutData = [...pastWorkoutData, ...res.data]
        setLatestDoc(res.latestDoc) // Set latestDoc to last element in new data
        setPastWorkoutData(newWorkoutData)
      }
      setIsPaginationLoading(false)
    })
  }

  const listInnerRef = useRef()

  const handleScroll = () => {
    if (!isMoreData) {
      return
    }
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
      if (scrollTop + clientHeight === scrollHeight && !isPaginationLoading) {
        setIsPaginationLoading(true)
        getMoreWorkoutData()
      }
    }
  }

  const isDataLoading = isMoreData && !pastWorkoutData
  const isNoData = !isDataLoading && pastWorkoutData.length === 0

  return (
    <div
      className='past-workouts-page page'
      onScroll={handleScroll}
      ref={listInnerRef}
    >
      {!isNoData && <div className='settings-title'>Past Workouts</div>}
      <div className='past-workouts-container'>
        {isDataLoading ? (
          <>
            <PastWorkoutsItem key={1} workout={null} loading={true} />
            <PastWorkoutsItem key={2} workout={null} loading={true} />
            <PastWorkoutsItem key={3} workout={null} loading={true} />
            <PastWorkoutsItem key={4} workout={null} loading={true} />
          </>
        ) : isNoData ? (
          <NoPastWorkoutData />
        ) : (
          pastWorkoutData.map((workout, idx) => {
            const id = workout.id
            return <PastWorkoutsItem key={id || idx} workout={workout} />
          })
        )}
      </div>
      <BackButton />
    </div>
  )
}

const mapPropsToDispatch = dispatch => {
  return {
    queryPastWorkoutData: (order, limit, pageNum) =>
      dispatch(queryPastWorkoutData(order, limit, pageNum)),
  }
}

export default connect(null, mapPropsToDispatch)(PastWorkouts)
