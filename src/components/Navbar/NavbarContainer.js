import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/styles/components/navbar.scss'

const NavbarContainer = () => {
    return (
        <>
            <nav>
                <Link to='/'>Dashboard</Link>
                <Link to='/workout'>Workout</Link>
                <Link to='/account'>Account</Link>
            </nav>
        </>
    )
}

export default NavbarContainer
