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
import { IoIosSearch } from "react-icons/io";
import { logout } from '../../store/session';

import Logo from './Logo';
import { ALL } from 'dns';


const NavBar = () => {
  const dispatch = useDispatch();

  const [sidebar, setSidebar] = useState(false);
  const [resultDisplay, setResultDisplay] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [closeResult, setCloseResult] = useState('');
  const showSidebar = () => setSidebar(!sidebar);
  const DontshowSidebar = () => setSidebar(false);
  const onLogout = () => {
    dispatch(logout());
  };

  const CheckSeachBar = () => {
    if (searchInput.length) {
      setResultDisplay(true);
    } else {
      setResultDisplay(false);
    }
  };

  const AllVideos = useSelector(state => Object.values(state.videos))

  const VideoResult = AllVideos?.filter(video => {
    if (searchInput.length === 1) {
      if (video?.title.toLowerCase().includes(searchInput.toLowerCase())
        || video?.description.toLowerCase().includes(searchInput.toLowerCase())) return video
    }

    else if (searchInput.length === 2) {
      if (video?.title.toLowerCase().includes(searchInput.toLowerCase())
        || video?.description.toLowerCase().includes(searchInput.toLowerCase())) return video
    }
    else if (searchInput.length === 3) {
      if (video?.title.toLowerCase().includes(searchInput.toLowerCase())
        || video?.description.toLowerCase().includes(searchInput.toLowerCase())) return video
    } else if (searchInput.length > 0) {
      if (video?.title.toLowerCase().includes(searchInput.toLowerCase())
        || video?.description.toLowerCase().includes(searchInput.toLowerCase())) return video
    }

  })

  const CloseVideoResults = AllVideos?.filter(video => {
    for (let i = 0; i < searchInput.length; i++) {
      console.log('how many times do i run')
      let letter = searchInput[0]
      if (video?.title.toLowerCase().includes(letter.toLowerCase())
        || video?.description.toLowerCase().includes(letter.toLowerCase())) return video
    }
  })

  console.log('Question mark Videos', VideoResult, searchInput)
  console.log('Question mark', CloseVideoResults, searchInput)

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

        {/* //site Logo */}

        <span className='logoContainer' ><SessionLogo /> </span>

        {/* // Side Bar Open Menu Icon */}

        <IconContext.Provider value={{ color: 'black' }}>
          <div className='sidenavbar'>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} className='navmenuIcon' />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={DontshowSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                  {/* <AiIcons.AiOutlineClose /> */}
                  {/* <FaIcons.FaBars onClick={showSidebar} className='navmenuIcon' style={{ position: 'relative' }} /> */}
                  {/* <span className={sidebar ? 'logoContainer sideLogo' : 'github-unactive'}><Logo /> </span> */}

                </Link>
              </li>

              {/* // SideBar columns and data mapped from and array of links, icons and name to location */}

              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={sidebar ? item.cName : 'nav-text-unactive'}>
                    <Link to={item.path}>
                      <span className={sidebar ? 'nav-text-icon' : 'nav-text-icon-unactive'}>{item.icon}</span>
                      <span className={sidebar ? 'sidebarItemTitle' : 'sIT'} >{item.title}</span>
                    </Link>
                  </li>
                );
              })}


              {/* // Account Option on SideBar Menu */}

              <li className={sidebar ? 'nav-text' : 'nav-text-unactive'}>
                <Link to={`/user/${sessionUser?.id}`}>
                  <span className={sidebar ? 'nav-text-icon' : 'nav-text-icon-unactive'}><MdSwitchAccount /></span>
                  <span className={sidebar ? 'sidebarItemTitle' : 'sIT'}>Account </span>
                </Link>
              </li>

              {/* // Github and LinkedIn Links */}

              <div className={sidebar ? "githubLinkDiv" : 'githubLinkDiv-unactive '} >

                <a href='https://github.com/leonphoenix21/FAUXTUBE/wiki' >
                  <img className={sidebar ? 'githubImg' : 'githubImg-unactive'}
                    src='https://www.logo.wine/a/logo/GitHub/GitHub-Icon-White-Dark-Background-Logo.wine.svg'
                    height={45}
                    width={45}
                    alt=''
                    onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                  />
                </a>
                {/* <h3 className='mrTop'> Github </h3> */}

              </div>
              <a href="https://www.linkedin.com/in/noel-m-19145aa3/ " >
                <img
                  className={sidebar ? "linkedInImg" : 'linkedInImg-unactive'}
                  height={sidebar ? 100 : 45}
                  width={sidebar ? 100 : 45}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png"
                  alt=""
                  onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                />

              </a>
              {/* <a href='https://www.linkedin.com/in/noel-m-19145aa3/' className={sidebar ? "linkedinDiv" : 'linkedInImg'}>
                <img className='linkedIn transformOneOne'
                  src='http://cdn.designblognews.com/wp-content/uploads/2020/07/linkedinlogo-1593683207nkg84.png'
                  alt=''
                />
              </a> */}
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

      {/* { Search Bar Div and Information} */}
      <div className="searchBarDiv">
        <input
          className='searchInput'
          value={searchInput}
          maxLength={55}
          placeholder='Search'
          onChange={(e) => (CheckSeachBar(), setSearchInput(e.target.value))}
        />
        {searchInput &&
          <div className="resultDisplayDiv">
            <div className="Topresults">
              <div className='resultSearchhdr'> Top Results </div>
              {VideoResult?.map(video => (
                <a href={`/videos/${video.id}/`} style={{ textDecoration: 'none', color: 'black' }}>
                  <div className='eachVideoResultDiv'>
                    <img src={video.image_url} alt='' height={20} width={20} />
                    <span className='eachVidTitle'> {video.title}</span>
                  </div>
                </a>
              ))}
            </div>

            <div className="CloseResults">
              <div className='resultSearchhdr'> Close Results </div>
              {CloseVideoResults?.map(video => (
                <a href={`/videos/${video.id}/`} style={{ textDecoration: 'none', color: 'black' }}>
                  <div className='eachCloseVideoResultDiv'>
                    <img src={video.image_url} alt='' height={20} width={20} />
                    <span className='eachVidTitle'> {video.title}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        }
        <button className="searchInputbtn">
          <span className="searchInputIcon"><IoIosSearch /></span>
        </button>
      </div>

      <button className='logOutBtn' onClick={onLogout}> <span className='logOutSpan'> <RiAccountPinBoxFill />< GrLogout />  </span> </button>

    </nav >
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
