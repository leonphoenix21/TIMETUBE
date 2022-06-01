import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'
import './likedvids.css';

function LibraryLikedVids() {

    const sessionUser = useSelector(state => state.session.user)

    return (
        <div className='LibraryUploadVids'>
            <div className="LikedVideos">
                The Liked Videos
            </div>
        </div>
    )
}

export default LibraryLikedVids;