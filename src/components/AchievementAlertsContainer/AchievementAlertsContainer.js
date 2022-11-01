import React from 'react'
import { connect } from 'react-redux'
import { achievements } from '../../assets/data/achievementData'
import { addCompletedAchievements } from '../../redux/actions/stats/stats'
import { toast } from 'react-toastify'
import './AchievementAlertsContainer.scss'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ToastAchievement = ({ achievement }) => {
  const navigate = useNavigate()
  const { src, name } = achievement
  return (
    <button
      className='achievement-toast'
      onClick={() => navigate('/account/achievements')}
    >
      <img src={src} alt='' />
      <div className='text-container'>
        <div className='title'>Achievement Unlocked</div>
        <div className='achievement-name'>{name}</div>
      </div>
    </button>
  )
}

const AchievementAlertsContainer = ({
  completedAchievements,
  totalUserStats,
  addCompletedAchievements,
}) => {
  useEffect(() => {
    if (!totalUserStats) return

    const addedIDs = []
    const achievementsData = achievements
    const achievementList = []
    achievementsData.forEach(type => {
      type.list.forEach(achievement => {
        achievementList.push(achievement)
      })
    })
    achievementList.forEach(achievement => {
      const { id, amount: goal, property } = achievement
      // If achievement is already marked as completed return
      if (
        completedAchievements &&
        completedAchievements.find(achiv => achiv.id === id)
      )
        return

      if (totalUserStats[property] >= goal) {
        addedIDs.push(id)
        toast(<ToastAchievement achievement={achievement} />, {
          className: 'achievement-toast',
          autoClose: 3000,
          type: 'info',
          icon: false,
        })
      }
    })
    addCompletedAchievements(addedIDs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalUserStats])

  return null
}

const mapStateToProps = state => {
  return {
    completedAchievements: state?.stats?.completedAchievements,
    totalUserStats: state?.stats?.totalUserStats,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addCompletedAchievements: achievementID =>
      dispatch(addCompletedAchievements(achievementID)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AchievementAlertsContainer)
