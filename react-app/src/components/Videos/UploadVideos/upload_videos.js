import React, { useEffect, useRef } from 'react';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { BsFillCloudArrowUpFill } from 'react-icons/bs';
import { BsArrowUpShort } from 'react-icons/bs';
import { VscLoading } from 'react-icons/vsc';
import { uploadVideo } from '../../../store/videos'
import './upload_videos.css';

// import videojs from 'video.js';
// import { useParams } from 'react-router-dom';

function UploadVideos() {

    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setVideoLoading] = useState(false);
    const [video_url, setVideoUrl] = useState('');
    const [previewVid, setPreviewVid] = useState('');
    const [previewImg, setPreviewImg] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImageUrl] = useState('');
    const [vidActive, setVidActive] = useState(false);
    const [previewVidLoading, setPreviewVidLoading] = useState(false);


    const updateVideo = (e) => {

        if (previewVid) {
            setPreviewVid(null)
            setPreviewImg(null)
        }
        const file = e.target.files[0];
        setVideoUrl(file);
        setPreviewVidLoading(true)

        if (video_url) {
            setVidActive(true)
        }

    };



    const updateImage = (e) => {
        const file = e.target.files[0];
        setImageUrl(file);

    };

    useEffect(() => {

        if (video_url) {
        }
        let fileReader, isCancel = false;

        if (video_url) {
            setVidActive(true)
            setPreviewVidLoading(true)
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setPreviewVid(result)
                }
            }
            fileReader.readAsDataURL(video_url);

        } else {
            setPreviewVid('')
            setPreviewVidLoading(false)
        }
        if (previewVid) {
            setPreviewVidLoading(false)
        }


        if (image_url) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setPreviewImg(result)
                }
            }
            fileReader.readAsDataURL(image_url);
        } else {
            setPreviewImg('')
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [video_url, previewVid]);


    const onChangeImg = (e) => {

        if (e.target.files[0]) {

            const file = e.target.files[0];
            if (previewImg !== null) {
                setPreviewImg(null)
                const readFile = URL.createObjectURL(file)
                setPreviewImg(readFile);
            } else {
                const readFile = URL.createObjectURL(file)
                setPreviewImg(readFile);
            }
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        if (title.trim().length === 0) return setErrors(['add title'])
        if (title.length > 55) return setErrors(['Title must be less than 55 characters'])
        if (description.trim().length === 0) return setErrors(['add description'])
        if (description.length > 1400) return setErrors(['Description must be less than 1000 characters'])
        if (!video_url) return setErrors(['Choose a video File to proceed']);
        if (!image_url) return setErrors(['Choose a poster image file to proceed'])


        const formData = new FormData();
        formData.append("user_id", sessionUser.id);
        formData.append("title", title);
        formData.append("video_url", video_url);
        formData.append("description", description);
        formData.append("image_url", image_url);

        setErrors([])
        setVideoLoading(true)
        const data = await dispatch(uploadVideo(formData));


        if (data.errors) {
            setVideoLoading(false)
            setErrors(data.errors);
        } else if (data) {
            if (!data.errors) {
                setVideoLoading(false)
                history.push(`/home`);
            }
        }
    }
    const Homepage = () => {
        return history.push('/home')
    }


    return (
        <div className='uploadbodyCon'>
            <form onSubmit={handleSubmit} className='upload-form'>
                <div className='upload-title'>
                    {
                        loading ?
                            <>
                                <div className="coolcolortube">
                                    <h2 className="uppg" onClick={Homepage}>
                                        <span style={{ fontSize: '24px', marginRight: '-12px' }}> Upload to </span>
                                        <span style={{ color: 'blue' }}>t</span>
                                        <span style={{ color: 'rgb(255, 3, 238)', marginLeft: '1px' }}>i</span>
                                        <span style={{ color: 'green', marginLeft: '1px' }}>m</span>
                                        <span style={{ color: 'black', marginLeft: '1px' }}>e</span>
                                        <span style={{ color: 'red', marginLeft: '1px' }}>t</span>
                                        <span style={{ color: 'orange', marginLeft: '1px' }}>u</span>
                                        <span style={{ color: 'rgb(10, 189, 254)', marginLeft: '1px' }}>b</span>
                                        <span style={{ color: 'orange', marginLeft: '1px' }}>e</span>
                                    </h2>
                                </div>
                                <div className="uploadTitle">
                                    <h2 className="loadingTitle"> uploading ... </h2>
                                </div>
                            </>
                            :
                            <div className="coolcolortube">
                                <h2 className="uppg" onClick={Homepage}>
                                    <span style={{ fontSize: '22px', marginRight: '-12px' }}> Upload to </span>
                                    <span style={{ color: 'blue' }}>t</span>
                                    <span style={{ color: 'rgb(255, 3, 238)', marginLeft: '1px' }}>i</span>
                                    <span style={{ color: 'green', marginLeft: '1px' }}>m</span>
                                    <span style={{ color: 'black', marginLeft: '1px' }}>e</span>
                                    <span style={{ color: 'red', marginLeft: '1px' }}>t</span>
                                    <span style={{ color: 'orange', marginLeft: '1px' }}>u</span>
                                    <span style={{ color: 'rgb(10, 189, 254)', marginLeft: '1px' }}>b</span>
                                    <span style={{ color: 'orange', marginLeft: '1px' }}>e</span>
                                </h2>
                            </div>

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
                        <div key={ind} className='eachVidError'> {error} </div>
                    ))}
                </div>
                <div className="splitintwo">
                    <div className="uploadPreviews">
                        <div className='previewVideoComp'>
                            <>
                                {previewVid ?
                                    <>
                                        <div data-vjs-player className='previewVideo' >
                                            <video className="vjs-default-skin " width="320px" height="180px"
                                                controls preload="none"
                                                data-setup='{ "aspectRatio"16:9", "playbackRates": [1, 1.5, 2] }'>
                                                <source src={previewVid ? previewVid : ''} type='video/mp4' />
                                            </video>
                                        </div>
                                        <label htmlFor='vid-upload' id='select-video-button'> Choose Video File . . .</label>

                                    </>
                                    :
                                    <>
                                        <div className='contDiv'>
                                            <label htmlFor='vid-upload' id='select-video-button'> Choose Video File . . .</label>
                                            <input
                                                className='videofield'
                                                type='file'
                                                id='vid-upload'
                                                name='img-upload'
                                                accept='video/*'
                                                // onClick={onChangeVid}
                                                onChange={updateVideo}
                                                hidden
                                            />
                                        </div>
                                    </>
                                }
                            </>
                        </div>
                        <div className='uploadImgComp'>
                            <input
                                type='file'
                                id='img-upload'
                                accept='image/*'
                                onChange={(e) => (updateImage(e), onChangeImg(e))}
                                hidden
                            />
                            <>
                                {previewImg ?
                                    <>
                                        <img className='imgUploadBackground'
                                            src={`${previewImg ? previewImg : null}`}
                                            alt=''
                                            height={180}
                                            width={320}
                                        />

                                        <label htmlFor='img-upload' id='vidImgUploadField'> Choose Poster Image . . .</label>

                                    </>
                                    :
                                    <>
                                        <label htmlFor='img-upload' id='vidImgUploadField'> Choose Poster Image . . .</label>


                                    </>
                                }
                            </>

                        </div>
                    </div>
                    <div className="uploadTitleDescDiv">

                        <div className='contDiv'>
                            <label style={{ marginTop: '20px' }}> Title </label>
                            <input
                                className="vidTitleField "
                                type="text"
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                placeholder="Title(required) "
                                minLength={5}
                                name="title"
                                required
                            />
                        </div >

                        <div className='contDiv description'>
                            <label style={{ marginTop: '20px' }}> Description </label>
                            <textarea
                                className="vidDescriptionField"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder=" Description (not required) "
                                minLength={5}
                                name="description"
                                id="description"
                                required
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

            </form >
        </div >
    )
}

export default UploadVideos;