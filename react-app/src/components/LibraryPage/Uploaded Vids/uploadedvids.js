import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { addViewCount, getAllVideos, likeVideo, unlikeVideo } from '../../../store/videos';
import { BsDot } from 'react-icons/bs';
import Moment from "react-moment";
import 'moment-timezone';
import { BsGearWideConnected } from 'react-icons/bs';
import { FaPlay } from 'react-icons/fa';
import './uploadedvids.css';

function LibraryUploadVids() {

    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, [dispatch]);

    const Allvideos = useSelector(state => Object.values(state.videos).filter(vid => vid.user_id === +sessionUser.id).reverse())
    const navLink = (videoId) => {
        history.push(`/edit/${videoId}`)
    }
    const playVidLink = (videoId) => {
        history.push(`/videos/${videoId}/`)
    }

    const PosterPicture = (id) => {
        const findUser = users.filter(currUser => currUser?.id === +id);
        const userAvatar = findUser[0]?.avatar
        return userAvatar;
    }
    const channelName = (id) => {
        const findUser = users.filter(currUser => currUser?.id === +id);
        const userAvatar = findUser[0]?.username
        return userAvatar;
    }

    const VideoViewCount = (video) => {
        const ViewCount = video.view_count;
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

    const View_Count_HandleSubmit = async (video) => {
        let count = 1;
        const formData = new FormData();
        formData.append("id", video.id);
        if (video.view_count === null) {
            formData.append("view_count", count)
        } else {
            formData.append("view_count", video.view_count + 1)

        }

        const data = await dispatch(addViewCount(formData))
        console.log(data)
    }
    return (
        <div className='LibraryUploadVids'>
            {
                Allvideos.map(video => (

                    <>

                        <div className='pics libHom' key={video.id} >
                            <NavLink to={`/videos/${video.id}/`} key={video.id} >
                                <img
                                    className='HomePoster '
                                    placeholder={video.title}
                                    src={video.image_url}
                                    alt={video.title}
                                    onClick={() => (View_Count_HandleSubmit(video))}
                                    height={185}
                                    width='100%'
                                    onError={(e) =>
                                        e.target.src =
                                        ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                                />

                            </NavLink>
                            <div className='HomePosterDesc'>
                                <div className="homePosterAvtr">
                                    <NavLink to={`/user/${video.user_id}`} style={{ color: 'black' }} >
                                        <img className='videoListAvtr'
                                            height='35'
                                            width='35'
                                            src={`${PosterPicture(video.user_id)}`}
                                            onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                                        />
                                    </NavLink>
                                </div>


                                <div className="PosterTitleDiv">
                                    <div className="PosterTitle">
                                        <NavLink to={`/videos/${video.id}/`} style={{ color: 'black', textDecoration: 'none', textTransform: 'uppercase' }} >
                                            {video.title}
                                        </NavLink>
                                    </div>
                                    <div className='channelNamePost'>
                                        <span>{channelName(video.user_id)} </span>
                                    </div>
                                    <div className='videoCountDiv'>
                                        <span> {VideoViewCount(video)} <BsDot /> {TimeSession(video)}</span>
                                        <div className='editlibraybtnDiv'>
                                            <button onClick={() => navLink(video.id)}
                                                className='libraryEditbtn'
                                                style={{ marginLeft: '0px' }}
                                            > Edit Video <BsGearWideConnected />
                                            </button>
                                            <button onClick={() => playVidLink(video.id)}
                                                className='libraryEditbtn'
                                            > Play Video <FaPlay />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
        </div>
    )
}

export default LibraryUploadVids;