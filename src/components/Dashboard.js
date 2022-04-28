import { Link } from 'react-router-dom'
import NavbarContainer from './Navbar/Navbar'
import { connect } from 'react-redux'
import PastWorkoutsLink from './PastWorkoutsLink/PastWorkoutsLink'

const Dashboard = ({ userAuth, userAccountData }) => {
  if (!userAuth || !userAccountData) {
    return 'loading'
  }

  return (
    <>
      <div className='page'>
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
