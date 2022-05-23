import React, { useEffect, useRef, useState } from 'react';
import VideoDisplay from '../../VideoList/videolist';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllVideos } from '../../../../store/videos';
import './sidebar.css';


function VideoSideBar() {

    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    const videos = useSelector(state => state.videos);
    const allVideos = Object.values(videos)

    useEffect(() => {
        dispatch(getAllVideos());
    }, [dispatch]);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, [dispatch]);
    const findVideoUser = (id) => {
        const findUser = users.filter(currUser => currUser.id === id);
        const user = findUser[0]
        return (
            <>
                <p> {user.firstname}" "{user.lastname} </p>
            </>
        )
    }
    return (
        <>
            <div className="sidebarContainer">
                {allVideos.map(video => (
                    <>
                        <div className='picDiv' key={video.id} >
                            <a href={`/videos/${+video.id}/`} key={video.id}>
                                <img
                                    className='sideBarImg'
                                    placeholder={video.title}
                                    src={video.image_url}
                                    alt={video.title}
                                // onError={({ e }) => {
                                //     // e.onerror = null;
                                //     e.src = 'https://ih1.redbubble.net/image.1339858831.9273/st,small,845x845-pad,1000x1000,f8f8f8.u1.jpg'
                                // }}
                                />
                            </a>
                            <div className="sidebarDescription">
                                <div className='sideTitle'><strong > {video.title}</strong></div>
                                <p className='sideDescription'> {video.description}</p>
                            </div>


                        </div>
                    </>
                ))}

            </div>
        </>
    )

}

export default VideoSideBar;