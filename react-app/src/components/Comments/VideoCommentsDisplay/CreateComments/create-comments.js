import React, { useEffect, useRef, useState } from 'react';
import './comments.css';
import { useSelector, useDispatch } from 'react-redux';
import { createComments } from '../../../../store/comments';
import { useHistory } from 'react-router-dom'
import { AiFillCloseCircle } from "react-icons/ai";
import CommentsDisplay from '../CommentsDisplay/commentsDisplay';



function CreateComments({ Id }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [active, setActive] = useState(false)
    const [content, setContent] = useState('')
    const sessionUser = useSelector(state => state.session.user)
    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.video_id === +Id))

    console.log('COMEMEMNTMD', comments)

    const updateBtnActivity = (e) => {
        if (e.target.value) {
            setActive(true)
        } else {
            setActive(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("user_id", sessionUser.id);
        formData.append("firstname", sessionUser.firstname);
        formData.append("lastname", sessionUser.lastname);
        formData.append("user_id", sessionUser.lastname);
        formData.append("avatar", sessionUser.avatar);
        formData.append("content", content);
        formData.append("video_id", Id);

        const data = await dispatch(createComments(formData));

        if (data) {
            history.push(`/videos/${Id}`)
            setContent('')
        } else {
            if (data.errors) {
                setErrors(data.errors)
            }
        }

    }

    return (
        <>
            <div className="commentsContainer">
                <div className="commentsDisplay">
                    <form onSubmit={handleSubmit}>
                        <div className='addCommentDiv'>
                            <img className='commentsAvtr' src={`${sessionUser?.avatar}`} />
                            <div className='addCommentInputDiv'>
                                <div className='addCommentInputDivField'>
                                    <input
                                        className='addCommentInputField'
                                        onChange={(e) => (
                                            updateBtnActivity(e),
                                            setContent(e.target.value)
                                        )}
                                        value={content}
                                        type="text"
                                        placeholder='Add a comment here '
                                        name='commentInput'
                                        required
                                    />
                                    {active ? <span className='cancelIcon'
                                        onClick={() => setContent('')}>< AiFillCloseCircle /></span> : <> </>}
                                </div>
                                {active ?
                                    <div className='commentInputBtns'>
                                        <button
                                            type='submit'
                                            className='submitvideobtn'>
                                            Submit
                                        </button>

                                        <button
                                            type='button'
                                            onClick={(e) => (
                                                setActive(false),
                                                setContent('')
                                            )}
                                            className='submitvideobtn'>
                                            Cancel
                                        </button>
                                    </div>
                                    :
                                    <>
                                    </>
                                }

                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </>
    )
}

export default CreateComments;