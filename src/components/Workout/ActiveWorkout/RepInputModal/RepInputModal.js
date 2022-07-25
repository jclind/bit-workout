import React, { useState, useRef } from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../../../util/useClickOutside'
import './RepInputModal.scss'

const RepInputModal = ({ onClose, completeSet, numSets, exerciseID }) => {
  const [numReps, setNumReps] = useState(5)

  const modalContent = useClickOutside(() => {
    onClose()
  })

  const validateNumInput = num => {
    console.log(num)
    if (num === '') return true

    if (isNaN(num) || num < 0 || num % 1 !== 0) return false

    if (num > 999) return false

    return true
  }

  let decrementCounter = useRef(null)
  const startDecrement = () => {
    setNumReps(prevReps => {
      const newVal = prevReps - 1
      if (validateNumInput(newVal)) {
        return newVal
      } else {
        return prevReps
      }
    })

    if (decrementCounter.current) return

    decrementCounter.current = setInterval(() => {
      setNumReps(prevReps => {
        const newVal = prevReps - 1
        if (validateNumInput(newVal)) {
          return newVal
        } else {
          return prevReps
        }
      })
    }, 100)
  }
  const endDecrement = () => {
    if (decrementCounter.current) {
      clearInterval(decrementCounter.current)
      decrementCounter.current = null
    }
  }

  const incrementCounter = useRef(null)
  const startIncrement = () => {
    setNumReps(prevReps => {
      const newVal = prevReps + 1
      if (validateNumInput(newVal)) {
        return newVal
      } else {
        return prevReps
      }
    })

    if (incrementCounter.current) return

    incrementCounter.current = setInterval(() => {
      setNumReps(prevReps => {
        const newVal = prevReps + 1
        if (validateNumInput(newVal)) {
          return newVal
        } else {
          return prevReps
        }
      })
    }, 100)
  }
  const endIncrement = () => {
    if (incrementCounter.current) {
      clearInterval(incrementCounter.current)
      incrementCounter.current = null
    }
  }

  const handleRepChange = newVal => {
    if (validateNumInput(newVal)) return setNumReps(Number(newVal))
  }

  return ReactDom.createPortal(
    <>
      <div className='rep-input-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'>Enter Completed Reps</div>
          <div className='input-container'>
            <button
              className='decrement'
              onMouseDown={startDecrement}
              onMouseUp={endDecrement}
            >
              -
            </button>
            <input
              type='number'
              className='rep-input'
              value={numReps}
              onChange={e => handleRepChange(e.target.value)}
            />
            <button
              className='increment'
              onMouseDown={startIncrement}
              onMouseUp={endIncrement}
              onMouseLeave={endIncrement}
            >
              +
            </button>
          </div>
          <div className='actions'>
            <button className='cancel-btn' onClick={onClose}>
              Cancel
            </button>
            <button
              className='confirm-btn'
              onClick={() => completeSet(numSets, Number(numReps), exerciseID)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default RepInputModal
