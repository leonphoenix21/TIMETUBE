import './delete-videos.css';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { GiTrashCan } from "react-icons/gi";
import { deleteVideo, editVideo } from '../../../store/videos'




function DeleteVideos() {


    const { videoId } = useParams()
    const history = useHistory();
    const dispatch = useDispatch();

    let subtitle;
    const [errors, setErrors] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);


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
    const deleteVideoSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(deleteVideo(+videoId));
        if (res) {
            history.push("/home");
        }
    };

    return (
        <>
            <div className="deleteContainer">
                <div>
                    <button
                        type='button'
                        onClick={openModal}
                        className='editvideobtn'>
                        Delete
                    </button>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="DeleteVideo"
                >
                    <form onSubmit={deleteVideoSubmit} >
                        <div className="mainContainer">
                            <div>
                                <span> Are you sure you want to delete this Video? </span>
                            </div>

                            <div className="deleteBtns">
                                <div className='commentInputBtns'>
                                    <button
                                        type='submit'
                                        className='submitvideobtn'>
                                        Submit
                                    </button>
                                    <button
                                        type='button'
                                        onClick={closeModal}
                                        className='submitvideobtn'>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>

                </Modal>

            </div>
        </>
    )
}

export default DeleteVideos;
