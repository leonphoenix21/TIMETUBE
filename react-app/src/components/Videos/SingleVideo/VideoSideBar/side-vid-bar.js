import React, { useEffect, useRef, useState } from 'react';
import VideoDisplay from '../../VideoList/videolist';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllVideos } from '../../../../store/videos';
import './sidebar.css';


function VideoSideBar() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllVideos());
    }, [dispatch]);


    const videos = useSelector(state => state.videos);
    const allVideos = Object.values(videos)
    return (
        <>
            <div className="sidebarContainer">
                {allVideos.map(video => (
                    <>
                        <div className='picDiv' key={video.id} >
                            <NavLink to={`videos/${video.id}/`} key={video.id}>
                                <img
                                    className='sideBarImg'
                                    placeholder={video.title}
                                    src={video.image_url}
                                    alt={video.title}
                                />
                            </NavLink>


                        </div>
                    </>
                ))}

            </div>
        </>
    )

}

export default VideoSideBar;