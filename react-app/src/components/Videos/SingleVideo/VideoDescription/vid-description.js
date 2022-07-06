import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsGearWideConnected } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai'; //Empty Like button
import { AiFillLike } from 'react-icons/ai'; //Fill Like button
import { AiOutlineDislike } from 'react-icons/ai'; //Empty DisLike button
import { AiFillDislike } from 'react-icons/ai'; //Fill DisLike button

import { disLikeVideo, getAllVideos, likeVideo, unDisLikeVideo, unlikeVideo } from '../../../../store/videos';
// import { AiTwotoneLike } from 'react-icons/ai';
// import { BiLike } from 'react-icons/bi';
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


    //? Handle submits for the like button
    const handle_LikeButtonClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("user_id", sessionUser.id);
        formData.append("video_id", videoId);
        const likedVideo = await dispatch(likeVideo(formData));
    };
    const handle_UnLikeButtonClick = async (e) => {
        console.log('UNLIKE HANDLE ')
        e.preventDefault();
        const formData = new FormData();

        formData.append("user_id", sessionUser.id);
        formData.append("video_id", videoId);
        const unlikedVideo = await dispatch(disLikeVideo(formData));
        console.log('UNLIKE HANDLE ', unlikedVideo)

    };


    //?Handle Submits for the dislike button
    const handle_DisLikeButtonClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("user_id", sessionUser.id);
        formData.append("video_id", videoId);
        const likedVideo = await dispatch(unDisLikeVideo(formData));
    };
    const handle_UnDisLikeButtonClick = async (e) => {
        console.log('UNLIKE HANDLE ')
        e.preventDefault();
        const formData = new FormData();

        formData.append("user_id", sessionUser.id);
        formData.append("video_id", videoId);
        const unlikedVideo = await dispatch(unlikeVideo(formData));
        console.log('UNLIKE HANDLE ', unlikedVideo)

    };


    console.log(videoPlaying, 'TTHHHTTGGHT')
    //Querrying for users and finding the user who uploaded this video
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            // const video_likes = await fetch('/api/likes/')
            const responseData = await response.json();
            // const videoresponse = await video_likes.json()
            setUsers(responseData.users);
            // setLikes(videoresponse);
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


    return (
        <>
            {/* making sure the video has loaded into 
           state before loading the page to make sure the items display on reload */}

            {Object.values(Allvideos).length > 0 ?
                <>
                    <div className='descriptionTitle'>
                        <strong className='displayname' style={{ textTransform: 'uppercase' }}> {videoPlaying?.title}</strong>
                        <div className="likeIconsDiv">
                            {
                                videoPlaying?.likes.includes(sessionUser.id) ?
                                    <div
                                        onClick={handle_UnLikeButtonClick}
                                        className="song_tile_cover_is_liked"
                                    >
                                        < AiFillLike />
                                    </div>

                                    :
                                    <>
                                        <div
                                            onClick={handle_LikeButtonClick}
                                            className="song_tile_cover_is_liked"
                                        >
                                            < AiOutlineLike />
                                        </div>
                                    </>
                            }
                            {
                                videoPlaying?.dislikes.includes(sessionUser.id) ?
                                    <div
                                        onClick={handle_UnDisLikeButtonClick}
                                        className="song_tile_cover_is_liked"
                                    >
                                        < AiFillDislike />
                                    </div>

                                    :
                                    <>
                                        <div
                                            onClick={handle_DisLikeButtonClick}
                                            className="song_tile_cover_is_liked"
                                        >
                                            < AiOutlineDislike />
                                        </div>
                                    </>
                            }



                        </div>
                    </div>
                    <div className='bottom-line singleline'></div>

                    <div className='VideoInfo'>
                        <div>
                            <img className='avatar singleview'
                                src={`${user?.avatar}`}
                                onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                            />
                        </div>
                        <div className='fullname single'>
                            <strong > {user?.firstname} {user?.lastname} </strong>
                            {sessionUser.id === videoPlaying.user_id &&
                                <button onClick={navLink}
                                    className='singlePageEditbtn'
                                > Edit Video <BsGearWideConnected />
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