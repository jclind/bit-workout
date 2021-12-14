import React, { useEffect } from 'react'
import lottie from 'lottie-web'
import confettiAnim from '../../assets/animations/confetti-anim.json'
import '../../assets/styles/components/workout/workout-complete.scss'

const WorkoutComplete = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector('#confetti-anim'),
      animationData: confettiAnim,
      // loop: false,
    })
  }, [])

  return (
    <div className='workout-complete page'>
      hello there
      <div id='confetti-anim'></div>
    </div>
  )
}

export default WorkoutComplete
