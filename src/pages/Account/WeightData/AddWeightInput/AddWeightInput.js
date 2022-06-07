import React, { useState } from 'react'
import { AiOutlineCheck } from 'react-icons/ai'
import { useNavigate } from 'react-router'
import { formatYearMonthDay } from '../../../../util/formatDate'
import BackButton from '../../../../components/SettingsComponents/BackButton/BackButton'
import { connect } from 'react-redux'
import './AddWeightInput.scss'
import { addWeight } from '../../../../redux/actions/auth/authStatus'

const AddWeightInput = ({ addWeight, latestWeightEntry }) => {
  const navigate = useNavigate()
  const tempDate = new Date()

  const [weight, setWeight] = useState('')
  const [date, setDate] = useState(formatYearMonthDay(tempDate))

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

    const weightDate =
      formatYearMonthDay(new Date()) === date
        ? new Date().getTime()
        : new Date(date).getTime()

    console.log(weightDate)

    const weightObj = { date: weightDate, weight }
    let error = await addWeight(weightObj)
    if (error) {
      console.log(error)
    }
    navigate(-1)
  }

  return (
    <div className='add-weight-input page'>
      <div className='settings-title'>Add Weight</div>
      <div className='inputs'>
        <label className='weight'>
          <div className='text'>Weight</div>
          <input
            type='number'
            value={weight}
            onChange={handleWeightChange}
            placeholder={latestWeightEntry}
          />
        </label>
        <label className='date'>
          <div className='text'>Date</div>
          <input
            type='date'
            defaultValue={date}
            onChange={e => setDate(e.target.value)}
          />
        </label>
      </div>
      <button className='add-weight-btn btn' onClick={handleAddWeight}>
        <AiOutlineCheck className='icon' />
      </button>
      <BackButton />
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddWeightInput)
