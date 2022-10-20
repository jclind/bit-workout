import React, { useState } from 'react'
import { connect } from 'react-redux'
import { itemList } from '../../assets/data/itemList'
import BackButton from '../SettingsComponents/BackButton/BackButton'
import _ from 'lodash'
import './Inventory.scss'
import Character from '../Character/Character'
import ItemModal from '../CharacterShop/ItemModal/ItemModal'

const InventoryItem = ({ item, handleItemClick, equippedArr }) => {
  const { id, name, thumbnail, type } = item
  const isItemEquipped = !!equippedArr.find(item => item.id === id)
  return (
    <button
      className='item'
      onClick={() => handleItemClick(id, isItemEquipped)}
    >
      <div className='img-container'>
        <img
          src={thumbnail}
          alt={name}
          className={`${type === 'hat' ? 'hat' : ''}`}
        />
      </div>
    </button>
  )
}

const Inventory = ({ inventory, equippedArr }) => {
  const [selectedItemId, setSelectedItemId] = useState(null)
  const [isSelectedItemEquipped, setIsSelectedItemEquipped] = useState(false)
  const [isItemModalOpen, setIsItemModalOpen] = useState(false)

  const inventoryDataArr = inventory.map(id => {
    return itemList.find(item => item.id === id)
  })
  const handleItemClick = (id, isEquipped) => {
    setSelectedItemId(id)
    setIsSelectedItemEquipped(isEquipped)
    setIsItemModalOpen(true)
  }
  const handleToggleEquip = id => {}

  const inventoryCategories = _.chain(inventoryDataArr)
    .groupBy('category')
    .map((value, key) => ({ category: key, data: value }))
    .value()
  return (
    <div className='inventory-page page'>
      <div className='settings-title'>Inventory</div>
      <BackButton />
      <Character />
      <div className='list'>
        {inventoryCategories.map(el => {
          return (
            <section key={el.category}>
              <div className='section-title'>{el.category}</div>
              <div className='items'>
                {el.data.map(item => {
                  return (
                    <InventoryItem
                      item={item}
                      key={item.id}
                      handleItemClick={handleItemClick}
                      equippedArr={equippedArr}
                    />
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
      {isItemModalOpen && (
        <ItemModal
          onClose={() => setIsItemModalOpen(false)}
          itemID={selectedItemId}
          isPurchased={true}
          isEquipped={isSelectedItemEquipped}
          toggleEquip={handleToggleEquip}
        />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    inventory: state.character?.inventory ?? [],
    equippedArr: state.character?.equipped ?? [],
  }
}

export default connect(mapStateToProps)(Inventory)
