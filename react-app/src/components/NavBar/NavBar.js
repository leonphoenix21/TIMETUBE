import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import ProfileModal from './ProfileModal';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './navbar_files';
import './sidenavbar.css';
import { IconContext } from 'react-icons';
import { ImUpload2 } from 'react-icons/im';


const NavBar = () => {

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const sessionUser = useSelector(state => state.session.user)
  let sessionlinks = (
    <nav className='navbar'>
      <>
        <IconContext.Provider value={{ color: 'black' }}>
          <div className='sidenavbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} className='menuIcon' />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </IconContext.Provider>
      </>
      <NavLink className='navlinks' to='/users' exact={true} activeClassName='active'>
        Users
      </NavLink>
      <NavLink to='/upload' className='navlinks' exact={true} activeClassName='active'>
        <span className='UploadIcon'> <ImUpload2 /> </span>
      </NavLink>
      <NavLink className='navlinks' to='/' exact={true} activeClassName='active'>
        Home
      </NavLink>
      <ProfileModal user={sessionUser} />
    </nav>
  )


  return (
    <>
      {sessionUser ?
        <>
          {sessionlinks}
        </>
        :
        <>
          <nav className='navbar' >
            <NavLink to='/' className='navlinks' exact={true} activeClassName='active'>
              Home(Icon Insert Here)
            </NavLink>

            <NavLink to='/login' className='navlinks' exact={true} activeClassName='active'>
              Login
            </NavLink>

            <NavLink to='/sign-up' className='navlinks' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </nav>
        </>
      }
    </>
  );
}

export default NavBar;
