import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllVideos } from '../../store/videos';
import './homeChannel.css';

const ChannelHomeVids = () => {

    const { channelId } = useParams()
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
    const allVideos = useSelector(state => Object.values(state.videos).filter(vid => vid.user_id === +channelId).reverse())



    return (
        <>
            {
                allVideos.length > 0 ?
                    <>
                        <div className='allVideos'>
                            <div className='gallery' >


                                {allVideos.map(video => (
                                    <div className='pics' key={video.id} >
                                        <a href={`/videos/${video.id}/`} key={video.id}>
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
                                        </a>
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
                                                <div className='channelNamePost' style={{ textTransform: 'capitalize' }}>
                                                    <span>{channelName(video.user_id)} </span>
                                                </div>
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


export default ChannelHomeVids;