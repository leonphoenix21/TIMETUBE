import { useEffect } from 'react';
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


    const videos = useSelector(state => state.videos);
    const allVideos = Object.values(videos)

    return (
        <div className='allVideos'>
            <div className='gallery' >
                {allVideos.map(video => (
                    <div className='pics' key={video.id} >
                        <a href={`videos/${video.id}/`} key={video.id}>
                            <img
                                className='HomePoster'
                                placeholder={video.title}
                                src={video.image_url}
                                alt={video.title}
                                style={{ width: '100%' }}
                            />
                        </a>
                        <div className='image-title'>{video.title}  </div>
                    </div>
                ))}
            </div>
        </div >
    )

}

export default VideoDisplay;