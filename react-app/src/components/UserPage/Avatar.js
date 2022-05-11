import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './user_page.css'
function Avatar() {
    const [user, setUser] = useState({});
    const { userId } = useParams();

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [userId]);

    if (!user) {
        return null;
    }

    return (
        <div>
            <div>
                <img className='avatar' src={`${user.avatar}`} />
            </div>
        </div>
    );
}
export default Avatar;