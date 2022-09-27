import { Link } from 'react-router-dom'
import UserAvatarAndTitle from '../../components/AccountComponents/UserAvatarAndTitle/UserAvatarAndTitle'
import './Account.scss'
import NavbarContainer from '../../components/Navbar/Navbar'
import InfoTile from '../../components/AccountComponents/InfoTile/InfoTile'
import { BsChevronRight } from 'react-icons/bs'
import { IoIosStats, IoMdSettings } from 'react-icons/io'
import { connect } from 'react-redux'

const Account = ({ name, height, weight }) => {
  return (
    <>
      <div className='account-page'>
        <UserAvatarAndTitle name={name} membership={'Free Member'} />
        <div className='info-tiles'>
          <InfoTile
            title={'height'}
            text={`${height.feet}' ${height.inches}"`}
          />
          <InfoTile
            title={'weight'}
            text={weight}
            subtext={'lbs'}
            link='/account/weight'
          />
        </div>
        <div className='option-links'>
          <Link
            to='/account/stats'
            className='btn-container stats-btn-container'
          >
            <div className='indication-icon-container'>
              <IoIosStats className='icon' />
            </div>

            <div className='account-stats-button'>Stats And Data</div>
            <div className='right-icon-container'>
              <BsChevronRight className='right-icon' />
            </div>
          </Link>
          <Link
            to='/account/settings'
            className='btn-container settings-btn-container'
          >
            <div className='indication-icon-container'>
              <IoMdSettings className='icon' />
            </div>
            <div className='settings-btn'>Account Settings</div>
            <div className='right-icon-container'>
              <BsChevronRight className='right-icon' />
            </div>
          </Link>
        </div>
      </div>

      <NavbarContainer />
    </>
  )
}

const mapStateToProps = state => {
  const userAccountData = state.auth.userAccountData
  const weights = state.auth.userAccountData.weight
  let latestWeightEntry

  if (Array.isArray(weights)) {
    const latestDate = Math.max.apply(
      Math,
      weights.map(o => Number(o.date))
    )

    latestWeightEntry = weights.find(w => w.date === latestDate).weight
  } else {
    latestWeightEntry = weights
  }

  return {
    name: userAccountData.name,
    height: userAccountData.height,
    weight: latestWeightEntry,
  }
}

export default connect(mapStateToProps)(Account)
