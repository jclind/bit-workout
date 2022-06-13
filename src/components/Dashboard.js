import NavbarContainer from './Navbar/Navbar'
import { connect } from 'react-redux'
import PastWorkoutsLink from './PastWorkoutsLink/PastWorkoutsLink'
import Character from './Character/Character'

const Dashboard = ({ userAuth, userAccountData }) => {
  if (!userAuth || !userAccountData) {
    return 'loading'
  }

  return (
    <>
      <div className='page'>
        <Character />
        <PastWorkoutsLink />
      </div>

      <NavbarContainer />
    </>
  )
}

const mapStateToProps = state => {
  return {
    userAuth: state.auth.userAuth,
    userAccountData: state.auth.userAccountData,
  }
}

export default connect(mapStateToProps)(Dashboard)
