import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserWorkouts } from '../../../redux/actions/workout/workout'
import SingleWorkout from '../SingleWorkout/SingleWorkout'
import { AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai'

const UserWorkouts = ({ getUserWorkouts, appContainerRef }) => {
  const [workouts, setWorkouts] = useState([])
  // const [workoutSearchVal, setWorkoutSearchVal] = useState('')
  const [isMoreData, setIsMoreData] = useState(true)
  const [latestDoc, setLatestDoc] = useState(null)
  const [isPaginationLoading, setIsPaginationLoading] = useState(false)

  const [loading, setLoading] = useState(true)

  const isData = workouts.length > 0 || loading

  const limit = 3

  useEffect(() => {
    setLoading(true)
    getUserWorkouts(null, null, limit).then(res => {
      if (!res.data || res.data.length === 0) {
        setWorkouts([])
        setLoading(false)
        return setIsMoreData(false)
      }

      setLatestDoc(res.latestDoc) // Set latestDoc to last element in data
      setWorkouts(res.data)
      setIsMoreData(true)
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (appContainerRef && appContainerRef.current) {
      appContainerRef.current.addEventListener('scroll', handleScroll)

      return () => {
        appContainerRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [workouts])

  const getMoreWorkoutData = () => {
    console.log(workouts)
    console.log('test')
    getUserWorkouts('', null, limit, latestDoc).then(res => {
      if (!res.data || res.data.length === 0) {
        setIsMoreData(false)
      } else {
        setLatestDoc(res.latestDoc) // Set latestDoc to last element in new data
        setWorkouts(prevWorkouts => [...prevWorkouts, ...res.data])
      }
      setIsPaginationLoading(false)
    })
  }

  const handleScroll = () => {
    // console.log(workouts, isPaginationLoading)
    if (!isMoreData) {
      return
    }
    if (appContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = appContainerRef.current
      if (scrollTop + clientHeight === scrollHeight && !isPaginationLoading) {
        console.log('why is this being called twice?')
        console.log(workouts)
        setIsPaginationLoading(true)
        getMoreWorkoutData()
      }
    }
  }

  const listInnerRef = useRef()

  return (
    <div
      className='user-workout workout-list'
      onScroll={handleScroll}
      ref={listInnerRef}
    >
      {/* {isData && (
        <div className='search-workouts-container'>
          <AiOutlineSearch className='icon' />
          <input
            type='text'
            className='search-workouts'
            placeholder='Search Workouts'
            value={workoutSearchVal}
            onChange={e => setWorkoutSearchVal(e.target.value)}
          />
        </div>
      )} */}
      {!isData ? (
        <div className='no-data'>
          <h3>No Workouts</h3>
          <p>
            You haven't created any workouts yet. Go ahead and create your first
            personalized workout:
          </p>
          <Link to='/create-workout' className='create-first-workout'>
            <button>
              <AiOutlinePlusCircle className='icon' />
              Create Workout
            </button>
          </Link>
        </div>
      ) : loading ? (
        <>
          <SingleWorkout loading={true} />
          <SingleWorkout loading={true} />
          <SingleWorkout loading={true} />
        </>
      ) : (
        workouts.map(workout => {
          return (
            <React.Fragment key={workout.id}>
              <SingleWorkout workout={workout} />
            </React.Fragment>
          )
        })
      )}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getUserWorkouts: (query, order, limit, latestDoc) =>
      dispatch(getUserWorkouts(query, order, limit, latestDoc)),
  }
}

export default connect(null, mapDispatchToProps)(UserWorkouts)
