import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function UserInfo() {
    const [user, setUser] = useState({});
    const { userId } = useParams();
    const sessionUser = useSelector(state => state.session.user)


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
        <div className='userInfo '>
            <div className='fullname'>
                <strong> {user.firstname} {user.lastname} </strong>
            </div>
            <div className='username'>
                <strong>Username</strong> {user.username}
            </div>

        </div>
    );
}
export default UserInfo;