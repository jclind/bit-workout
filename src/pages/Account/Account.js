import { Link } from 'react-router-dom'
import UserAvatarAndTitle from '../../components/AccountComponents/UserAvatarAndTitle/UserAvatarAndTitle'
import './Account.scss'
import NavbarContainer from '../../components/Navbar/Navbar'
import InfoTile from '../../components/AccountComponents/InfoTile/InfoTile'
import { BsChevronRight } from 'react-icons/bs'
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
        <Link to='/account/settings' className='settings-btn-container'>
          <BsChevronRight className='icon' />
          <button className='settings-button'>Account Settings</button>
        </Link>
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
