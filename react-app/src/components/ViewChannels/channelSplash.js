import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import VideoDisplay from '../Videos/VideoList/videolist';
import { getAllVideos } from '../../store/videos';
import { BsFillPlayBtnFill } from "react-icons/bs";
import './channelList.css';


function ChannelSplash() {

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
    const userVideoCount = (id) => {
        const videos = allVideos.filter(vid => vid.user_id === id).reverse()
        if (videos.length < 1) return ' :( no vids';
        if (videos.length === 1) return `: ${videos.length} vid`;
        return `: ${videos.length} vids`;
    }

    return (
        <>

            <div className="Channels">
                <div className='channelList'>
                    <h2 style={{ marginRight: '10px' }}>{`Channels: `}</h2>
                    {
                        users.map((user) => (
                            <>
                                <NavLink to={`/channels/${user.id}`} className='eachChannel' >
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
            <div className="channelVideoTitle" >
                <h1> Choose Channel to display videos  </h1>
                <div className="borderBottom"></div>
            </div>
            <VideoDisplay />
        </>
    );
}



export default ChannelSplash;