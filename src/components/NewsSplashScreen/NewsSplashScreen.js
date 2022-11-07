import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useClickOutside from '../../util/useClickOutside'
import './NewsSplashScreen.scss'

const NewsSplashScreen = ({ isSignedIn }) => {
  const [isOpen, setIsOpen] = useState(true)

  const navigate = useNavigate()

  const currSplashScreenKey = 'd3dce5cf-10ab-4d3a-ae96-e405dda86752'
  const modalContent = useClickOutside(() => {
    setIsOpen(false)
  })

  useEffect(() => {
    // const localStorageKey = localStorage.getItem('splashScreenKey')
    // if (localStorageKey === currSplashScreenKey || !isSignedIn) {
    //   setIsOpen(false)
    // } else {
    //   localStorage.setItem('splashScreenKey', currSplashScreenKey)
    //   setIsOpen(true)
    // }
  }, [])

  if (!isOpen) return null

  return ReactDom.createPortal(
    <>
      <div className='news-splash-screen-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'>Announcements 🎉</div>
          <div className='date-info'>
            November 6th, 2022 - Now Introducing Achievements!
          </div>
          <img
            src='/achievements-art.png'
            alt='achievement badge'
            className='main-img'
          />
          <p className='description'>
            Exciting news for the BitWorkout Community: We are proud to announce
            the addition of user achievements! You can now earn badges by
            completing workouts, earning coins, purchasing items, and much more!
          </p>
          <button
            className='action-btn'
            onClick={() => {
              setIsOpen(false)
              navigate('/account/achievements')
            }}
          >
            View Achievements
          </button>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

const mapStateToProps = state => {
  return {
    isSignedIn: !!state?.auth?.userAuth?.uid,
  }
}

export default connect(mapStateToProps)(NewsSplashScreen)
