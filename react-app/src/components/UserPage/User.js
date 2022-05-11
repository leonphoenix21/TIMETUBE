import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from './Avatar';
import Header from './Header';
import UserInfo from './UserInfo';

function User() {
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
    <div className='details'>
      <div className='user header'>
        <Header />
      </div>
      <div className='user avatar'>
        < Avatar />
        <UserInfo />
      </div>
      <div className='bottom-line'> </div>
    </div>
  );
}
export default User;
