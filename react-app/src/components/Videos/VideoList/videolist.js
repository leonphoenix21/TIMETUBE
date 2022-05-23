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
                <div className='firstBlockDiv'>
                </div>
                {allVideos.map(video => (
                    <div className='pics' key={video.id} >
                        <a href={`videos/${video.id}/`} key={video.id}>
                            <img
                                className='HomePoster'
                                placeholder={video.title}
                                src={video.image_url}
                                alt={video.title}
                                style={{ width: '100%' }}
                                onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}

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