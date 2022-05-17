import './deletecomments.css';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { GiTrashCan } from "react-icons/gi";
import { removeComment } from '../../../../store/comments';



function DeleteComments({ commentId }) {


    const { videoId } = useParams()
    console.log(videoId, "lkLKLKLKLKLKLjjjj", useParams())
    const history = useHistory();
    const dispatch = useDispatch();

    let subtitle;
    const [errors, setErrors] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const comment = useSelector(state => Object.values(state.comments).filter(comment => comment.id === +commentId))


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


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", commentId);

        const data = await dispatch(removeComment(formData))
        if (data) {
            closeModal()
        } else {
            if (data.errors) {
                setErrors(data.errors)
            }
        }
        history.push(`/video/${videoId}`)

    }
    return (
        <>
            <div className="deleteContainer">
                <div>
                    <span className="navlinks homeIcon" onClick={openModal}> <GiTrashCan /></span>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="EditComment"
                >
                    <form onSubmit={handleSubmit} >
                        <div className="mainContainer">
                            <div>
                                <span> Are you sure you want to delete this comment? </span>
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
                                        onClick={(e) => (
                                            closeModal()
                                        )}
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

export default DeleteComments;