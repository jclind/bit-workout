import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateRoute = () => {
    const { currentUser, currUserData } = useAuth()
    console.log(currentUser, currUserData)
    return currentUser ? <Outlet /> : <Navigate to='login' />
}

export default PrivateRoute
