import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllVideos } from '../../../store/videos';
import { BsDot } from 'react-icons/bs';
import Moment from "react-moment";
import 'moment-timezone';
import './videolist.css';
import { platform } from 'os';


const VideoDisplay = () => {

    const [hoverVid, setHoverVid] = useState(false);
    const [hoverText, setHoverText] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
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

    const PosterPicture = (id) => {
        const findUser = users?.filter(currUser => currUser?.id === +id);
        const userAvatar = findUser[0]?.avatar
        return userAvatar;
    }
    const channelName = (id) => {
        const findUser = users?.filter(currUser => currUser?.id === +id);
        const userAvatar = findUser[0]?.username
        return userAvatar;
    }

    const VideoViewCount = (video) => {
        const ViewCount = video?.view_count;
        if (!ViewCount) return `0 views`

        let numStr = ViewCount.toString()

        if (ViewCount === 1) return `1 view`
        if (numStr.length === 4) {
            return `${numStr[0]}.${numStr[1]}K`
        } else if (numStr.length === 5) {
            return `${numStr[0]}${numStr[1]}.${numStr[2]}K`
        } else if (numStr.length === 6) {
            return `${numStr[0]}${numStr[1]}${numStr[2]}.${numStr[3]}K`
        } else if (numStr.length === 7) {
            return `${numStr[0]}.${numStr[1]}${numStr[2]}M`
        } else {
            return `${ViewCount} views`
        }
    }

    const TimeSession = (video) => {
        return (
            <Moment fromNow >{video?.created_at}</Moment>
        )
    }


    const videos = useSelector(state => state.videos);
    const allVideos = Object.values(videos).reverse();

    const PlayHoverVid = () => {
        // if (hoverVid) {
        //     setHoverText(true)
        //     setHoverVid(false)

        // } else {
        //     setHoverText(false)
        //     setTimeout(() => {
        //         if ()
        //             setHoverVid(true)
        //     }, 3000)
        // }

        setTimeout(() => {
            if (!hoverVid) setHoverVid(true)
        }, 3000)
    }

    return (
        <div className='allVideos'>
            <div className='gallery' >
                {/* <div className='firstBlockDiv'>
                </div> */}
                {
                    allVideos?.map(video => (
                        <>
                            <div className='pics' key={video?.id} >
                                <NavLink to={`/videos/${video.id}/`} key={video?.id} >

                                    <img
                                        className='HomePoster'
                                        placeholder={video?.title}
                                        src={video?.image_url}
                                        alt={video?.title}
                                        height={180}
                                        width={320}
                                        onError={(e) =>
                                            e.target.src =
                                            ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                                    />
                                </NavLink>
                                <div className='HomePosterDesc'>
                                    <div className="homePosterAvtr">
                                        <NavLink to={`/user/${video?.user_id}`} style={{ color: 'black' }} >
                                            <img className='videoListAvtr'
                                                height='35'
                                                width='35'
                                                src={`${PosterPicture(video?.user_id)}`}
                                                onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                                            />
                                        </NavLink>
                                    </div>


                                    <div className="PosterTitleDiv">
                                        <div className="PosterTitle">
                                            <NavLink to={`/videos/${video?.id}/`} style={{ color: 'black', textDecoration: 'none', textTransform: 'capitalize', fontSize: '15px' }} >
                                                {video?.title}
                                            </NavLink>
                                        </div>
                                        <div className='channelNamePost'>
                                            <span>{channelName(video?.user_id)} </span>
                                        </div>
                                        <div className='videoCountDiv'>
                                            <span> {VideoViewCount(video)} <BsDot /> {TimeSession(video)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
            </div>
        </div>
    )
}

export default VideoDisplay;

// {!hoverVid ?
//     <>
//         <img
//             className='HomePoster'
//             placeholder={video?.title}
//             src={video?.image_url}
//             alt={video?.title}
//             height={180}
//             width={320}
//             onMouseEnter={() => (PlayHoverVid(), setHoverText(true))}
//             onMouseLeave={() => (setHoverVid(false), setHoverText(false))}
//             onError={(e) =>
//                 e.target.src =
//                 ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
//         />
//         {hoverText && <span className='hoverText'> Keep Hovering To Play</span>}

//     </>
//     :
//     <>
//         <video onMouseLeave={() => PlayHoverVid()} className=" vjs-default-skin Homeposter" width="320" height="180px"
//             style={{ backgroundColor: 'black' }}
//             controls preload="none" poster={video?.image_url} muted={true}
//             data-setup='{ "aspectRatio"16:9", "playbackRates": [1, 1.5, 2] }'
//             autoPlay={true}
//         >
//             <source src={video?.video_url} type='video/mp4' />
//         </video>

//     </>
// }

