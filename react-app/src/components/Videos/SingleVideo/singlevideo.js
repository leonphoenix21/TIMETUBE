import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import videojs from 'video.js';
import './videoview.css'
// import ReactPlayer from 'react-player'
// import Appbar from '@material-ui/core/AppBar';
// import Container from '@material-ui/core/Container';
// City
import '@videojs/themes/dist/city/index.css';

// Fantasy
import '@videojs/themes/dist/fantasy/index.css';

// Forest
import '@videojs/themes/dist/forest/index.css';

// Sea
import '@videojs/themes/dist/sea/index.css';

function SingleVideo() {

    const { videoId } = useParams()
    const history = useHistory();

    const [user, setUserUploader] = useState({});
    console.log('///sfsefaeff///asfafs/', videoId)
    const video = useSelector(state => state.videos[+videoId])

    useEffect(() => {
        if (!video?.user_id) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${video.user_id}`);
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

        </>
    )

}

export default SingleVideo;