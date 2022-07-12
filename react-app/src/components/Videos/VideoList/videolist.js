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

                            <div className='pics' key={video.id} >
                                <NavLink to={`/videos/${video.id}/`} key={video.id}>
                                    <img
                                        className='HomePoster'
                                        placeholder={video.title}
                                        src={video.image_url}
                                        alt={video.title}
                                        height={165}
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