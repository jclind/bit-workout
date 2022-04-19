import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ userAuth }) => {
  return userAuth ? <Outlet /> : <Navigate to='/login' />
}

const mapStateToProps = state => {
  return {
    userAuth: state.auth.userAuth,
  }
}

export default connect(mapStateToProps)(PrivateRoute)
