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
    // const showOrNot = (id) => {
    //     const videos = allVideos.filter(vid => vid.user_id === id).reverse()
    //     if (videos.length < 1) return false
    //     if (videos.length >= 1) return true

    // }
    const videos = allVideos.filter(vid => vid.user_id === +channelId).reverse()



    return (
        <>
            <div className="homeChannels">
                <div className='homechannelList'>
                    <div style={{ position: 'relative', height: '100px', width: '100px', marginLeft: '130px' }}>
                        <NavLink to='/home' >
                            <span className='homeVidLogo homeEachChannel'>
                                All
                            </span >
                        </NavLink>
                    </div>
                    {
                        users.map((user) => (
                            <>
                                <NavLink to={`/home/${user.id}`} className='homeEachChannel' >
                                    <div className='channelLinks'>
                                        <div className='each'
                                            style={{ textDecoration: 'none', color: 'black' }}
                                            onClick={() => setChannelNum(user.id)}
                                        >
                                            <div className='channelIconName'>
                                                <span className='vidPlayIcon'><BsFillPlayBtnFill /> </span>
                                                <span style={{ fontSize: '15px', marginLeft: '10px' }}>{user.username}</span>
                                                <span style={{ fontWeight: 'bold' }}>{userVideoCount(user.id)} </span>
                                            </div >
                                        </div>
                                    </div>
                                </NavLink>
                            </>
                        ))
                    };
                </div>
            </div>


        </>
    );
}

export default HomeChannels;
