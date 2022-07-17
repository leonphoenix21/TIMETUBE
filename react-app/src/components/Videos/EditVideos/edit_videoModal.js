import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdManageAccounts } from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import './edit_videos.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { deleteVideo, editVideo } from '../../../store/videos'
import { FaTools } from "react-icons/fa";
import { VscSettingsGear } from "react-icons/vsc";
import VideoPlayerComp from '../../VideoPlayer/video-player';
import { videoComments } from '../../../store/comments';
import DelComEditPg from './delCommentsEditPage';
import './edit_videos.css'

function EditVideoModal() {


    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
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

    Modal.ariaHideApp = false
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'row'

        },
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'black';
    }

    function closeModal() {
        setIsOpen(false);
    }

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

    return (
        <div>

            <button className='editVideoButton' onClick={openModal}>
                < MdOutlineManageAccounts />
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="EditVideo"
            >
                <form onSubmit={handleSubmit} className='editVideoForm'>
                    <div className='modalIcons'>
                        <span className='modalHeader'> < MdManageAccounts /></span>
                        <span className='closeIcon' onClick={closeModal}> <AiIcons.AiOutlineClose /></span>
                    </div>
                    <div className='edit-title-div'>
                        <h2 className='editTitleHeader'> Edit Video </h2>
                        <span className='editUploadIcon '> <FaTools /> <VscSettingsGear /> </span>
                    </div>
                    <div className='commentErr' style={{ top: '50%' }}>
                        {errors.map((error, ind) => (
                            <div key={ind} className='eachCommError'>{error}</div>
                        ))}
                    </div>

                    <div className='contDiv'>
                        <img src={`${video?.image_url}`}
                            alt='' style={{ height: '180px', width: '320px' }}
                            onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}

                        />


                        {Object.values(Allvideos).length > 0 ?
                            <>
                                <div data-vjs-player >
                                    <video className=" vjs-default-skin " width="320px" height="180px"
                                        controls preload="none" poster={previewImg ? previewImg : video?.image_url}
                                        data-setup='{"aspectRatio"16:9", "playbackRates": [1, 1.5, 2] }'>
                                        <source src={videoPlaying?.video_url} type='video/mp4' />
                                    </video>
                                </div>

                            </>
                            :
                            <>
                            </>
                        }

                    </div>
                    <div className='contDiv' >
                        <label className='approvedFileLabel'> Our approved image file types</label>
                        <label className='approvedFileLabel'> Include: pdf, png, jpg, jpeg, gif, jfif </label>
                        <label htmlFor='edit-poster' id='select-file-button'> Update Cover Photo . . .</label>
                        <input
                            className='videofield'
                            type='file'
                            id='edit-poster'
                            accept='image/*'
                            onChange={updateImage}
                            hidden
                        />
                    </div>
                    <div className='contDiv'>
                        <label> Edit Title </label>
                        <input
                            className="videofield strings"
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder={`add title here...`}
                            name="title"
                            minLength={3}
                            required
                        />
                    </div >

                    <div className='contDiv descriptionedit'>

                        <label> Edit Description </label>
                        <textarea
                            className="videotext strings"
                            value={description}
                            onChange={(e) => (
                                setDescription(e.target.value)
                            )}
                            placeholder={`add description here ...`}
                            name="description"
                            id="description"
                        />
                    </div>

                    <div className='editBtnsDiv'>
                        {showDelete ?
                            <>
                                <div className='verifyDiv'>
                                    Are you sure you to delete this video?
                                </div>
                                <div className='editBtns'>
                                    <button
                                        type='button'
                                        onClick={() => setShowDelete(false)}
                                        className='editvideobtn'>
                                        Cancel
                                    </button>
                                    <button
                                        type='button'
                                        onClick={deleteVideoSubmit}
                                        className='deletebtn'>
                                        Delete Video
                                    </button>
                                </div>
                            </>
                            :
                            <div className='editBtns'>
                                <button
                                    type='submit'
                                    className='editvideobtn'>
                                    Submit
                                </button>
                                <button
                                    type='button'
                                    onClick={() => setShowDelete(true)}
                                    className='editvideobtn'>
                                    Delete
                                </button>
                            </div>
                        }

                    </div>
                </form>

            </Modal>
        </div>
    )

}

export default EditVideoModal;