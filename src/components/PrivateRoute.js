import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ userAuth }) => {
  console.log(userAuth)
  return userAuth ? <Outlet /> : <Navigate to='/auth' />
}

const mapStateToProps = state => {
  return {
    userAuth: state.auth.userAuth,
  }
}

export default connect(mapStateToProps)(PrivateRoute)
