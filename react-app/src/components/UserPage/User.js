import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChannelUploadedVids from '../ViewChannels/channelVideos';
import Avatar from './Avatar';
import UserNavBar from './BelowUserProfile/UserNav';
import EditUserModal from './EditUserModal';
import UserInfo from './UserInfo';

function User() {
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const sessionUser = useSelector(state => state.session.user)
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
    <div className='details'>
      <div className='userheader'>
        <img className='header'
          src={`${user?.header}`}
          onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
          alt='' />
      </div>
      <div className='user avatar'>
        < Avatar />
        <div className='UserInfoDiv'>
          <UserInfo />
        </div>
        <div className='editModalbtn'>
          <EditUserModal />
        </div>
      </div>
      <div className='bottom-line'> </div>
      {
        sessionUser.id === +userId ?
          <>
            <UserNavBar />
            <ChannelUploadedVids channelId={+userId} />
          </>
          :
          <>
            <ChannelUploadedVids channelId={+userId} />
          </>
      }


    </div>
  );
}
export default User;
