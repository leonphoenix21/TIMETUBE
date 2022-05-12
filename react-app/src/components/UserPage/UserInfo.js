import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function UserInfo() {
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
        <div className='userInfo '>
            <div className='fullname'>
                <strong> {user.firstname} {user.lastname} </strong>
            </div>
            <div className='username'>
                <strong>Username</strong> {user.username}
            </div>
            <div className='email'>
                <strong>Email</strong> {user.email}
            </div>
        </div>
    );
}
export default UserInfo;