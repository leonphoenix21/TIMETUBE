import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getAllVideos } from '../../../store/videos';
import './videolist.css';

const VideoDisplay = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllVideos());
    }, [dispatch]);


    const sessionUser = useSelector(state => state.session.user);
    const videos = useSelector(state => state.videos);
    const allVideos = Object.values(videos)
    console.log(allVideos, 'VVVVVVVVVVVVVVVVV')
    const [num, setNum] = useState(0);


    const navLink = (id) => {
        history.push(`/video/${id}`)
    }

    return (
        <>
            <h1 id='videoH1'> Clips </h1>
            <div className='gallery' >
                {allVideos.map(video => (
                    <>
                        <div className='pics' key={video.id} >
                            <img
                                id='videoImg'
                                placeholder={video?.title}
                                src={video?.image_url}
                                alt={video.title}
                                style={{ width: '100%' }}
                            />
                            <div className='image-overlay'
                                onClick={() => navLink(video.id)}
                            >
                                <div className='insideOverlay'>
                                    <div className='image-title'>{video.title}  </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}


            </div>
        </>
    )

}

export default VideoDisplay;