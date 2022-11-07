import { useEffect } from 'react'
import { auth } from './firebase'
import { connect } from 'react-redux'
import {
  signInAndFetchUserAccountData,
  setUserStatusSignedOut,
} from './redux/actions/auth/authStatus'
import { getStats } from './redux/actions/stats/stats'

const Auth = ({
  signInAndFetchUserAccountData,
  signOut,
  setLoading,
  userAuth,
  userAccountData,
  getStats,
}) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        signInAndFetchUserAccountData(user)
          .then(() => {
            getStats()
          })
          .then(() => {
            setLoading(false)
          })
      } else {
        signOut()
        setLoading(false)
      }
    })
    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

const mapStateToProps = state => {
  return {
    userAuth: state.auth.userAuth,
    userAccountData: state.auth.userAccountData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInAndFetchUserAccountData: user =>
      dispatch(signInAndFetchUserAccountData(user)),
    signOut: () => dispatch(setUserStatusSignedOut()),
    getStats: () => dispatch(getStats()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
