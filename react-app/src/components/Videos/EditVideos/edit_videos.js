import './edit_videos.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { deleteVideo, editVideo } from '../../../store/videos'
import { FaTools } from "react-icons/fa";
import { VscSettingsGear } from "react-icons/vsc";
import { BsDot } from 'react-icons/bs';
import { AiOutlineLike } from 'react-icons/ai'; //Empty Like button
import { AiOutlineDislike } from 'react-icons/ai'; //Empty DisLike button
import VideoPlayerComp from '../../VideoPlayer/video-player';
import { videoComments } from '../../../store/comments';
import DelComEditPg from './delCommentsEditPage';

function EditVideos() {

    const { videoId } = useParams()
    const video = useSelector(state => state.videos[videoId])
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(video?.title);
    const [description, setDescription] = useState(video?.description);
    const [image_url, setImageUrl] = useState(video?.image_url);
    const [showDelete, setShowDelete] = useState(false);
    const [previewImg, setPreviewImg] = useState('');
    const [commCount, setCommCount] = useState(0);
    const [showCommDelete, setShowCommDelete] = useState(false);

    const Allvideos = useSelector(state => Object.values(state.videos).filter(vid => vid.id === +videoId))
    const videoPlaying = Allvideos[0]

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImageUrl(file);
        setPreviewImg(file)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim().length === 0) return setErrors(['sorry there must be content for title'])
        if (title.length > 55) return setErrors(['Title must be less than 55 characters'])
        if (description.trim().length === 0) return setErrors(['sorry there must be content for description'])
        if (description.length > 1400) return setErrors(['Description must be less than 1000 characters'])

        const formData = new FormData();
        formData.append("id", videoId);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image_url", image_url);

        const data = await dispatch(editVideo(formData));
        if (data.errors) {
            setErrors(data.errors);
        } else {
            if (!data.errors) {
                history.push(`/home`);
            }
        }

    }
    const deleteVideoSubmit = async (e) => {
        e.preventDefault();
        setShowDelete(false)
        await dispatch(deleteVideo(+videoId));
        history.push("/home");
    };
    useEffect(() => {
        (async () => {
            await dispatch(videoComments());
        })();
    }, []);

    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.video_id === +videoId).reverse()
    )
    useEffect(() => {
        if (comments) {
            setCommCount(comments.length)
        }
    }, [comments]);


    useEffect(() => {

        let fileReader, isCancel = false;

        if (previewImg) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setPreviewImg(result)
                }
            }


            fileReader.readAsDataURL(previewImg);


        } else {
            setPreviewImg('')
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [image_url])

    const Idverify = sessionUser?.id === video?.user_id
    const GoToVideo = () => {
        history.push(`/videos/${videoId}`)
    }

    const VideoViewCount = (video) => {

        const ViewCount = video.view_count;
        if (!ViewCount || ViewCount === 0) return '1 view';

        let numStr = ViewCount.toString()

        if (ViewCount === 1) return `1 view`
        if (numStr.length === 4) {
            return `${numStr[0]}.${numStr[1]}K`
        } else if (numStr.length === 5) {
            return `${numStr[0]}${numStr[1]}.${numStr[2]}K`
        } else if (numStr.length === 6) {
            return `${numStr[0]}${numStr[1]}${numStr[2]}.${numStr[3]}K`
        } else if (numStr.length === 7) {
            return `${numStr[0]}.${numStr[1]}${numStr[2]}M`
        } else {
            return `${ViewCount} views`
        }
    }

    const TimeSession = (video) => {
        return video.created_at.slice(4, 16)
    }

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

    //? This will find the percentage liked
    const likePercent = () => {
        let likes;
        let dislikes;
        videoPlaying.likes ? likes = videoPlaying.likes.length : likes = 0;
        videoPlaying.dislikes ? dislikes = videoPlaying.dislikes.length : dislikes = 0;
        let percent = (likes / (likes + dislikes)) * 100;
        if (!percent) percent = 0;
        return `${percent.toFixed(0)}%`
    }

    return (
        <div style={{ backgroundColor: 'white' }}>
            {Idverify &&
                < div className="bodyContainer" >
                    <div className="firstVidCon" >
                        <div className='edit-container'>
                            <form onSubmit={handleSubmit} className='editVideoForm'>
                                <div className='errors' style={{ marginTop: '10px' }}>
                                    {errors.map((error, ind) => (
                                        <div key={ind} className='eachError'>{error}</div>
                                    ))}
                                </div>
                                <div className='edit-title-div'>
                                    <h2 className='editTitleHeader'>
                                        Video Details
                                        <span className='editUploadIcon '> <FaTools /> <VscSettingsGear /> </span>
                                    </h2>
                                </div>

                                <div className='contDiv'>
                                    <label> Edit Title </label>
                                    <input
                                        className="editTitleField"
                                        type="text"
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                        placeholder={video?.title ? video.title : 'add title here'}
                                        name="title"
                                        minLength={3}
                                        required
                                    />
                                </div >

                                <div className='contDiv descriptionedit'>

                                    <label> Edit Description </label>
                                    <textarea
                                        className="editDescriptionField"
                                        value={description}
                                        onChange={(e) => (
                                            setDescription(e.target.value)
                                        )}
                                        placeholder={video?.description ? video.description : 'add description here'}
                                        name="description"
                                        id="description"
                                    />
                                </div>
                                <div className='contDiv'>
                                    <h3 className='thumbnailEditHeader'> Thumbnail </h3>
                                    <div className='contDiv' >
                                        <label className='approvedFileLabel'> Our approved image file types</label>
                                        <label className='approvedFileLabel'> Include: pdf, png, jpg, jpeg, gif, jfif </label>
                                        <label htmlFor='edit-poster' id='select-img-button'> Update Cover Photo . . .</label>
                                        <input
                                            className='videofield'
                                            type='file'
                                            id='edit-poster'
                                            accept='image/*'
                                            onChange={updateImage}
                                            hidden
                                        />
                                    </div>
                                    <div className='editPreviewImages'>
                                        <div className="currThumbnail">
                                            <h2 className='thumbnailHeader'>Current Thumbnail</h2>
                                            <img src={`${video?.image_url}`}
                                                alt='' style={{ height: '180px', width: '320px' }}
                                                onError={(e) =>
                                                    e.target.src =
                                                    ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                                            />
                                        </div>
                                        {
                                            previewImg &&
                                            <div className="newThumbnail">
                                                <h2 className='thumbnailHeader'>Preview Thumbnail</h2>
                                                <img src={`${previewImg ? previewImg : video?.image_url}`}
                                                    alt='' style={{ height: '180px', width: '320px' }}
                                                    onError={(e) =>
                                                        e.target.src =
                                                        ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}

                                                />
                                            </div>
                                        }

                                    </div>
                                </div>

                                <div className='editBtnsDiv'>
                                    {showDelete ?
                                        <>
                                            <div className='verifyDiv'>
                                                Are you sure you to delete this video?
                                            </div>
                                            <div className='editBtns'>
                                                <button
                                                    className='editSubmitbtns'
                                                    type='button'
                                                    onClick={() => setShowDelete(false)}
                                                    style={{ marginRight: "10px" }}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    className='editSubmitbtns'
                                                    type='button'
                                                    onClick={deleteVideoSubmit}
                                                >
                                                    Delete Video
                                                </button>
                                            </div>
                                        </>
                                        :
                                        <div className='editBtns'>
                                            <button
                                                type='submit'
                                                className='editSubmitbtns'
                                            >
                                                Submit
                                            </button>
                                            <button
                                                type='button'
                                                onClick={() => setShowDelete(true)}
                                                style={{ marginLeft: '10px' }}
                                                className='editSubmitbtns'
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    }

                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="secondVidCon" >
                        <div className='editVideoComp'>

                            {Object.values(Allvideos).length > 0 ?
                                <>
                                    <div data-vjs-player className='videoPlayerComp'>
                                        <video className="edit-video-js vjs-default-skin " width="320px" height="180px"
                                            controls preload="none" poster={previewImg ? previewImg : video?.image_url}
                                            data-setup='{"aspectRatio"16:9", "playbackRates": [1, 1.5, 2] }'>
                                            <source src={videoPlaying?.video_url} type='video/mp4' />
                                        </video>
                                        <div className="videoDisplayTitle">
                                            <span style={{ fontSize: '12px', color: 'grey' }}>Video Link</span>
                                            <span onClick={GoToVideo} className='gotovideo'> Go to Video </span>
                                            <div className='editVideoViewCountDiv'>
                                                <span> {VideoViewCount(videoPlaying)} <BsDot /> {TimeSession(videoPlaying)}</span>
                                                <div style={{ margin: '5px' }} ></div>
                                                <span
                                                    style={{ fontSize: '18px' }}
                                                >
                                                    <  AiOutlineLike /> Likes:
                                                    <span className='likeCount' style={{ marginLeft: '3px', fontSize: '20px', fontWeight: 'bold', color: 'blue' }}> {likeCounts()}</span>
                                                </span>
                                                <span style={{ fontSize: '18px' }}>
                                                    < AiOutlineDislike /> Dislikes:
                                                    <span className='likeCount' style={{ marginLeft: '3px', fontSize: '20px', fontWeight: 'bold', color: 'blue' }}> {disLikeCounts()}</span>
                                                </span>
                                                <span className='likeCount' style={{ marginLeft: '20px', fontSize: '20px', fontWeight: 'bold', color: 'blue' }}> {likePercent()}</span>

                                            </div>
                                        </div>

                                    </div>

                                </>
                                :
                                <>
                                </>
                            }
                        </div>
                        <div className="CommentTitleandCount">
                            <h2 className='thumbnailEditHeader'> {commCount}  Comments </h2>
                        </div>
                        <div className="userViewComments">
                            <div className="border-bottomComm"> </div>
                            {comments?.map(comment => (
                                <div className="editCommentsDisplay">
                                    <div className="commentUserAvatar">
                                        <a href={`/users/${comment?.user_id}`}>
                                            <img className='eachCommentAvtr'
                                                src={`${comment?.avatar}`}
                                                onError={(e) =>
                                                    e.target.src =
                                                    ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                                            />
                                        </a>
                                    </div>
                                    <div className="commentNameContent">
                                        <div className="editCommFullname thumbnailEditHeader">
                                            {comment?.firstname}
                                            {comment?.lastname}
                                            <div className="DelComEditPg" >
                                                <span className="commentTimeSession" style={{ left: '0' }}>{TimeSession(comment)}</span>
                                                <span className="commentTimeSession"> <DelComEditPg comment={comment} /></span>

                                            </div>
                                        </div>
                                        <div className="editCommContent thumbnailHeader">
                                            <span style={{ position: 'relative' }}>
                                                {comment?.content}
                                            </span>

                                        </div>
                                    </div>
                                    <div className="border-bottomComm"> </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div >
            }
        </div>
    )
}

export default EditVideos;