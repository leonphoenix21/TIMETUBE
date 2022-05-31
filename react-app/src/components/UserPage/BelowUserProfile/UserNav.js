import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNavBar = () => {


    return (
        <nav className='navbar' >
            <a className='navlinks' >
                uploads
            </a>

            <a className='navlinks' >
                liked
            </a>
        </nav>
    )
}

export default UserNavBar;