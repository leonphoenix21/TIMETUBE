import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './navbar.css';
import ProfileModal from './ProfileModal';


const NavBar = () => {

  const sessionUser = useSelector(state => state.session.user)
  let sessionlinks = (
    <nav className='navbar'>
      <NavLink className='navlinks' to='/users' exact={true} activeClassName='active'>
        Users
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
          <nav>

            <ul>
              <li>
                <NavLink to='/' exact={true} activeClassName='active'>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to='/login' exact={true} activeClassName='active'>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  Sign Up
                </NavLink>
              </li>
            </ul>
          </nav>
        </>
      }
    </>
  );
}

export default NavBar;
