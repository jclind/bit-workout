import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PageLoading from '../../../../components/PageLoading/PageLoading'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import { getSingleExercise } from '../../../../redux/actions/workout/workout'
import { StatItem } from '../AccountStats'
import Select from 'react-select'
import { BsSortDown } from 'react-icons/bs'
import './AllExercises.scss'

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
const sortOptions = [
  { value: 'a-z', label: 'A - Z' },
  { value: 'z-a', label: 'Z - A' },
  { value: 'heaviest', label: 'Heaviest' },
  { value: 'lightest', label: 'Lightest' },
]

const AllExercises = ({
  exerciseStats,
  loading,
  workoutsCompleted,
  getSingleExercise,
}) => {
  const [exercises, setExercises] = useState(() => {
    return exerciseStats.map(ex => {
      return { ...ex, ...getSingleExercise(ex.exerciseID) }
    })
  })

  const [order, setOrder] = useState({
    sort: 'name',
    descending: true,
  })
  useEffect(() => {
    const sortByProp = (arr, prop, reverse) => {
      const sortedArr = [...arr].sort((a, b) =>
        a[prop] > b[prop] ? 1 : b[prop] > a[prop] ? -1 : 0
      )

      if (reverse) {
        return sortedArr.reverse()
      }
      return sortedArr
    }
    if (order.sort === 'pr1x1.weight') {
      const sortedExercises = [...exercises].sort((a, b) => {
        const weight1 = a?.pr1x1?.weight ? Number(a.pr1x1.weight) : 0
        const weight2 = b?.pr1x1?.weight ? Number(b.pr1x1.weight) : 0
        return weight1 > weight2 ? 1 : weight2 > weight1 ? -1 : 0
      })
      if (order.descending) {
        console.log(sortedExercises)
        return setExercises(sortedExercises.reverse())
      }
      console.log(sortedExercises)
      return setExercises(sortedExercises)
    }

    return setExercises(sortByProp(exercises, order.sort, order.descending))
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
      {!workoutsCompleted ? (
        <div className='no-data-container'>
          <div className='title'>No Data</div>
          <p>Complete a workout to see progress.</p>
        </div>
      ) : loading ? (
        <PageLoading />
      ) : (
        <div className='stats-container'>
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
          <section>
            {exercises.map(ex => {
              if (ex.name === 'Other') return null

              const pr1x1 = ex?.pr1x1?.weight
                ? ex.pr1x1.weight + 'lbs'
                : 'No Data'
              return (
                <StatItem key={ex.exerciseID} title={ex.name} value={pr1x1} />
              )
            })}
          </section>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  const loading = !state.auth.userAccountData.accountStats
  const exp = state.character.exp
  const workoutsCompleted = !loading && exp !== 0

  return {
    exerciseStats: state?.auth?.userAccountData?.accountStats?.exerciseStats,
    loading,
    workoutsCompleted,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleExercise: exerciseID => dispatch(getSingleExercise(exerciseID)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllExercises)
