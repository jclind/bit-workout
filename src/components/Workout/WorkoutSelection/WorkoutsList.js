import React, { useState, useEffect, useRef } from 'react'
import SingleWorkout from '../SingleWorkout/SingleWorkout'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import ConfirmDeleteWorkoutModal from './ConfirmDeleteWorkoutModal'
import { connect } from 'react-redux'
import { deleteWorkout } from '../../../redux/actions/workout/workout'

const WorkoutsList = ({ getWorkouts, appContainerRef, deleteWorkout }) => {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false)
  const [deletedWorkoutID, setDeletedWorkoutID] = useState(null)
  const handleDeleteWorkout = workoutID => {
    setDeletedWorkoutID(workoutID)
    setIsConfirmDeleteModalOpen(true)
  }

  const navigate = useNavigate()

  const [workouts, setWorkouts] = useState([])
  // const [workoutSearchVal, setWorkoutSearchVal] = useState('')
  const [isMoreData, setIsMoreData] = useState(true)
  const [latestDoc, setLatestDoc] = useState(null)
  const [isPaginationLoading, setIsPaginationLoading] = useState(false)

  const [loading, setLoading] = useState(true)

  const isData = workouts.length > 0 || loading

  const limit = 5

  useEffect(() => {
    setLoading(true)
    getWorkouts(null, null, limit).then(res => {
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
    const appContainerCurrent = appContainerRef?.current
    if (appContainerRef && appContainerCurrent) {
      appContainerRef.current.addEventListener('scroll', handleScroll)

      return () => {
        appContainerCurrent.removeEventListener('scroll', handleScroll)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workouts, appContainerRef])

  const getMoreWorkoutData = () => {
    getWorkouts('', null, limit, latestDoc).then(res => {
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
    if (!isMoreData) {
      return
    }
    if (appContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = appContainerRef.current
      if (scrollTop + clientHeight === scrollHeight && !isPaginationLoading) {
        setIsPaginationLoading(true)
        getMoreWorkoutData()
      }
    }
  }

  const removeWorkout = workoutID => {
    setWorkouts(prevWorkouts => prevWorkouts.filter(w => w.id !== workoutID))
  }

  const listInnerRef = useRef()
  return (
    <div
      className='user-workout workout-list'
      onScroll={handleScroll}
      ref={listInnerRef}
    >
      {!isData ? (
        <div className='no-data'>
          <h3>No Workouts</h3>
          <p>
            You haven't created any workouts yet. Go ahead and create your first
            personalized workout:
          </p>
          <button
            className='create-first-workout'
            onClick={() => navigate('/create-workout')}
          >
            <AiOutlinePlusCircle className='icon' />
            Create Workout
          </button>
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
              <SingleWorkout
                workout={workout}
                handleDeleteWorkout={handleDeleteWorkout}
              />
            </React.Fragment>
          )
        })
      )}
      {isConfirmDeleteModalOpen ? (
        <ConfirmDeleteWorkoutModal
          onClose={() => setIsConfirmDeleteModalOpen(prev => !prev)}
          deleteWorkout={deleteWorkout}
          removeWorkout={removeWorkout}
          workoutID={deletedWorkoutID}
        />
      ) : null}
    </div>
  )
}
const mapDispatchToProps = dispatch => {
  return {
    deleteWorkout: workoutID => dispatch(deleteWorkout(workoutID)),
  }
}

export default connect(null, mapDispatchToProps)(WorkoutsList)
