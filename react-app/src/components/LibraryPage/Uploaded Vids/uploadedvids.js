import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { BsGearWideConnected } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import './uploadedvids.css';

function LibraryUploadVids() {

    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user)
    const Allvideos = useSelector(state => Object.values(state.videos).filter(vid => vid.user_id === +sessionUser.id).reverse())
    const navLink = (videoId) => {
        history.push(`/edit/${videoId}`)
    }
    return (
        <div className='LibraryUploadVids'>
            {Allvideos.map(video => (
                <div className='libraryPics' key={video.id} >
                    <a href={`/videos/${video.id}/`} key={video.id}>
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
                    <button onClick={() => navLink(video.id)}
                        className='singlePageEditbtn'
                    > Edit Video <BsGearWideConnected />
                    </button>
                </div>
            ))}
        </div>
    )
}

export default LibraryUploadVids;