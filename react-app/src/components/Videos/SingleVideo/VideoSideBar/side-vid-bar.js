import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllVideos } from '../../../../store/videos';
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
                                <div className='sideTitle'> {video.title}</div>
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