import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
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
import { BiUserCircle } from "react-icons/bi";
import { RiVideoAddLine } from "react-icons/ri";
import { BiLogIn } from "react-icons/bi";
import { IoMdCreate } from 'react-icons/io';
import { MdOutlineAccountBox } from "react-icons/md";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { GrHome } from "react-icons/gr";
import { logout } from '../../store/session';

import Logo from './Logo';


const NavBar = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)
  const [sidebar, setSidebar] = useState(false);
  const [resultDisplay, setResultDisplay] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [closeResult, setCloseResult] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showIconMenu, setShowIconMenu] = useState(false);
  const [users, setUsers] = useState([]);
  const showSidebar = () => setSidebar(!sidebar);
  const DontshowSidebar = () => setSidebar(false);
  const onLogout = () => {
    dispatch(logout());
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  //? Icon Menu 
  const openIconMenu = () => {
    if (showIconMenu) return;
    setShowIconMenu(true);
  };
  useEffect(() => {
    if (!showIconMenu) return;

    const closeIconMenu = () => {
      setShowIconMenu(false);
    };

    document.addEventListener('click', closeIconMenu);

    return () => document.removeEventListener("click", closeIconMenu);
  }, [showIconMenu]);

  const CheckSeachBar = () => {
    if (searchInput.length) {
      setResultDisplay(true);
    } else {
      setResultDisplay(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch]);



  const PosterPicture = (id) => {

    if (sessionUser) {
      const findUser = users?.filter(currUser => currUser?.id === sessionUser.id);
      const userAvatar = findUser[0]?.avatar
      return userAvatar;
    }
  }

  const AllVideos = useSelector(state => Object.values(state.videos))

  const VideoResult = AllVideos?.filter(video => {
    if (searchInput.length === 1) {
      if (video?.title.toLowerCase().includes(searchInput.toLowerCase())
      ) return video
    }

    else if (searchInput.length === 2) {
      if (video?.title.toLowerCase().includes(searchInput.toLowerCase())) return video
    }
    else if (searchInput.length === 3) {
      if (video?.title.toLowerCase().includes(searchInput.toLowerCase())) return video
    } else if (searchInput.length > 0) {
      if (video?.title.toLowerCase().includes(searchInput.toLowerCase())) return video
    }

  })

  const CloseVideoResults = AllVideos?.filter(video => {
    for (let i = 0; i < searchInput.length; i++) {
      let letter = searchInput[0]
      if (video?.title.toLowerCase().includes(letter.toLowerCase())
        || video?.description.toLowerCase().includes(letter.toLowerCase())) return video
    }
  })


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
                  < li key={index} className={sidebar ? item.cName : 'nav-text-unactive'}>
                    <Link to={item.path}>
                      <span className={sidebar ? 'nav-text-icon' : 'nav-text-icon-unactive'}>{item.icon}</span>
                      <span className={sidebar ? 'sidebarItemTitle' : 'sIT'} >{item.title}</span>
                    </Link>
                  </li>
                );
              })}


              {/* // Account Option on SideBar Menu */}

              <li className={sidebar ? 'nav-text' : 'nav-text-unactive'}>
                <NavLink to={`/user/${sessionUser?.id}`}>
                  <span className={sidebar ? 'nav-text-icon' : 'nav-text-icon-unactive'}><MdSwitchAccount /></span>
                  <span className={sidebar ? 'sidebarItemTitle' : 'sIT'}>Account </span>
                </NavLink>
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


      {/*  Search Bar Div and Information */}
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

      <div className='userProfileUploadIcon' onClick={openIconMenu}> <RiVideoAddLine /> </div>
      <div className="dropdown">
        {showIconMenu && (
          <div className="upload-dropdown">
            <div className='lidrop-downDiv'>
              <NavLink className='lidrop-down' to={`/upload`} exact={true} activeClassName="active">
                <span className='logoutImgSpan' style={{ marginRight: '15px' }} >
                  < AiOutlinePlaySquare /></span>  Upload
              </NavLink>
            </div>

          </div>
        )}
      </div>

      <img className='userProfileImg'
        onClick={openMenu}
        height='30'
        width='30'
        src={`${PosterPicture(sessionUser?.user_id)}`}
        onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
      />
      <div className="dropdown">
        {showMenu && (
          <div className="profile-dropdown">
            <div className='dropdownImgDiv'>
              <img className='dropdownImg'
                onClick={openMenu}
                height='45'
                width='45'
                src={`${PosterPicture(sessionUser?.user_id)}`}
                onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
              />

              <div className='dropdownFullname'>
                {sessionUser?.firstname} {sessionUser?.lastname}
                <div className='myta'> <NavLink to={`/users/${sessionUser?.id}`} style={{ textDecoration: 'none', color: '#065FD4', cursor: 'pointer' }}> Manage your TimeTube account  </NavLink></div>
              </div>
            </div>
            <div className='logoutDropdownDiv'> <NavLink className='logoutDropdownDiv' to={`/users/${sessionUser?.id}`} style={{ textDecoration: 'none', cursor: 'pointer' }}> <span className='logoutImgSpan'> < MdOutlineAccountBox /> </span> <span className='logoutSpan'> Your Channel </span>  </NavLink></div>
            <div className='logoutDropdownDiv'> <NavLink className='logoutDropdownDiv' to={`/home`} style={{ textDecoration: 'none', cursor: 'pointer', marginTop: '-15px' }}><span className='logoutImgSpan' style={{ marginLeft: '-4px' }}> < GrHome /> </span> <span className='logoutSpan' > Back To Home </span> </NavLink> </div>
            <div className='logoutDropdownDiv' onClick={onLogout} style={{ cursor: 'pointer' }}> <span> < GrLogout /></span> <span className='logoutSpan'> Sign Out </span>   </div>

          </div>
        )}
      </div>

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
            <div className="userProfileBtn" onClick={openMenu}>
              <div className='signInIcon'> <  BiUserCircle /></div>
              <div className='signInText'> SIGN IN </div>
            </div>
            <div className="dropdown">
              {showMenu && (


                <div className="upload-dropdown">
                  <NavLink className='lidrop-down' to={`/login`} exact={true} activeClassName="active">
                    <span className='logoutImgSpan' style={{ marginLeft: '15px', marginRight: '10px' }} >
                      < BiLogIn /></span>  Sign In
                  </NavLink>
                  <NavLink className='lidrop-down' to={`/sign-up`} exact={true} activeClassName="active">
                    <span className='logoutImgSpan' style={{ marginLeft: '15px', marginRight: '10px' }} >
                      < IoMdCreate /> </span>  Sign Up
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </>
      }
    </>
  );
}

export default NavBar;
