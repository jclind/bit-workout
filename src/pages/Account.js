import { Link } from 'react-router-dom'
import UserAvatarAndTitle from '../components/AccountComponents/UserAvatarAndTitle'
import '../assets/styles/pages/account.scss'
import { useAuth } from '../contexts/AuthContext'
import NavbarContainer from '../components/Navbar/NavbarContainer'
import InfoTile from '../components/AccountComponents/InfoTile'
import rightIcon from '../assets/images/icons/right.svg'

const Account = () => {
  const { currUserData } = useAuth()
  const { name, height, weight } = currUserData

  return (
    <>
      <div className='account-page'>
        <UserAvatarAndTitle name={name} membership={'Free Member'} />
        <div className='info-tiles'>
          <InfoTile
            title={'height'}
            text={`${height.feet}' ${height.inches}"`}
          />
          <InfoTile title={'weight'} text={weight} subtext={'lbs'} />
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

export default Account
