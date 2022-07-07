import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsGearWideConnected } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai'; //Empty Like button
import { AiFillLike } from 'react-icons/ai'; //Fill Like button
import { AiOutlineDislike } from 'react-icons/ai'; //Empty DisLike button
import { AiFillDislike } from 'react-icons/ai'; //Fill DisLike button

import { disLikeVideo, likeVideo, unDisLikeVideo, unlikeVideo } from '../../../../store/videos';
// import { AiTwotoneLike } from 'react-icons/ai';
// import { BiLike } from 'react-icons/bi';
import './desc-vid.css'
import { newUserSubcriber } from '../../../../store/details';

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


    //? Handle submit for new subscribers 
    const handle_NewSubscriber = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("user_id", sessionUser.id);
        const newSub = await dispatch(newUserSubcriber(formData));
    };


    //? Handle submits for the like button
    const handle_LikeButtonClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("user_id", sessionUser.id);
        formData.append("video_id", videoId);
        if (videoPlaying?.dislikes.includes(sessionUser.id)) {
            const undislikedVideo = await dispatch(unDisLikeVideo(formData));
        }
        const likedVideo = await dispatch(likeVideo(formData));
    };
    const handle_UnLikeButtonClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("user_id", sessionUser.id);
        formData.append("video_id", videoId);
        // if (videoPlaying?.likes.includes(sessionUser.id)) {
        //     const undislikedVideo = await dispatch(unDisLikeVideo(formData));
        // }
        const unlikedVideo = await dispatch(unlikeVideo(formData));

    };


    //?Handle Submits for the dislike button
    const handle_DisLikeButtonClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("user_id", sessionUser.id);
        formData.append("video_id", videoId);
        if (videoPlaying?.likes.includes(sessionUser.id)) {
            const unlikedVideo = await dispatch(unlikeVideo(formData));
        }
        const dislikedVideo = await dispatch(disLikeVideo(formData));
    };

    const handle_UnDisLikeButtonClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("user_id", sessionUser.id);
        formData.append("video_id", videoId);
        const undislikedVideo = await dispatch(unDisLikeVideo(formData));

    };


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

    //? This will count the likes
    const likeCounts = () => {
        let num = videoPlaying.likes.length;
        let numStr = num.toString()

        if (numStr.length === 4) {
            return `${numStr[0]}.${numStr[1]}K`
        } else if (numStr.length === 5) {
            return `${numStr[0]}${numStr[1]}.${numStr[2]}K`
        } else if (numStr.length === 6) {
            return `${numStr[0]}${numStr[1]}${numStr[2]}.${numStr[3]}K`
        } else if (numStr.length === 7) {
            return `${numStr[0]}.${numStr[1]}${numStr[2]}M`
        }
        else {
            return videoPlaying.likes.length
        }
    }

    //? This will count the dislikes
    const disLikeCounts = () => {
        let num = videoPlaying.dislikes.length;
        let numStr = num.toString()

        if (numStr.length === 4) {
            return `${numStr[0]}.${numStr[1]}K`
        } else if (numStr.length === 5) {
            return `${numStr[0]}${numStr[1]}.${numStr[2]}K`
        } else if (numStr.length === 6) {
            return `${numStr[0]}${numStr[1]}${numStr[2]}.${numStr[3]}K`
        } else if (numStr.length === 7) {
            return `${numStr[0]}.${numStr[1]}${numStr[2]}M`
        }
        else {
            return videoPlaying.dislikes.length
        }
    }


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
                                    <span
                                        onClick={handle_UnLikeButtonClick}
                                    >
                                        < AiFillLike />
                                        <span className='likeCount'> {likeCounts()}</span>
                                    </span>

                                    :
                                    <>
                                        <span
                                            onClick={handle_LikeButtonClick}
                                        >
                                            < AiOutlineLike />
                                            <span className='likeCount'>  {likeCounts()}</span>

                                        </span>
                                    </>
                            }

                            {
                                videoPlaying?.dislikes.includes(sessionUser.id) ?
                                    <span onClick={handle_UnDisLikeButtonClick}>
                                        < AiFillDislike />
                                        <span className='likeCount'>{disLikeCounts()}</span>

                                    </span>

                                    :

                                    <span onClick={handle_DisLikeButtonClick}>
                                        < AiOutlineDislike />
                                        <span className='likeCount'> {disLikeCounts()}</span>

                                    </span>

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
                            {/* {sessionUser.id === videoPlaying.user_id &&
                                <button onClick={handle_NewSubscriber}
                                    className='singlePageEditbtn'
                                > Subscribe
                                </button>
                            } */}
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