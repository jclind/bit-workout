import React from 'react'
import ReactDom from 'react-dom'
import { itemList } from '../../../assets/data/itemList'
import useClickOutside from '../../../util/useClickOutside'
import { RiCopperCoinLine } from 'react-icons/ri'
import { connect } from 'react-redux'
import { TailSpin } from 'react-loader-spinner'
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import './ItemModal.scss'

const ItemModal = ({
  onClose,
  itemID,
  handlePurchase,
  coinBalance,
  purchaseLoading,
  isPurchased,
  isEquipped,
}) => {
  const modalContent = useClickOutside(() => {
    onClose()
  })

  const itemData = itemList.find(item => item.id === itemID)
  const { name, description, src, cost, stats } = itemData ?? {}

  const isSufficientFunds = isPurchased ? coinBalance >= cost : null

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
            {isPurchased ? (
              <button className='equip-btn'>
                {isEquipped ? (
                  <>
                    <AiOutlineMinusCircle className='icon equip-icon' />{' '}
                    <span className='text'>Unequip</span>
                  </>
                ) : (
                  <>
                    <AiOutlinePlusCircle className='icon equip-icon' />{' '}
                    <span className='text'>Equip</span>
                  </>
                )}
              </button>
            ) : (
              <>
                <button className='cancel-btn' onClick={onClose}>
                  Cancel
                </button>
                <button
                  className={`confirm-btn${
                    !isSufficientFunds ? ' insufficient-funds' : ''
                  }`}
                  onClick={() => handlePurchase(itemID)}
                  disabled={!isSufficientFunds || purchaseLoading}
                >
                  {purchaseLoading ? (
                    <TailSpin
                      height='20'
                      width='20'
                      color='white'
                      arialLabel='loading'
                      className='spinner'
                    />
                  ) : (
                    <>
                      Buy{' '}
                      <div className='cost'>
                        <RiCopperCoinLine className='coin-icon' /> {cost}
                      </div>
                    </>
                  )}
                </button>
              </>
            )}
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
