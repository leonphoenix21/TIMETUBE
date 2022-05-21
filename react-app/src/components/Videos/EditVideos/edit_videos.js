import './edit_videos.css';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { FcCancel } from 'react-icons/fc';
import { deleteVideo, editVideo } from '../../../store/videos'
import { FaTools } from "react-icons/fa";
import { VscSettingsGear } from "react-icons/vsc";
import Modal from 'react-modal';
import VideoPlayerComp from '../../VideoPlayer/video-player';
import DeleteVideos from '../DeleteVideos/delete-video';


function EditVideos() {

    const { videoId } = useParams()
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const video = useSelector(state => state.videos[videoId])
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(video?.title);
    const [description, setDescription] = useState(video?.description);
    const [image_url, setImageUrl] = useState(video?.image_url);
    let subtitle;

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
    function closeModal() {
        setIsOpen(false);
    }
    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        return () => { subtitle.style.color = '#0000'; }
    }


    const updateImage = (e) => {
        const file = e.target.files[0];
        setImageUrl(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id", videoId);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image_url", image_url);

        const data = await dispatch(editVideo(formData));
        if (data) {
            history.push(`/home`);
        } else {
            if (data.errors) {
                setErrors(data.errors);
            }
        }
    }
    const deleteVideoSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(deleteVideo(+videoId));
        if (res) {
            history.push("/home");
        }
    };


    return (
        <div className="bodyContainer">

            <div className="editBodyCon">
                <div className='edit-container'>
                    <form onSubmit={handleSubmit} className='editVideoForm'>
                        <div className='edit-title-div'>
                            <h2 className='editTitleHeader'> Edit Video </h2>
                            <span className='editUploadIcon '> <FaTools /> <VscSettingsGear /> </span>
                        </div>
                        <div>
                            {errors.map((error, ind) => (
                                <div className="error_message" key={ind}>
                                    {error}
                                </div>
                            ))}
                        </div>

                        <div className='contDiv'>
                            <img src={`${video?.image_url}`} alt='' style={{ height: '120px', width: '250px' }} />
                        </div>
                        <div className='contDiv' >
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
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={`add description here ...`}
                                minLength={10}
                                name="description"
                                id="description"
                            />
                        </div>

                        <div className='editBtns'>
                            <button
                                type='submit'
                                className='editvideobtn'>
                                Submit
                            </button>
                            <DeleteVideos />
                        </div>
                    </form>
                    <div >
                        {/* {errors.length > 1 && <span className='redX' ><FcCancel /></span>} */}
                    </div>
                </div>
                {/* <div className='editVideoComp'>
                    <span className='VideoCompSpan'> <VideoPlayerComp videoId={videoId} /> </span>
                </div> */}

            </div>
        </div>

    )
}

export default EditVideos;