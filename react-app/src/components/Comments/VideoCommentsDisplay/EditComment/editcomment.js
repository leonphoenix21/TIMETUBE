import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { MdEditNote } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'

import './editcomment.css';
import { editComment } from '../../../../store/comments';


function EditComment({ commentId }) {



    const history = useHistory();
    const dispatch = useDispatch();

    let subtitle;
    const [errors, setErrors] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const comment = useSelector(state => Object.values(state.comments).filter(comment => comment.id === +commentId))
    console.log('HHDHHDHDHDH', comment[0].content)
    const [content, setContent] = useState(comment[0]?.content)


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
        formData.append("content", content);

        const data = await dispatch(editComment(formData))
        if (data) {
            closeModal()
        } else {
            if (data.errors) {
                setErrors(data.errors)
            }
        }
    }

    return (
        <>
            <div className='editCommentModal'>
                <div>
                    <span className="navlinks homeIcon" onClick={openModal}> < MdEditNote /></span>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="EditComment"
                >
                    <form onSubmit={handleSubmit} >
                        <div className="firstCont">
                            <input
                                className='editCommmentInputField'
                                onChange={(e) => (
                                    setContent(e.target.value)
                                )}
                                value={content}
                                type="text"
                                placeholder='Edit comment here... '
                                name='commentInput'
                                required
                            />
                        </div>
                        <div className='commentInputBtns'>
                            <button
                                type='submit'
                                className='submitvideobtn'>
                                Submit
                            </button>
                            <button
                                type='button'
                                onClick={(e) => (
                                    setContent(''),
                                    closeModal()
                                )}
                                className='submitvideobtn'>
                                Cancel
                            </button>
                        </div>
                    </form>

                </Modal>
            </div>

        </>
    )
}


export default EditComment;