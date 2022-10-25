import React, { useState } from 'react'
import { RiCopperCoinLine } from 'react-icons/ri'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { itemList } from '../../assets/data/itemList'
import { purchaseShopItem } from '../../redux/actions/character/character'
import ItemModal from './ItemModal/ItemModal'
import { toast } from 'react-toastify'
import './CharacterShop.scss'

const ShopItem = ({ item, handleItemClick }) => {
  return (
    <button className='item' onClick={() => handleItemClick(item.id)}>
      <div className='img-container'>
        <img
          src={item.thumbnail}
          alt={item.title}
          className={item.type === 'hat' ? 'hat' : ''}
        />
      </div>
      <div className='cost'>
        <RiCopperCoinLine className='icon coin-icon' />
        {item.cost}
      </div>
    </button>
  )
}

const CharacterShop = ({ purchaseShopItem, inventory }) => {
  const [selectedItemID, setSelectedItemID] = useState(null)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)
  const [purchaseLoading, setPurchaseLoading] = useState(false)

  const navigate = useNavigate()

  const availableItemList =
    itemList.filter(item => !inventory.includes(item.id)) ?? []

  const handleItemClick = id => {
    setSelectedItemID(id)
    setIsItemModalOpen(true)
  }

  const handlePurchase = id => {
    setPurchaseLoading(true)
    purchaseShopItem(id).then(() => {
      setPurchaseLoading(false)
      setIsItemModalOpen(false)
      const { name } = itemList.find(item => item.id === id)
      toast(`${name} successfully purchased`, { type: 'success' })
    })
  }

  return (
    <div className='character-shop'>
      <div className='title'>Item Shop</div>

      {availableItemList.length > 0 ? (
        <div className='list'>
          {availableItemList.map(item => {
            return (
              <ShopItem
                key={item.id}
                item={item}
                handleItemClick={handleItemClick}
              />
            )
          })}
        </div>
      ) : (
        <div className='no-items'>No Items Are Available At The Moment</div>
      )}
      <button className='view-inventory' onClick={() => navigate('/inventory')}>
        View Inventory
      </button>
      {isItemModalOpen && (
        <ItemModal
          onClose={() => setIsItemModalOpen(false)}
          itemID={selectedItemID}
          handlePurchase={handlePurchase}
          purchaseLoading={purchaseLoading}
        />
      )}
    </div>
  )
}
const mapStateToProps = state => {
  return {
    inventory: state?.character?.inventory,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    purchaseShopItem: id => dispatch(purchaseShopItem(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterShop)
