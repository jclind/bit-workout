import React from 'react'
import './AppLoadingScreen.scss'
import dumbbellIcon from '../../assets/images/icons/dumbbell-icon.svg'
import HashLoader from 'react-spinners/HashLoader'

const AppLoadingScreen = () => {
  return (
    <div className='app-loading-screen'>
      <div className='icon-container'>
        <img src={dumbbellIcon} alt='dumbbell icon' />
      </div>
      <div className='title'>BitWorkout</div>
      <div className='spinner-container'>
        <HashLoader
          color={'#548ca8'}
          loading={true}
          size={60}
          className='spinner'
        />
      </div>
    </div>
  )
}

export default AppLoadingScreen
