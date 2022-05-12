import './videos.css';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { ImUpload2 } from 'react-icons/im';
import { uploadVideo } from '../../../store/videos'
import { FaDeviantart } from 'react-icons/fa';


function UploadVideos() {

    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch;
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState('');
    const [video_url, setVideoUrl] = useState('');
    const [description, setDescription] = useState('');
    const [image_url, setImageUrl] = useState('');

    const [fadeIn, setFade] = useState({
        fade: 'fade',
    })

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
        const formData = new FormData();
        formData.append("user_id", sessionUser.id);
        formData.append("title", title);
        formData.append("video_url", video_url);
        formData.append("description", description);
        formData.append("image_url", image_url);

        await dispatch(uploadVideo(formData));

        // if (data) {
        //     history.push(`/`);
        // } else {
        //     if (data.errors) {
        //         setErrors(data.errors);
        //     }
        // }
    }

    // useEffect(() => {
    //     const toggleFade = setInterval(() => {
    //         setNum((prevNum) => (prevNum === 9 ? 0 : prevNum + 1));
    //     }, 10000);
    //     return () => pictureInterval;
    // }, []);

    return (
        <body className='bodyCon'>
            <div className="firstCon">
                <div className="dot"></div>
                <div className="dot1"></div>
                <div className="dot2"></div>
                <div className="dot3"></div>
                <div className="dot4"></div>
                <div className="dot5"></div>
                <div className="dot6"></div>
                <div className="dot7"></div>
                <div className="dot8"></div>
                <div className="dot9"></div>
            </div>
            <div className="secondCOn">

                <form onSubmit={handleSubmit}>
                    <div className='upload-div'>
                        <div className='left-border'> </div>
                        <div className='upload-container'>
                            <div className='upload-title'>
                                <h2> Upload Video  </h2>
                                <span className='videoUploadIcon'> <ImUpload2 /> </span>
                            </div>
                            <div className='contDiv'>
                                <label> Title </label>
                                <input
                                    className="videofield strings"
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    placeholder=" title here..."
                                    name="title"
                                    required
                                />
                            </div >
                            <div className='contDiv'>
                                <input
                                    className='videofield'
                                    type='file'
                                    id='videoFile'
                                    accept='video/*'
                                    onChange={updateVideo}
                                />
                            </div>
                            <div className='contDiv description'>
                                <label> Description </label>
                                <textarea
                                    className="videotext strings"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder=" description here ... "
                                    name="description"
                                    id="description"
                                />
                            </div>
                            <div className='contDiv' >
                                <input
                                    className='videofield'
                                    type='file'
                                    id='videoImage'
                                    accept='image/*'
                                    onChange={updateImage}
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
        </body>
    )
}

export default UploadVideos;