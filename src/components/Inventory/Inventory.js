import React, { useState } from 'react'
import { connect } from 'react-redux'
import { itemList } from '../../assets/data/itemList'
import BackButton from '../SettingsComponents/BackButton/BackButton'
import _ from 'lodash'
import './Inventory.scss'
import Character from '../Character/Character'
import ItemModal from '../CharacterShop/ItemModal/ItemModal'
import { setEquippedItem } from '../../redux/actions/character/character'
import { BsCheck } from 'react-icons/bs'

const InventoryItem = ({ item, handleItemClick, equippedArr }) => {
  const { id, name, thumbnail, type } = item
  const isItemEquipped = !!equippedArr.find(item => item.id === id)
  return (
    <button
      className='item'
      onClick={() => handleItemClick(id, isItemEquipped)}
    >
      {isItemEquipped && (
        <div className='equipped-indicator'>
          <BsCheck className='equipped-icon icon' />
        </div>
      )}
      <div className='img-container'>
        <img
          draggable='false'
          src={thumbnail}
          alt={name}
          className={`${type === 'hat' ? 'hat' : ''}`}
        />
      </div>
    </button>
  )
}

const Inventory = ({ inventory, equippedArr, setEquippedItem }) => {
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
  const handleSetEquip = (id, isEquipped) => {
    setEquippedItem(id, isEquipped)
    setIsItemModalOpen(false)
  }

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
          const categoryTypes = _.chain(el.data)
            .groupBy('type')
            .map((value, key) => ({ type: key, data: value }))
            .value()
          return (
            <section key={el.category}>
              <div className='section-title'>{el.category}</div>
              <div className='items'>
                {categoryTypes.map(categoryType => {
                  return (
                    <div
                      className={`type-container ${categoryType.type}`}
                      key={categoryType.type}
                    >
                      <div className='type-title'>
                        {`${categoryType.type.split('-').join(' ')}s`}
                      </div>
                      <div className='type-equipment'>
                        {categoryType.data.map(item => {
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
                    </div>
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
          setEquip={handleSetEquip}
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
const mapDispatchToProps = dispatch => {
  return {
    setEquippedItem: (id, equipItem) =>
      dispatch(setEquippedItem(id, equipItem)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inventory)
