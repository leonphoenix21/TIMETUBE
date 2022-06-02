import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllVideos } from '../../store/videos';
import './channelList.css';

const ChannelUploadedVids = ({ channelId }) => {

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
    const allVideos = useSelector(state => Object.values(state.videos).filter(vid => vid.user_id === channelId).reverse())



    return (
        <>
            {
                allVideos.length > 0 ?
                    <>
                        <div className='allVideos'>
                            <div className='gallery' >
                                <div className='firstBlockDiv'>
                                </div>

                                {allVideos.map(video => (
                                    <div className='pics' key={video.id} >
                                        <a href={`/videos/${video.id}/`} key={video.id}>
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
                                        </a>
                                        <div className='HomePosterDesc'>
                                            <NavLink to={`/users/${video.user_id}`} style={{ color: 'black' }} >
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
                                ))}

                            </div>
                        </div >
                    </>
                    :

                    <div className="noVideosFound">
                        <h1> No Videos Found :( </h1>
                        <img className='noVideosFoundImg' src='https://cdn-icons-png.flaticon.com/512/6598/6598519.png' alt='' />
                    </div>

            }
        </>
    )

}


export default ChannelUploadedVids;