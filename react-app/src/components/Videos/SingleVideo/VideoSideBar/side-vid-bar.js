import React, { useEffect, useRef, useState } from 'react';
import VideoDisplay from '../../VideoList/videolist';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllVideos, addViewCount } from '../../../../store/videos';
import './sidebar.css';


function VideoSideBar() {

    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    const videos = useSelector(state => state.videos);
    const allVideos = Object.values(videos)

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
    const findVideoUser = (id) => {
        const findUser = users.filter(currUser => currUser.id === id);
        const user = findUser[0]
        return (
            <>
                <p> {user.firstname}" "{user.lastname} </p>
            </>
        )
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

    const videoJsOptions = async (video) => {
        View_Count_HandleSubmit(video)
    }


    return (
        <>
            <div className="sidebarContainer">
                {allVideos.map(video => (
                    <>
                        <div className='picDiv' key={video.id} >

                            <a href={`/videos/${+video.id}/`} key={video.id} >
                                <img
                                    className='sideBarImg'
                                    placeholder={video.title}
                                    src={video.image_url}
                                    alt={video.title}
                                    onError={(e) =>
                                        e.target.src
                                        =
                                        ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                                />
                            </a>
                            <div className="sidebarDescription">
                                <div className='sideTitle'><strong style={{ textTransform: 'uppercase' }}> {video.title}</strong></div>
                                <p className='sideDescription'> {video.description}</p>
                            </div>


                        </div>
                    </>
                ))}

            </div>
        </>
    )

}

export default VideoSideBar;