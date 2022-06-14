import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllVideos, likeVideo, unlikeVideo } from '../../../store/videos';
import './videolist.css';



const VideoDisplay = () => {

    const [hoverVid, setHoverVid] = useState(false)
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
        const findUser = users.filter(currUser => currUser?.id === +id);
        const userAvatar = findUser[0]?.avatar
        return userAvatar;
    }
    const channelName = (id) => {
        const findUser = users.filter(currUser => currUser?.id === +id);
        const userAvatar = findUser[0]?.username
        return userAvatar;
    }




    const videos = useSelector(state => state.videos);
    const allVideos = Object.values(videos).reverse()
    // const likes = 
    return (
        <div className='allVideos'>
            <div className='gallery' >
                <div className='firstBlockDiv'>
                </div>
                {
                    allVideos.map(video => (

                        <>
                            {
                                !hoverVid ?
                                    <>
                                        <div className='pics' key={video.id} >
                                            <NavLink to={`/videos/${video.id}/`} key={video.id}>
                                                <img
                                                    className='HomePoster'
                                                    placeholder={video.title}
                                                    src={video.image_url}
                                                    alt={video.title}
                                                    style={{ width: '100%' }}
                                                    onError={(e) =>
                                                        e.target.src =
                                                        ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                                                />

                                            </NavLink>
                                            <div className='HomePosterDesc'>
                                                <NavLink to={`/user/${video.user_id}`} style={{ color: 'black' }} >
                                                    <div className="homePosterAvtr">
                                                        <img className='videoListAvtr'
                                                            src={`${PosterPicture(video.user_id)}`}
                                                            onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                                                        />
                                                    </div>
                                                    <div className='channelNamePost'>
                                                        <span>{channelName(video.user_id)} </span>
                                                    </div>
                                                </NavLink>
                                                <div className="PosterTitle">
                                                    <NavLink to={`/videos/${video.id}/`} style={{ color: 'black', textDecoration: 'none' }}>
                                                        {video.title}
                                                    </NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </>

                                    :
                                    <>
                                        <img
                                            placeholder={video.title}
                                            src={video.image_url}
                                            alt={video.title}
                                            style={{ width: '100%' }}
                                            onError={(e) =>
                                                e.target.src =
                                                ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                                        />
                                    </>
                            }
                        </>

                    ))}
            </div>
        </div>
    )
}

export default VideoDisplay;