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
                    // onError={({ e }) => {
                    //     // e.onerror = null;
                    //     e.src = 'https://ih1.redbubble.net/image.1339858831.9273/st,small,845x845-pad,1000x1000,f8f8f8.u1.jpg'
                    // }} 
                    />
                    <p className='websiteName'>timetube</p>
                </div>
            </NavLink>
        </div>
    );
}

export default Logo;
