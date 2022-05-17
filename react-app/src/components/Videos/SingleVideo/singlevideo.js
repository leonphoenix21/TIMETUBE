import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Comments from '../../Comments/VideoCommentsDisplay/CreateComments/create-comments';


import './videoview.css'



function SingleVideo() {

    const { videoId } = useParams()
    const history = useHistory();

    const [user, setUserUploader] = useState({});
    const video = useSelector(state => state.videos[videoId])

    useEffect(() => {
        if (!video?.user_id) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${+video?.user_id}`);
            const user = await response.json();
            setUserUploader(user);
        })();
    }, [videoId]);

    const navLink = (id) => {
        history.push(`/edit/${videoId}`)
    }

    return (
        <>
            <div data-vjs-player className='videoPlayerDiv'>
                <video className="video-js vjs-default-skin " width="640px" height="267px"
                    controls preload="none" poster={video?.image_url}
                    data-setup='{ "aspectRatio"16:9", "playbackRates": [1, 1.5, 2] }'>
                    <source src={video?.video_url} type='video/mp4' />
                </video>
            </div>
            <div className='descriptionTitle'>
                <strong className='displayname'> {video?.title}</strong>

            </div>
            <div className='bottom-line singleline'></div>

            <div className='VideoInfo'>
                <div>
                    <img className='avatar singleview' src={`${user?.avatar}`} />
                </div>
                <div className='fullname single'>
                    <strong > {user?.firstname} {user?.lastname} </strong>
                </div>
            </div>

            <div className='videoDescription'>
                <p> {video?.description}</p>
                <button onClick={navLink}> Edit  </button>
            </div>
            < Comments Id={videoId} />

        </>
    )

}

export default SingleVideo;