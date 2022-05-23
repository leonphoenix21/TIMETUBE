import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';


const Logo = () => {
    return (
        <div>
            <NavLink to='/' className='navlinks' exact={true} activeClassName='active'>
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

export default Logo;
