import React from 'react'
import { connect } from 'react-redux'
import characterImg from '../../assets/images/character.png'
import './CharacterAvatar.scss'

const CharacterAvatar = ({ inventory }) => {
  return (
    <div className='avatar-container'>
      <img src='/items/party-hat.png' alt='party hat' className='hat' />
      <img src={characterImg} alt='avatar' className='avatar' />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    // equipedItems: state?.character?.inventory ?? []
  }
}

export default connect(mapStateToProps)(CharacterAvatar)
