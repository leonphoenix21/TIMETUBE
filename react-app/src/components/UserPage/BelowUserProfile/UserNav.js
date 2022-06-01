import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNavBar = () => {


    return (
        <nav className='navbar' >
            <NavLink to='/library/upload' className='navlinks' >
                uploads
            </NavLink>

            <NavLink to='/library/likes' className='navlinks' >
                liked
            </NavLink>
        </nav>
    )
}

export default UserNavBar;