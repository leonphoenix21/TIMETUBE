import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './desc-vid.css'

function VideoDescription() {

    const history = useHistory();
    const dispatch = useDispatch();
    const { videoId } = useParams();

    const sessionUser = useSelector(state => state.session.user)
    const [users, setUsers] = useState([]);
    const [showMore, setShowMore] = useState('descriptionText');
    const [showLess, setShowLess] = useState(true);
    const Allvideos = useSelector(state => Object.values(state.videos).filter(vid => vid.id === +videoId))
    const videoPlaying = Allvideos[0]


    //Querrying for users and finding the user who uploaded this video
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

    const showMoreBtn = () => {
        if (showMore === 'descriptionText') {
            setShowLess(false)
            setShowMore('descriptionTextFull');
        } else {
            setShowLess(true)
            setShowMore('descriptionText');
        }
    }

    console.log(videoPlaying?.description.length, 'LLLLLLLLKLKLKLKLKLKLKLKLK')

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
                            {sessionUser.id === videoPlaying.user_id &&
                                <button onClick={navLink}
                                    className='editVideoBtn'
                                > Edit Video
                                </button>
                            }

                        </div>
                    </div>

                    <div className='videoDescription'>
                        <p className={showMore}> {videoPlaying?.description}</p>
                        {videoPlaying?.description.length > 250 &&
                            <>
                                {
                                    showLess ?
                                        <>
                                            < button className='read-more-button'
                                                onClick={showMoreBtn}
                                            > Show More . . . </button>
                                        </>
                                        :
                                        <>
                                            < button className='read-more-button'
                                                onClick={showMoreBtn}
                                            > Show Less . . . </button>
                                        </>
                                }
                            </>

                        }

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