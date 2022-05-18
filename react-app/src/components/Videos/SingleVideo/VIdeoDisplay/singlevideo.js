import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './videoview.css'

function SingleVideo() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { videoId } = useParams()

    const [users, setUsers] = useState([]);
    const Allvideos = useSelector(state => Object.values(state.videos).filter(vid => vid.id === +videoId))
    const videoPlaying = Allvideos[0]

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, [dispatch]);


    const navLink = (id) => {
        history.push(`/edit/${videoId}`)
    }

    const findUser = users.filter(currUser => currUser.id === videoPlaying?.id);
    const user = findUser[0]

    return (
        <>
            {Object.values(Allvideos).length > 0 ?
                <>
                    <div data-vjs-player className='videoPlayerDiv'>
                        <video className="video-js vjs-default-skin " width="640px" height="267px"
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

export default SingleVideo;