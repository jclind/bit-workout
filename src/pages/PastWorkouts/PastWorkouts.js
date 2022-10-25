import React, { useState, useEffect, useRef } from 'react'
import BackButton from '../../components/SettingsComponents/BackButton/BackButton'
import { connect } from 'react-redux'
import PastWorkoutsItem from '../../components/PastWorkoutsItem/PastWorkoutsItem'
import {
  getSingleExercise,
  queryPastWorkoutData,
} from '../../redux/actions/workout/workout'
import noDataImage from '../../assets/images/no-past-workout-data.svg'
import { BsSortDown } from 'react-icons/bs'
import './PastWorkouts.scss'
import { Link } from 'react-router-dom'
import Select from 'react-select'

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

const sortSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '40px',
    background: 'none',
    height: '40px',
    margin: '0 auto',
    boxShadow: state.isFocused ? null : null,
    outline: 'none',
    border: state.isFocused ? '1px solid #548ca8' : '1px solid #bebebe',
    ':hover': {
      border: '1px solid #548ca8',
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'white',
    fontWeight: '500',
    paddingBottom: '3px',
    background: 'none',
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: '40px',
    padding: '0 6px',
  }),

  input: (provided, state) => ({
    ...provided,
    color: '#fff',
    margin: '0px',
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '40px',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontWeight: '500',
    color: '#bebebe',
  }),
  menu: (provided, state) => ({
    ...provided,
    background: '#334257',
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected
      ? '#548ca8'
      : state.isFocused
      ? '#476072'
      : 'none',
    ':active': {
      background: '#476072',
    },
  }),
}

const PastWorkouts = ({ queryPastWorkoutData, getSingleExercise }) => {
  const limit = 10

  const [pastWorkoutData, setPastWorkoutData] = useState(null)
  const [order, setOrder] = useState({
    sort: 'workoutStartTime',
    descending: true,
  })
  const [latestDoc, setLatestDoc] = useState(null)
  const [isPaginationLoading, setIsPaginationLoading] = useState(false)
  const [isMoreData, setIsMoreData] = useState(true)

  useEffect(() => {
    queryPastWorkoutData(order.sort, limit, null, order.descending).then(
      res => {
        if (!res.data || res.data.length === 0) {
          setPastWorkoutData([])
          return setIsMoreData(false)
        }
        setLatestDoc(res.latestDoc) // Set latestDoc to last element in data
        setPastWorkoutData(res.data)
        setIsMoreData(true)
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])

  const getMoreWorkoutData = () => {
    queryPastWorkoutData(order.sort, limit, latestDoc, order.descending).then(
      res => {
        if (!res.data || res.data.length === 0) {
          setIsMoreData(false)
        } else {
          const newWorkoutData = [...pastWorkoutData, ...res.data]
          setLatestDoc(res.latestDoc) // Set latestDoc to last element in new data
          setPastWorkoutData(newWorkoutData)
        }
        setIsPaginationLoading(false)
      }
    )
  }

  const listInnerRef = useRef()

  const handleScroll = () => {
    if (!isMoreData) {
      return
    }
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current
      if (
        Math.ceil(scrollTop + clientHeight) === scrollHeight &&
        !isPaginationLoading
      ) {
        setIsPaginationLoading(true)
        getMoreWorkoutData()
      }
    }
  }

  const isDataLoading = isMoreData && !pastWorkoutData
  const isNoData = !isDataLoading && pastWorkoutData.length === 0

  const sortOptions = [
    { value: 'new', label: 'Newest' },
    { value: 'old', label: 'Oldest' },
    { value: 'longest', label: 'Longest' },
    { value: 'shortest', label: 'Shortest' },
  ]

  const handleSelectChange = e => {
    switch (e.value) {
      case 'new':
        return setOrder({
          sort: 'workoutStartTime',
          descending: true,
        })
      case 'old':
        return setOrder({
          sort: 'workoutStartTime',
          descending: false,
        })
      case 'longest':
        return setOrder({
          sort: 'totalWorkoutTime',
          descending: true,
        })
      case 'shortest':
        return setOrder({
          sort: 'totalWorkoutTime',
          descending: false,
        })
      default:
        return
    }
  }

  return (
    <div
      className='past-workouts-page page'
      onScroll={handleScroll}
      ref={listInnerRef}
    >
      <BackButton />

      {!isNoData && <div className='settings-title'>Past Workouts</div>}
      {!isNoData && (
        <div className='sort-options'>
          <Select
            options={sortOptions}
            styles={sortSelectStyles}
            className='select'
            placeholder={
              <div className='select-placeholder'>
                <BsSortDown aria-label='Sort Icon' /> Sort:
              </div>
            }
            onChange={handleSelectChange}
          />
        </div>
      )}
      <div
        className={`past-workouts-container${isDataLoading ? ' loading' : ''}`}
      >
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
            return (
              <PastWorkoutsItem
                key={id || idx}
                workout={workout}
                getSingleExercise={getSingleExercise}
              />
            )
          })
        )}
      </div>
    </div>
  )
}

const mapPropsToDispatch = dispatch => {
  return {
    queryPastWorkoutData: (order, limit, pageNum, descending) =>
      dispatch(queryPastWorkoutData(order, limit, pageNum, descending)),
    getSingleExercise: exerciseID => dispatch(getSingleExercise(exerciseID)),
  }
}

export default connect(null, mapPropsToDispatch)(PastWorkouts)
