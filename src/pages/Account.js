import React from 'react'
import UserAvatarAndTitle from '../components/AccountComponents/UserAvatarAndTitle'
import '../assets/styles/pages/account.scss'
import { useAuth } from '../contexts/AuthContext'
import NavbarContainer from '../components/Navbar/NavbarContainer'

const Account = () => {
    const {
        currUserData: { name },
    } = useAuth()
    return (
        <>
            <div className='account-page'>
                <UserAvatarAndTitle name={name} membership={'Free Member'} />
            </div>
            <NavbarContainer />
        </>
    )
}

export default Account
