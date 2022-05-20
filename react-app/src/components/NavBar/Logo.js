import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';


const Logo = () => {


    return (
        <>
            <NavLink to='/' className='navlinks' exact={true} activeClassName='active'>
                <img src='https://clipart.world/wp-content/uploads/2020/09/classic-camera-clipart-transparent.png' alt='' className='homeScreenIcon' />
            </NavLink>
        </>
    );
}

export default Logo;
