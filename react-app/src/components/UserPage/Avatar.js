import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './user_page.css'
function Avatar() {
    const [user, setUser] = useState({});
    const { userId } = useParams();
    const details = useSelector(state => state.details)

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [userId, details]);

    if (!user) {
        return null;
    }

    return (
        <div>
            <div>
                <img className='avatar profileAvtr' src={`${user.avatar}`}
                    onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                />
            </div>
        </div>
    );
}
export default Avatar;