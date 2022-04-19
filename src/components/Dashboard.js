import { Link } from 'react-router-dom'
import NavbarContainer from './Navbar/Navbar'
import { connect } from 'react-redux'

const Dashboard = ({ userAuth, userAccountData }) => {
  if (!userAuth || !userAccountData) {
    return 'loading'
  }

  return (
    <>
      <div className='page'>
        <section style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Profile</h2>
          <div>
            <strong>Email:</strong> {userAccountData.email || 'loading'}
          </div>
          <div>
            <strong>Username:</strong> {userAccountData.username || 'loading'}
          </div>
          <div>
            <strong>Name:</strong> {userAccountData.name || 'loading'}
          </div>
          <div>
            <strong>Gender:</strong> {userAccountData.gender || 'loading'}
          </div>
          <div>
            <strong>Birthday:</strong> {userAccountData.birthday || 'loading'}
          </div>
          <div>
            <strong>Height:</strong>{' '}
            {userAccountData.height.feet && userAccountData.height.inches
              ? `${userAccountData.height.feet}ft, ${userAccountData.height.inches}in`
              : 'loading'}
          </div>
          <div>
            <strong>Weight:</strong> {userAccountData.weight || 'loading'}
          </div>
          <Link to='/update-profile'>Update Profile</Link>
        </section>
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
