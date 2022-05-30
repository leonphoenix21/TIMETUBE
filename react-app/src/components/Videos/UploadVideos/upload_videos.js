import './videos.css';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { ImUpload2 } from 'react-icons/im';
import { BsFillCloudArrowUpFill } from 'react-icons/bs';
import { BsArrowUpShort } from 'react-icons/bs';
import { uploadVideo } from '../../../store/videos'
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import { useParams } from 'react-router-dom';

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
    const [newVid, setNewVid] = useState(false);


    const updateVideo = (e) => {

        // setPreviewVid('')
        const file = e.target.files[0];
        setVideoUrl(file);

        if (video_url) {
            setVidActive(true)

        }
        // setPreviewVid(URL.createObjectURL(file));

    };



    const updateImage = (e) => {

        const file = e.target.files[0];
        setImageUrl(file);

        setPreviewImg(URL.createObjectURL(file));

    };

    useEffect(() => {
        if (video_url) {
            setVidActive(true)
        }
        let fileReader, isCancel = false;

        if (video_url) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setPreviewVid(result)
                }
            }
            fileReader.readAsDataURL(video_url);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }

    }, [video_url]);


    // const onChangeVid = (e) => {
    //     if (e.target.files[0]) {
    //         const file = e.target.files[0];
    //         if (previewVid !== null) {
    //             setPreviewVid(null)
    //             const readFile = URL.createObjectURL(file)
    //             setPreviewVid(readFile);
    //         } else {
    //             const readFile = URL.createObjectURL(file)
    //             setPreviewVid(readFile);
    //         }
    //     }
    // };



    // useEffect(() => {
    //     // create the preview

    //     const videoUrl = URL.createObjectURL(video_url)
    //     setPreviewVid(videoUrl)

    //     const imageUrl = URL.createObjectURL(image_url)
    //     setPreviewImg(imageUrl)

    //     // free memory when ever this component is unmounted
    //     // return () => URL.revokeObjectURL(objectUrl)
    // }, [image_url, video_url])


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

        // setErrors([''])
        setVideoLoading(true)
        const data = await dispatch(uploadVideo(formData));
        if (data.errors) {
            setVideoLoading(false)
            setErrors(data.errors);
        } else {
            if (!data.errors) {
                setVideoLoading(false)
                history.push(`/home`);
            }
        }
    }






    return (
        <div className='uploadbodyCon'>
            <div className='upload-container'>
                <form onSubmit={handleSubmit} className='upload-form'>
                    <div className='upload-title'>
                        {
                            loading ?
                                <div className="uploadTitle">  <h2 className="loadingTitle"> uploading ... </h2></div>
                                :
                                <div className="uploadTitle"><h2 > Upload Video  </h2></div>

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
                        <label className='approvedFileLabel'> Our approved video file types</label>
                        <label className='approvedFileLabel'> Include: mpeg, mp4, mpg, .mov</label>
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
                    <label className='approvedFileLabel'> Our approved image file types</label>
                    <label className='approvedFileLabel'> Include: pdf, png, jpg, jpeg, gif, jfif </label>

                    {
                        vidActive ?
                            <label htmlFor='img-upload' id='select-video-button'> Choose Poster Image . . .</label>
                            :

                            <>
                                <label className='approvedFileLabel posterErr' style={{ backgroundColor: 'black', padding: '3px', color: 'yellow' }}> choose a video file </label>
                                <label id='fake-video-button' > Choose Poster Image . . .</label>
                            </>

                    }

                    <div className='contDiv' >
                        <input
                            className='videofield'
                            type='file'
                            id='img-upload'
                            accept='image/*'
                            onChange={(e) => (updateImage(e), onChangeImg(e))}
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
                </form>
            </div>

            <div className="videoDisplayTitle"> <h2> Preview </h2> </div>
            <div className='previewVideoComp'>
                <>
                    {previewVid || previewImg ?
                        <>
                            <div data-vjs-player className='videoPlayerComp'>
                                <video className="edit-video-js vjs-default-skin " width="640px" height="267px"
                                    controls preload="none" poster={previewImg}
                                    data-setup='{ "aspectRatio"16:9", "playbackRates": [1, 1.5, 2] }'>
                                    <source src={previewVid} type='video/mp4' />
                                </video>
                            </div>

                        </>
                        :
                        <>
                        </>
                    }



                </>
            </div>

            <div className="boxFooter">
                <img src='https://d3c9ouasuy8pg6.cloudfront.net/dist/images/signup-bg-light_baa27c5957a33417853bf54b523adf5a.png'
                    alt='' className='boxFooterImg' />
            </div>

        </div>
    )
}

export default UploadVideos;