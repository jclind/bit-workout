import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import lottie from 'lottie-web'
import confettiAnim from '../assets/animations/confetti-anim.json'

const ConfettiAnim = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector('#confetti-anim'),
      animationData: confettiAnim,
      loop: false,
    })
  }, [])
  return ReactDom.createPortal(
    <div
      id='confetti-anim'
      style={{
        position: 'absolute',
        width: '105%',
        top: '0',
        left: '-5px',
        maxHeight: '-webkit-fill-available',
        overflow: 'hidden',
        zIndex: '5',
      }}
    ></div>,
    document.getElementById('portal')
  )
}

export default ConfettiAnim
