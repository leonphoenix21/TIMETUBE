import './videos.css';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { ImUpload2 } from 'react-icons/im';
import { BsFillCloudArrowUpFill } from 'react-icons/bs';
import { BsArrowUpShort } from 'react-icons/bs';

import { uploadVideo } from '../../../store/videos'


function UploadVideos() {

    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setVideoLoading] = useState(false);
    const [video_url, setVideoUrl] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImageUrl] = useState('');

    const updateVideo = (e) => {
        const file = e.target.files[0];
        setVideoUrl(file);
    };
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImageUrl(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!video_url) return setErrors(['Choose a video File to proceed']);
        if (!image_url) return setErrors(['Choose a poster image file to proceed'])
        const formData = new FormData();
        formData.append("user_id", sessionUser.id);
        formData.append("title", title);
        formData.append("video_url", video_url);
        formData.append("description", description);
        formData.append("image_url", image_url);

        setErrors([''])
        setVideoLoading(true)
        const data = await dispatch(uploadVideo(formData));
        if (data) {
            setVideoLoading(false)
            history.push(`/home`);
        } else {
            if (data.errors) {
                setVideoLoading(false)
                setErrors(data.errors);
            }
        }
    }



    return (
        <div className='bodyCon'>
            <div className='Con'>
                <div className="firstCon">
                    <div className="fade dot"></div>
                    <div className="fade dot1"></div>
                    <div className="fade dot2"></div>
                    <div className="fade dot3"></div>
                    <div className="fade dot4"></div>
                    <div className="fade dot5"></div>
                    <div className="fade dot6"></div>
                    <div className="fade dot7"></div>
                    <div className="fade dot8"></div>
                    <div className="fade dot9"></div>
                </div>
            </div>
            <div className="secondCOn">
                <form onSubmit={handleSubmit}>
                    <div className='upload-div'>
                        <div className='left-border'> </div>
                        <div className='upload-container'>
                            <div className='upload-title'>
                                {
                                    loading ?
                                        <h2 className="loadingTitle"> uploading ... </h2>
                                        :
                                        <h2 style={{ width: '100%' }}> Upload Video  </h2>
                                }
                                {
                                    loading &&
                                    <div className="loadingIcons">
                                        <span className='videoUploadCloud'> <BsFillCloudArrowUpFill /> </span>
                                        <span className='videoUploadArrow'> <BsArrowUpShort /> </span>
                                    </div>
                                }


                            </div>
                            <div className='videoErr'>
                                {errors.map((error, ind) => (
                                    <div key={ind} className='eachVidError'>{error}</div>
                                ))}
                            </div>
                            <div className='contDiv'>
                                <label> Title </label>
                                <input
                                    className="videofield strings"
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    placeholder=" title here..."
                                    minLength={5}
                                    name="title"
                                    required
                                />
                            </div >
                            <div className='contDiv'>
                                <label htmlFor='vid-upload' id='select-file-button'> Choose Video File . . .</label>
                                <input
                                    className='videofield'
                                    type='file'
                                    id='vid-upload'
                                    name='img-upload'
                                    accept='video/*'
                                    onChange={updateVideo}
                                    hidden
                                />
                            </div>
                            <div className='contDiv description'>
                                <label> Description </label>
                                <textarea
                                    className="videotext strings"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder=" description here ... "
                                    minLength={5}
                                    name="description"
                                    id="description"
                                    required
                                />
                            </div>
                            <label htmlFor='img-upload' id='select-file-button'> Choose Poster Image . . .</label>
                            <div className='contDiv' >
                                <input
                                    className='videofield'
                                    type='file'
                                    id='img-upload'
                                    accept='image/*'
                                    onChange={updateImage}
                                    hidden
                                />
                            </div>
                            <div className='contDiv'>
                                <button
                                    type='submit'
                                    className='submitvideobtn'>
                                    Submit
                                </button>
                            </div>

                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default UploadVideos;