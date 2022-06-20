import { Link } from 'react-router-dom'
import UserAvatarAndTitle from '../../components/AccountComponents/UserAvatarAndTitle/UserAvatarAndTitle'
import './Account.scss'
import NavbarContainer from '../../components/Navbar/Navbar'
import InfoTile from '../../components/AccountComponents/InfoTile/InfoTile'
import rightIcon from '../../assets/images/icons/right.svg'
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
          <img src={rightIcon} alt='right' className='icon' />
          <button className='settings-btn'>Account Settings</button>
        </Link>
      </div>

      <NavbarContainer />
    </>
  )
}

const mapStateToProps = state => {
  const userAccountData = state.auth.userAccountData
  const weights = state.auth.userAccountData.weight
  const latestWeightEntry = Array.isArray(weights)
    ? weights.reduce((prev, curr) => {
        return new Date(prev.date).getTime() < new Date(curr.date).getTime()
          ? prev
          : curr
      }).weight
    : weights

  return {
    name: userAccountData.name,
    height: userAccountData.height,
    weight: latestWeightEntry,
  }
}

export default connect(mapStateToProps)(Account)
