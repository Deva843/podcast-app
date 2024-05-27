import React from 'react';
import "./style.css"
import { NavLink } from 'react-router-dom';

function Header() {
    // const location = useLocation();
    // const currentPath = location.pathname;
  return (
    <div className='navBar'>
        <div className="gradient"></div>
        <div className='links'>
            <NavLink to = "/">SignUp</NavLink>
            <NavLink to = "/podcast">podcast</NavLink>
            <NavLink to = "/create-a-podcast">Start A Podcast</NavLink>
            <NavLink to = "/profile">profile</NavLink>

        </div>
    </div>
  )
}

export default Header;