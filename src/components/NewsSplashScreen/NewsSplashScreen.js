import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import useClickOutside from '../../util/useClickOutside'

const NewsSplashScreen = ({ isSignedIn }) => {
  const [isOpen, setIsOpen] = useState(false)

  const currSplashScreenKey = 'd3dce5cf-10ab-4d3a-ae96-e405dda86752'
  const modalContent = useClickOutside(() => {
    setIsOpen(false)
  })

  useEffect(() => {
    const localStorageKey = localStorage.getItem('splashScreenKey')
    if (localStorageKey === currSplashScreenKey || !isSignedIn) {
      setIsOpen(false)
    } else {
      localStorage.setItem('splashScreenKey', currSplashScreenKey)
      setIsOpen(true)
    }
  }, [])

  if (!isOpen) return null

  return ReactDom.createPortal(
    <>
      <div className='news-splash-screen-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'></div>
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
