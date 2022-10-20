import React from 'react'
import { connect } from 'react-redux'
import characterImg from '../../assets/images/character.png'
import './CharacterAvatar.scss'

const CharacterAvatar = ({ equippedArr }) => {
  const { src: hatSrc, name: hatName } =
    equippedArr.find(item => item.type === 'hat') ?? {}
  const { src: robesSrc, name: robesName } =
    equippedArr.find(item => item.type === 'robe') ?? {}
  const { src: mainWeaponSrc, name: mainWeaponName } =
    equippedArr.find(item => item.type === 'primary-weapon') ?? {}
  return (
    <div className='avatar-container'>
      {hatSrc && <img src={hatSrc} alt={hatName} className='hat' />}
      <img src={characterImg} alt='avatar' className='avatar' />
      {robesSrc && <img src={robesSrc} alt={robesName} className='robes' />}
      {mainWeaponSrc && (
        <img
          src={mainWeaponSrc}
          alt={mainWeaponName}
          className='primary-weapon'
        />
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    equippedArr: state?.character?.equipped ?? [],
  }
}

export default connect(mapStateToProps)(CharacterAvatar)
