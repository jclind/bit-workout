import { useEffect } from 'react'
import { auth } from './firebase'
import { connect } from 'react-redux'
import {
  signInAndFetchUserAccountData,
  setUserStatusSignedOut,
} from './redux/actions/auth/authStatus'

const Auth = ({
  signInAndFetchUserAccountData,
  signOut,
  setLoading,
  userAuth,
  userAccountData,
}) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        signInAndFetchUserAccountData(user).then(() => {
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
