import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './Navbar.scss'

import { AiOutlineHome, AiFillHome } from 'react-icons/ai'
import { MdRunCircle, MdOutlineRunCircle } from 'react-icons/md'
import { RiUserLine, RiUserFill } from 'react-icons/ri'

const NavLinkTemplate = ({ link, linkText, OutlineIcon, FillIcon }) => {
  const [currLocation, setCurrLocation] = useState()
  const location = useLocation()
  useEffect(() => {
    setCurrLocation(location.pathname)
  }, [location.pathname, currLocation])

  return (
    <NavLink
      to={link}
      end={link === '/'}
      className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
    >
      {currLocation === link ? (
        <FillIcon className='icon' />
      ) : (
        <OutlineIcon className='icon' />
      )}
      <div className='link-text'>{linkText}</div>
    </NavLink>
  )
}

const NavbarContainer = () => {
  return (
    <>
      <nav>
        <div className='nav-links'>
          <NavLinkTemplate
            link='/'
            linkText='Home'
            OutlineIcon={AiOutlineHome}
            FillIcon={AiFillHome}
          />
          <NavLinkTemplate
            link='/workout'
            linkText='Workout'
            OutlineIcon={MdOutlineRunCircle}
            FillIcon={MdRunCircle}
          />
          <NavLinkTemplate
            link='/account'
            linkText='Account'
            OutlineIcon={RiUserLine}
            FillIcon={RiUserFill}
          />
        </div>
      </nav>
    </>
  )
}

export default NavbarContainer
