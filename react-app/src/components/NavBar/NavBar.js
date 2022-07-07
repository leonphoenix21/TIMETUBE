import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
import ProfileModal from './ProfileModal';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './navbar_files';
import { IconContext } from 'react-icons';
import { ImUpload2 } from 'react-icons/im';
import { FcHome } from 'react-icons/fc';
import { MdSwitchAccount } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { logout } from '../../store/session';

import Logo from './Logo';


const NavBar = () => {
  const dispatch = useDispatch();

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const onLogout = () => {
    dispatch(logout());
  };


  const SessionLogo = () => {
    return (
      <div>
        <NavLink to='/home' className='navlinks' exact={true} activeClassName='active'>
          <div className="logoPicName">
            <img src='https://clipart.world/wp-content/uploads/2020/09/classic-camera-clipart-transparent.png'
              alt='' className='homeScreenIcon'
              onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
            />
            <p className='websiteName'>timetube</p>
          </div>
        </NavLink>
      </div>
    );
  }

  const sessionUser = useSelector(state => state.session.user)
  let sessionlinks = (
    <nav className='navbar'>
      <>
        <span className='logoContainer'><SessionLogo /> </span>
        <IconContext.Provider value={{ color: 'black' }}>
          <div className='sidenavbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} className='navmenuIcon' />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  <AiIcons.AiOutlineClose />
                  <span className='logoContainer sideLogo'><Logo /> </span>

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
              <li className='nav-text'>
                <Link to={`/user/${sessionUser?.id}`}>
                  <MdSwitchAccount />
                  <span>Account </span>
                </Link>
              </li>

              <div className="githubLinkDiv" >
                <h2 className='githubLinkTitle'>Creator Links</h2>

                <a href='https://github.com/leonphoenix21/FAUXTUBE/wiki' >
                  <img className='avatar profileAvtr transformOneOne'
                    src='https://www.logo.wine/a/logo/GitHub/GitHub-Icon-White-Dark-Background-Logo.wine.svg'
                    alt=''
                    onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                  />
                </a>
                {/* <h3 className='mrTop'> Github </h3> */}
              </div>
              <a href='https://www.linkedin.com/in/noel-m-19145aa3/' >
                <img className='linkedIn transformOneOne'
                  src='http://cdn.designblognews.com/wp-content/uploads/2020/07/linkedinlogo-1593683207nkg84.png'
                  alt=''
                  onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                />
              </a>






            </ul>
          </nav>
        </IconContext.Provider>
      </>
      {/* <NavLink className='navlinks' to='/users' exact={true} activeClassName='active'>
        Users
      </NavLink> */}
      {/* <NavLink className='navlinks' to='/home' exact={true} activeClassName='active'>
        Home
      </NavLink> */}
      {/* <NavLink to='/upload' className='navlinks' exact={true} activeClassName='active'>
        <span className='UploadIcon'> <ImUpload2 /> </span>
      </NavLink> */}
      <button className='logOutBtn' onClick={onLogout}> <span className='logOutSpan'> <RiAccountPinBoxFill />< GrLogout />  </span> </button>

      {/* <ProfileModal user={sessionUser} /> */}
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
            <span className='logoContainer'><Logo /> </span>
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
