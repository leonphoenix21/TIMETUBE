import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function VideoPlayerComp({ videoId }) {


    const Allvideos = useSelector(state => Object.values(state.videos).filter(vid => vid.id === +videoId))
    const videoPlaying = Allvideos[0]

    return (
        <>
            {Object.values(Allvideos).length > 0 ?
                <>
                    <div data-vjs-player >
                        <video className=" vjs-default-skin " width="640px" height="267px"
                            controls preload="none" poster={videoPlaying?.image_url}
                            data-setup='{ "aspectRatio"16:9", "playbackRates": [1, 1.5, 2] }'>
                            <source src={videoPlaying?.video_url} type='video/mp4' />
                        </video>
                    </div>

                </>
                :
                <>
                </>
            }

        </>
    )


}

export default VideoPlayerComp;