import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import '../../assets/styles/components/navbar.scss'

import { AiOutlineHome, AiFillHome } from 'react-icons/ai'
import { MdRunCircle, MdOutlineRunCircle } from 'react-icons/md'
import { RiUserLine, RiUserFill } from 'react-icons/ri'

const NavbarContainer = () => {
  const [currLocation, setCurrLocation] = useState()
  const location = useLocation()

  useEffect(() => {
    setCurrLocation(location.pathname)
    console.log(currLocation)
  }, [location.pathname, currLocation])

  return (
    <>
      <nav>
        <div className='nav-links'>
          <NavLink to='/' className='nav-link' activeClassName='active'>
            {currLocation === '/' ? (
              <AiFillHome className='icon' />
            ) : (
              <AiOutlineHome className='icon' />
            )}

            <div className='link-text'>Home</div>
          </NavLink>
          <NavLink to='/workout' className='nav-link' activeClassName='active'>
            {currLocation === '/workout' ? (
              <MdRunCircle className='icon' />
            ) : (
              <MdOutlineRunCircle className='icon' />
            )}
            <div className='link-text'>Workout</div>
          </NavLink>
          <NavLink to='/account' className='nav-link' activeClassName='active'>
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
