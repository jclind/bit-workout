import React from 'react'
import BackButton from '../../../components/SettingsComponents/BackButton/BackButton'
import { BsChevronRight } from 'react-icons/bs'
import './AccountStats.scss'

const StatItem = ({ title, value, link, icon }) => {
  return (
    <div className='stat-item'>
      <div className='content'>
        <div className='top'>{title}</div>
        {link && <div className='bottom'>{value}</div>}
      </div>
      {link ? (
        <div className='icon-container'>
          <BsChevronRight className='icon' />
        </div>
      ) : (
        <div className='right'>{value}</div>
      )}
    </div>
  )
}

const AccountStats = () => {
  return (
    <div className='account-stats-page page'>
      <div className='settings-title'>Statistics / Progress</div>
      <BackButton />

      <div className='stats-container'>
        <section>
          <StatItem title={'Volume'} value='45lb' link />
          {/* <StatItem title={'Big Three Max'} weight='45' /> */}
          <StatItem title={'Sets'} value='45' link />
          <StatItem title={'Reps'} value='45' link />
          <StatItem title={'Time'} value='1d 2h 1s' link />
        </section>
        <section>
          <StatItem title={'Squat'} value='155lb' link />
          <StatItem title={'Bench Press'} value='135lb' link />
        </section>
        <section>
          <StatItem title={'Coins Earned'} value='532' />
          <StatItem title={'Exp Earned'} value='230' />
        </section>
      </div>
    </div>
  )
}

export default AccountStats
