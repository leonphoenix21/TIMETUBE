import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addViewCount } from '../../../../store/videos';
import VideoDisplay from '../../VideoList/videolist';
import { TbRectangle } from 'react-icons/tb';
import './singlevideo.css'

function SingleVideo() {


    const history = useHistory();
    const dispatch = useDispatch();
    const { videoId } = useParams()
    const [opennote, setOpenNote] = useState(false)
    const [opentheather, setOpenTheater] = useState(false)
    const [users, setUsers] = useState([]);
    const Allvideos = useSelector(state => Object.values(state.videos).filter(vid => vid.id === +videoId))
    const videoPlaying = Allvideos[0]

    const openNote = () => {
        if (opennote) {
            setOpenNote(false)
        } else {
            setOpenNote(true)
        }
    }


    const theatherFade = () => {

        if (opentheather) {
            setTimeout(() => {
                setOpenTheater(false)
            }, 500)
        } else {
            setOpenTheater(true)
        }
    }


    const View_Count_HandleSubmit = async (video) => {
        let count = 1;
        const formData = new FormData();
        formData.append("id", video?.id);
        if (video.view_count === null) {
            formData.append("view_count", count)
        } else {
            formData.append("view_count", video?.view_count + 1)
        }

        const data = await dispatch(addViewCount(formData))
    }


    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
            if (videoPlaying) {
                async function fetchData() {
                    View_Count_HandleSubmit(videoPlaying)
                }
                fetchData();
            }

        }
        fetchData();
    }, [dispatch]);


    window.onbeforeunload = () => {
        if (videoPlaying) {
            async function fetchData() {
                View_Count_HandleSubmit(videoPlaying)
            }
            fetchData();
        }
    }


    const findUser = users.filter(currUser => currUser.id === videoPlaying?.id);
    const user = findUser[0]


    return (
        <>
            {Object.values(Allvideos).length > 0 ?
                <>
                    <div data-vjs-player className='SinglevideoPlayerDiv'>
                        <video onMouseEnter={theatherFade} className="video-js vjs-default-skin " width="640px" height="267px"
                            controls preload="none" poster={videoPlaying?.image_url}
                            data-setup='{ "aspectRatio"16:9", "playbackRates": [1, 1.5, 2] }'
                            autoPlay={true}
                        >
                            <source src={videoPlaying?.video_url} type='video/mp4' />
                        </video>

                    </div>
                    {/* {opentheather && <span onMouseEnter={openNote} onMouseLeave={openNote} className='theaterMode'> <TbRectangle /> </span>}
                    {opennote && <span className='theaterModepopup'> Theater mode </span>} */}

                </>
                :
                <>
                </>
            }

        </>
    )

}

export default SingleVideo;