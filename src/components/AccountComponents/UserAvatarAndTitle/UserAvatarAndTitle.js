import React from 'react'
import accountIcon from '../../../assets/images/icons/account.svg'
import './UserAvatarAndTitle.scss'

const UserAvatarAndTitle = ({ image, name, membership }) => {
  return (
    <div className='user-avatar-and-title'>
      <div className='content'>
        <div className='avatar-container'>
          {image ? (
            <img src={image} alt='avatar' />
          ) : (
            <img src={accountIcon} alt='avatar' className='icon no-avatar' />
          )}
        </div>
        <div className='user-title-container'>
          <div className='user-name'>{name}</div>
          <div className='user-membership'>{membership}</div>
        </div>
      </div>
    </div>
  )
}

export default UserAvatarAndTitle
