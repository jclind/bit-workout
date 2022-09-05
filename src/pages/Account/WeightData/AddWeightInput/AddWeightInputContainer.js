import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addWeight } from '../../../../redux/actions/auth/authStatus'
import { formatYearMonthDay } from '../../../../util/formatDate'
import AddWeightInput from './AddWeightInput'
import { toast } from 'react-toastify'

const AddWeightInputContainer = ({ addWeight, latestWeightEntry }) => {
  const navigate = useNavigate()
  const tempDate = new Date()

  const [weight, setWeight] = useState('')
  const [date, setDate] = useState(formatYearMonthDay(tempDate))

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleWeightChange = e => {
    const value = e.target.value
    if ((value * 10) % 1 !== 0 || value >= 1000) {
      return
    }
    setWeight(value)
  }
  const handleAddWeight = async () => {
    if (!weight || !date) {
      return
    }

    setLoading(true)
    const weightDate =
      formatYearMonthDay(new Date()) === date
        ? new Date().getTime()
        : new Date(date).getTime()

    const weightObj = { date: weightDate, weight: Number(weight) }
    let error = await addWeight(weightObj)
    if (error) {
      setLoading(false)
      return setError(error.message)
    }
    toast('Weight Added Successfully', { type: 'success' })
    navigate(-1)
    setLoading(false)
  }

  return (
    <AddWeightInput
      weight={weight}
      date={date}
      setDate={setDate}
      handleWeightChange={handleWeightChange}
      latestWeightEntry={latestWeightEntry}
      handleAddWeight={handleAddWeight}
      loading={loading}
      error={error}
    />
  )
}

const mapStateToProps = state => {
  const weights = state.auth.userAccountData.weight
  const latestWeightEntry = Array.isArray(weights)
    ? weights.reduce((prev, curr) => {
        return new Date(prev.date).getTime() < new Date(curr.date).getTime()
          ? prev
          : curr
      }).weight
    : weights

  return {
    latestWeightEntry: latestWeightEntry,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addWeight: weightData => dispatch(addWeight(weightData)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddWeightInputContainer)
