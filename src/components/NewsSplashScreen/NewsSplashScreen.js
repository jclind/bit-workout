import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import useClickOutside from '../../util/useClickOutside'

const NewsSplashScreen = () => {
  const [isOpen, setIsOpen] = useState(false)

  const currSplashScreenKey = 'b89647f4-2d61-4fa0-8eaa-ff684b43e1f8'
  const modalContent = useClickOutside(() => {
    setIsOpen(false)
  })

  useEffect(() => {
    const localStorageKey = localStorage.getItem('splashScreenKey')
    console.log(localStorageKey, currSplashScreenKey, isOpen)
    if (localStorageKey === currSplashScreenKey) {
      setIsOpen(false)
    } else {
      localStorage.setItem('splashScreenKey', currSplashScreenKey)
      console.log('im here')
      setIsOpen(true)
    }
  }, [])

  if (!isOpen) return null

  return ReactDom.createPortal(
    <>
      <div className='news-splash-screen-modal overlay'>
        <div className='modal-content' ref={modalContent}>
          <div className='title'>Confirm Stop Workout</div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default NewsSplashScreen
