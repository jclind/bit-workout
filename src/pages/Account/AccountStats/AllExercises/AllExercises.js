import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import PageLoading from '../../../../components/PageLoading/PageLoading'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import { getSingleExercise } from '../../../../redux/actions/workout/workout'
import { StatItem } from '../AccountStats'
import Select from 'react-select'
import { AiOutlineSearch, AiOutlineCloseCircle } from 'react-icons/ai'
import { BsSortDown } from 'react-icons/bs'
import './AllExercises.scss'
import { getStats } from '../../../../redux/actions/stats/stats'

const sortSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: '35px',
    background: 'none',
    height: '35px',
    margin: '0 auto',
    boxShadow: state.isFocused ? null : null,
    outline: 'none',
    border: state.isFocused ? '1px solid #548ca8' : '1px solid #bebebe',
    fontSize: '0.9rem',
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
    height: '35px',
    padding: '0 6px',
  }),

  input: (provided, state) => ({
    ...provided,
    color: '#fff',
    margin: '0px',
    fontSize: '0.9rem',
  }),
  indicatorSeparator: state => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '35px',
    paddingBottom: '3px',
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
const sortOptions = [
  { value: 'a-z', label: 'A - Z' },
  { value: 'z-a', label: 'Z - A' },
  { value: 'heaviest', label: 'Heaviest' },
  { value: 'lightest', label: 'Lightest' },
]

const AllExercises = ({
  exerciseStats,
  isData,
  loading,
  getSingleExercise,
  getStats,
}) => {
  const [exercises, setExercises] = useState(null)
  const [order, setOrder] = useState(null)

  const [searchVal, setSearchVal] = useState('')
  const searchRef = useRef()

  useEffect(() => {
    if (!exerciseStats) {
      getStats()
    }
  }, [])

  useEffect(() => {
    if (exerciseStats) {
      setExercises(
        exerciseStats.map(ex => ({
          ...ex,
          ...getSingleExercise(ex.exerciseID),
        }))
      )
      setOrder({
        sort: 'name',
        descending: true,
      })
    }
  }, [exerciseStats])

  useEffect(() => {
    const sortByProp = (arr, prop, reverse) => {
      if (order.sort === 'pr1x1.weight') {
        const sortedExercises = [...arr].sort((a, b) => {
          const weight1 = a?.pr1x1?.weight ? Number(a.pr1x1.weight) : 0
          const weight2 = b?.pr1x1?.weight ? Number(b.pr1x1.weight) : 0
          return weight1 > weight2 ? 1 : weight2 > weight1 ? -1 : 0
        })
        if (order.descending) {
          return sortedExercises.reverse()
        }
        return sortedExercises
      }

      const sortedArr = [...arr].sort((a, b) =>
        a[prop] > b[prop] ? 1 : b[prop] > a[prop] ? -1 : 0
      )

      if (reverse) {
        return sortedArr.reverse()
      }
      return sortedArr
    }

    if (!order || !exercises) return

    setExercises(sortByProp(exercises, order.sort, order.descending))
  }, [order])

  const handleSelectChange = e => {
    switch (e.value) {
      case 'a-z':
        return setOrder({
          sort: 'name',
          descending: true,
        })
      case 'z-a':
        return setOrder({
          sort: 'name',
          descending: false,
        })
      case 'heaviest':
        return setOrder({
          sort: 'pr1x1.weight',
          descending: true,
        })
      case 'lightest':
        return setOrder({
          sort: 'pr1x1.weight',
          descending: false,
        })
      default:
        return
    }
  }

  return (
    <div className='all-exercises-stats-page page'>
      <div className='settings-title'>Completed Exercises</div>
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
          <div className='filters'>
            <div className='search-exercises-container'>
              <AiOutlineSearch className='icon' />
              <input
                type='text'
                className='search-workouts'
                placeholder='Search...'
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                ref={searchRef}
                onClick={() => searchRef.current.select()}
              />
              {searchVal && (
                <div
                  onClick={() => setSearchVal('')}
                  className='clear-icon-container'
                >
                  <AiOutlineCloseCircle className='clear-icon' />
                </div>
              )}
            </div>
            <div className='sort-options'>
              <Select
                options={sortOptions}
                styles={sortSelectStyles}
                className='select'
                placeholder={
                  <div className='select-placeholder'>
                    <BsSortDown /> Sort:
                  </div>
                }
                onChange={handleSelectChange}
              />
            </div>
          </div>
          <section>
            {!loading && exercises
              ? exercises.map(ex => {
                  const { name } = getSingleExercise(ex.exerciseID)
                  if (ex.name === 'Other') return null
                  if (
                    !searchVal ||
                    name.toLowerCase().includes(searchVal.toLowerCase())
                  ) {
                    const pr1x1 = ex?.pr1x1?.weight
                      ? ex.pr1x1.weight + 'lbs'
                      : 'No Data'
                    return (
                      <StatItem
                        key={ex.exerciseID}
                        title={name}
                        value={pr1x1}
                        link={`/account/stats/exercises/${ex.exerciseID}`}
                      />
                    )
                  }
                  return null
                })
              : null}
          </section>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  const status = state.stats.status
  const loading = status === 'loading' || status === 'unloaded'
  const isData = state?.stats?.exerciseStats?.length > 0 ?? false
  return {
    exerciseStats: state.stats.exerciseStats,
    loading,
    isData,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleExercise: exerciseID => dispatch(getSingleExercise(exerciseID)),
    getStats: () => dispatch(getStats()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllExercises)
