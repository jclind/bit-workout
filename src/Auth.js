import { useEffect } from 'react'
import { auth } from './firebase'
import { connect } from 'react-redux'
import {
  signInAndFetchUserAccountData,
  setUserStatusSignedOut,
} from './redux/actions/auth/authStatus'

const Auth = ({ signInAndFetchUserAccountData, signOut, setLoading }) => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('logged in')
        signInAndFetchUserAccountData(user).then(() => {
          setLoading(false)
        })
      } else {
        console.log('logged out')
        signOut()
        setLoading(false)
      }
    })
    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

const mapDispatchToProps = dispatch => {
  return {
    signInAndFetchUserAccountData: user =>
      dispatch(signInAndFetchUserAccountData(user)),
    signOut: () => dispatch(setUserStatusSignedOut()),
  }
}

export default connect(null, mapDispatchToProps)(Auth)
