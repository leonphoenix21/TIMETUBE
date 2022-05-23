import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';


const Logo = () => {


    return (
        <div>
            <NavLink to='/' className='navlinks' exact={true} activeClassName='active'>
                <div className="logoPicName">
                    <img src='https://clipart.world/wp-content/uploads/2020/09/classic-camera-clipart-transparent.png' alt='' className='homeScreenIcon' />
                    <p className='websiteName'>timetube</p>
                </div>
            </NavLink>
        </div>
    );
}

export default Logo;
