import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import PastWorkoutsItem from '../../components/PastWorkoutsItem/PastWorkoutsItem'
import { queryPastWorkoutData } from '../../redux/actions/workout/workout'
import './PastWorkouts.scss'

const PastWorkouts = ({ queryPastWorkoutData }) => {
  const [pastWorkoutData, setPastWorkoutData] = useState(null)
  const [order, setOrder] = useState('workoutStartTime')
  const [limit, setLimit] = useState(4)
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

  return (
    <div
      className='past-workouts-page page'
      onScroll={handleScroll}
      ref={listInnerRef}
    >
      <div className='past-workouts-container'>
        {pastWorkoutData &&
          pastWorkoutData.length > 0 &&
          pastWorkoutData.map((workout, idx) => {
            const id = workout.id
            return <PastWorkoutsItem key={id || idx} workout={workout} />
          })}
      </div>
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
