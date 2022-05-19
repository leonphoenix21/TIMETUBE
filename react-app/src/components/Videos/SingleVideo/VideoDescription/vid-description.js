import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './desc-vid.css'

function VideoDescription() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { videoId } = useParams()

    //Querrying for users and finding the user who uploaded this video
    const [users, setUsers] = useState([]);
    const Allvideos = useSelector(state => Object.values(state.videos).filter(vid => vid.id === +videoId))
    const videoPlaying = Allvideos[0]
    console.log('KLKLKLKLKL', videoPlaying)
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, [dispatch]);
    const findUser = users.filter(currUser => currUser.id === videoPlaying?.user_id);
    const user = findUser[0]

    //redirecting to the edit page for each video
    const navLink = () => {
        history.push(`/edit/${videoId}`)
    }


    return (
        <>
            {/* making sure the video has loaded into 
           state before loading the page to make sure the items display on reload */}

            {Object.values(Allvideos).length > 0 ?
                <>
                    <div className='descriptionTitle'>
                        <strong className='displayname'> {videoPlaying?.title}</strong>
                    </div>
                    <div className='bottom-line singleline'></div>

                    <div className='VideoInfo'>
                        <div>
                            <img className='avatar singleview' src={`${user?.avatar}`} />
                        </div>
                        <div className='fullname single'>
                            <strong > {user?.firstname} {user?.lastname} </strong>
                        </div>
                    </div>

                    <div className='videoDescription'>
                        <p> {videoPlaying?.description}</p>
                        <button onClick={navLink}> Edit  </button>
                    </div>

                </>
                :
                <>
                </>
            }

        </>
    )

}

export default VideoDescription;