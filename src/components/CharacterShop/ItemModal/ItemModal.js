import React from 'react'
import ReactDom from 'react-dom'
import { itemList } from '../../../assets/data/itemList'
import useClickOutside from '../../../util/useClickOutside'
import { RiCopperCoinLine } from 'react-icons/ri'
import './ItemModal.scss'
import { connect } from 'react-redux'

const ItemModal = ({ onClose, itemID, handlePurchase, coinBalance }) => {
  const modalContent = useClickOutside(() => {
    onClose()
  })

  const itemData = itemList.find(item => item.id === itemID)
  const { name, description, src, cost, stats } = itemData ?? {}

  const isSufficientFunds = coinBalance >= cost

  return ReactDom.createPortal(
    <>
      <div className='item-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'>{name}</div>
          <div className='img-container'>
            <img src={src} alt={name} />
          </div>
          <div className='stats'>
            {Object.keys(stats).map(stat => {
              const propName = stat.toUpperCase()
              const val = stats[stat]
              const sign = val < 0 ? '-' : '+'
              const isIncrease = val > 0

              return (
                <div
                  className={`stat${isIncrease ? ' active' : ''}`}
                  key={stat}
                >
                  <div className='prop'>{propName}:</div>
                  <div className='value'>{`${sign}${val}`}</div>
                </div>
              )
            })}
          </div>
          <p className='description'>{description}</p>
          <div className='actions'>
            <button className='cancel-btn' onClick={onClose}>
              Cancel
            </button>
            <button
              className={`confirm-btn${
                !isSufficientFunds ? ' insufficient-funds' : ''
              }`}
              onClick={() => handlePurchase(itemID)}
              disabled={!isSufficientFunds}
            >
              Buy{' '}
              <div className='cost'>
                <RiCopperCoinLine className='coin-icon' /> {cost}
              </div>
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}
const mapStateToProps = state => {
  return {
    coinBalance: state.character.coins,
  }
}

export default connect(mapStateToProps)(ItemModal)
