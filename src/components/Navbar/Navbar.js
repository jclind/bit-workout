import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navbar.scss'

import { AiOutlineHome, AiFillHome } from 'react-icons/ai'
import { MdRunCircle, MdOutlineRunCircle } from 'react-icons/md'
import { RiUserLine, RiUserFill } from 'react-icons/ri'

const NavbarContainer = () => {
  const [currLocation, setCurrLocation] = useState()
  const location = useLocation()

  useEffect(() => {
    setCurrLocation(location.pathname)
  }, [location.pathname, currLocation])

  return (
    <>
      <nav>
        <div className='nav-links'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            {currLocation === '/' ? (
              <AiFillHome className='icon' />
            ) : (
              <AiOutlineHome className='icon' />
            )}
            <div className='link-text'>Home</div>
          </NavLink>
          <NavLink
            to='/workout'
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            {currLocation === '/workout' ? (
              <MdRunCircle className='icon' />
            ) : (
              <MdOutlineRunCircle className='icon' />
            )}
            <div className='link-text'>Workout</div>
          </NavLink>
          <NavLink
            to='/account'
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            {/* <img
              src={
              }
              alt='account'
              className='icon'
            /> */}
            {currLocation === '/account' ? (
              <RiUserFill className='icon' />
            ) : (
              <RiUserLine className='icon' />
            )}
            <div className='link-text'>Account</div>
          </NavLink>
        </div>
      </nav>
    </>
  )
}

export default NavbarContainer
