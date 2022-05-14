import './edit_videos.css';
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { ImUpload2 } from 'react-icons/im';
import { deleteVideo, editVideo } from '../../../store/videos'
import { FaTools } from "react-icons/fa";
import { VscSettingsGear } from "react-icons/vsc";


function EditVideos() {


    const { videoId } = useParams()
    const video = useSelector(state => state.videos[videoId])
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [num, setNum] = useState(0);
    const [title, setTitle] = useState('');
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
        <div className='bodyCon'>
            <div className="secondCOn">
                <form onSubmit={handleSubmit}>
                    <div className='upload-div'>
                        <div className='left-border'> </div>
                        <div className='upload-container'>
                            <div className='upload-title'>
                                <h2> Edit Video  </h2>
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
                                <img src={`${video?.image_url}`} alt='' style={{ height: '150px', width: '250px' }} />
                            </div>
                            <div className='contDiv' >
                                <label > update cover ... </label>
                                <input
                                    className='videofield'
                                    type='file'
                                    id='videoImage'
                                    accept='image/*'
                                    onChange={updateImage}
                                />
                            </div>
                            <div className='contDiv'>
                                <input
                                    className="videofield strings"
                                    type="text"
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                    placeholder={` edit title here... current --> ${video?.title}`}
                                    name="title"
                                    required
                                />
                            </div >

                            <div className='contDiv descriptionedit'>
                                <textarea
                                    className="videotext strings"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder={`edit description ...          current --> ${video?.description}`}
                                    name="description"
                                    id="description"
                                />
                            </div>

                            <div className='contDiv'>
                                <button
                                    type='submit'
                                    className='submitvideobtn'>
                                    Submit
                                </button>

                                <button
                                    type='button'
                                    onClick={deleteVideoSubmit}
                                    className='submitvideobtn'>
                                    Delete
                                </button>

                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditVideos;