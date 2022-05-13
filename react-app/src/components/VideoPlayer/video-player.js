import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import { useParams } from 'react-router-dom';
import './videoPlayer.scss'
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
import { useSelector } from 'react-redux';

function VideoPlayer() {

    const { videoId } = useParams()
    let videoRef = useRef(null);
    const playerRef = useRef(null);

    const video = useSelector(state => state.videos[+videoId])
    console.log('hffjfjjfjjf', video)

    useEffect(() => {
        const player = playerRef.current;

        if (!player) {
            const videoElement = videoRef.current;
            if (!videoElement) return;

            playerRef.current = videojs(videoElement);
        };

        player.seekButtons({
            forward: 30,
            back: 10
        });



        return () => {
            if (player) {
                player.dispose()
                playerRef.current = null;
            }
        };



    }, [videoRef, playerRef])



    return (
        <div >
            <video className="video-js vjs-default-skin" width="640px" height="267px"
                controls preload="none" poster={video?.image_url}
                data-setup='{ "aspectRatio":"640:267", "playbackRates": [1, 1.5, 2] }'>
                <source src={video?.video_url} type='video/mp4' />
            </video>
        </div>
    )

}
