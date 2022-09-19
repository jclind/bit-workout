import NavbarContainer from './Navbar/Navbar'
import { connect } from 'react-redux'
import Character from './Character/Character'
import PastWorkoutsLinkContainer from './PastWorkoutsLink/PastWorkoutsLinkContainer'

const Dashboard = ({ userAuth, userAccountData }) => {
  const loading = !userAuth || !userAccountData

  return (
    <>
      <div className='page'>
        <Character loading={loading} />
        <PastWorkoutsLinkContainer />
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
