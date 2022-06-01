import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css'

function LibraryPage() {


    return (
        <div className='libraryContainer'>
            <div className="libraryNavbar">
                <nav className='libraryNav'>
                    <NavLink to='/library/upload' className='libNavLink'>
                        Uploads </NavLink>
                    <NavLink to='/library/likes' className='libNavLink'>
                        Likes </NavLink>
                </nav>
            </div>
        </div>
    )
}

export default LibraryPage;