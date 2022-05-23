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
                // onError={({ e }) => {
                //     // e.onerror = null;
                //     e.src = 'https://ih1.redbubble.net/image.1339858831.9273/st,small,845x845-pad,1000x1000,f8f8f8.u1.jpg'
                // }}
                />
            </div>
        </div>
    );
}
export default Avatar;