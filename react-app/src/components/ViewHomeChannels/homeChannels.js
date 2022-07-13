import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './homeChannel.css'
import { getAllVideos } from '../../store/videos';
import { BsFillPlayBtnFill } from "react-icons/bs";


function HomeChannels() {

    const { channelId } = useParams()
    const [users, setUsers] = useState([]);
    const [channelNum, setChannelNum] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();

            setUsers(responseData.users);
        }
        fetchData();
    }, []);
    useEffect(() => {
        dispatch(getAllVideos());
    }, [dispatch]);

    const allVideos = useSelector(state => Object.values(state.videos))
    if (!allVideos) {

    }
    const userVideoCount = (id) => {
        const videos = allVideos.filter(vid => vid.user_id === id).reverse()
        if (videos.length < 1) return ' :( no vids';
        if (videos.length === 1) return `: ${videos.length} vid`;
        return `: ${videos.length} vids`;
    }

    const videos = allVideos.filter(vid => vid.user_id === +channelId).reverse()

    //? Checks if each user has uploaded atleast one video
    const checkedUsers = users.filter(user => {
        const videos = allVideos.filter(vid => vid.user_id === user.id).reverse()
        if (videos.length > 0) return user;
    })

    return (
        <>
            <div className="homeChannels">
                <div className='homechannelList'>
                    <NavLink to='/home' style={{ textDecoration: 'none' }}>
                        <span className=' homeEachChannel' style={{ fontSize: '14px', padding: '5px 15px 5px 15px ', marginLeft: '80px' }}>
                            All
                        </span >
                    </NavLink>

                    {

                        checkedUsers.map((user) => (
                            <>
                                <span className='each'
                                    style={{ textDecoration: 'none', color: 'black' }}
                                    onClick={() => setChannelNum(user.id)}
                                >
                                    <NavLink to={`/home/${user.id}`} className='homeEachChannel' >
                                        {user.username}

                                    </NavLink>
                                </span>
                            </>
                        ))


                    }
                </div>
            </div>


        </>
    );
}

export default HomeChannels;
