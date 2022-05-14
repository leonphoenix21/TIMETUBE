import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Header() {
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
        <ul>
            <li>

                <p> </p>
            </li>
        </ul>
    );
}
export default Header;