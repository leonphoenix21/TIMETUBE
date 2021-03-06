import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/session';
import { NavLink } from "react-router-dom";
import { ImHome } from "react-icons/im";
import { MdSwitchAccount } from "react-icons/md";

function ProfileModal({ user }) {

    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const sessionUser = useSelector(state => state.session.user)
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

    const onLogout = () => {
        dispatch(logout());
    };


    return (
        <>
            <div>
                <span className="navlinks homeIcon" onClick={openMenu} > <  ImHome /></span>
                <div className="dropdown">
                    {showMenu && (
                        <div className="profile-dropdown">
                            <div>
                                <NavLink className='navlinks ' to={`/users/${sessionUser?.id}`} exact={true} activeClassName="active"><span><MdSwitchAccount /> </span> Profile </NavLink>
                                <div style={{ width: '100%', borderBottom: 'whitesmoke solid 1px', paddingTop: '7px' }}> </div>
                            </div>
                            <button style={{ minWidth: '80px' }} onClick={onLogout}>Log Out</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProfileModal;