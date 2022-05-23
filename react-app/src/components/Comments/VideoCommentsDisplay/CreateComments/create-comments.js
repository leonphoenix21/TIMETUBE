import React, { useEffect, useRef, useState } from 'react';
import './comments.css';
import { useSelector, useDispatch } from 'react-redux';
import { createComments } from '../../../../store/comments';
import { useHistory } from 'react-router-dom'
import { AiFillCloseCircle } from "react-icons/ai";



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
        if (e.target.value.length === 250) {
            setActive(false)
            return (setErrors(['character length can not exceed 250']))
        }
        else {
            setActive(true)
            return (setErrors([]))
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (content.trim().length === 0) return setErrors(['sorry there must be content'])

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
            setActive(false)
            history.push(`/videos/${Id}`)
            setContent('')
        } else {
            if (data.errors) {
                setErrors(data.errors)
            }
        }

    }
    // const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.video_id === +videoId))


    return (
        <>


            <div className="commentsContainer">
                <div className="commentsDisplay">
                    <form onSubmit={handleSubmit}>
                        <div className='addCommentDiv'>
                            <img className='commentsAvtr' src={`${sessionUser?.avatar}`} />
                            <div className='addCommentInputDiv'>
                                <div className='commentErr'>
                                    {errors.map((error, ind) => (
                                        <div key={ind} className='eachCommError'>{error}</div>
                                    ))}
                                </div>
                                <div className='addCommentInputDivField'>
                                    <input
                                        className='addCommentInputField'
                                        onChange={(e) => (
                                            updateBtnActivity(e),
                                            setContent(e.target.value)
                                        )}
                                        value={content}
                                        type="text"
                                        maxLength={250}
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
                                            className='submitCommentbtn'>
                                            Submit
                                        </button>

                                        <button
                                            type='button'
                                            onClick={(e) => (
                                                setActive(false),
                                                setContent(''),
                                                setErrors([])
                                            )}
                                            className='submitCommentbtn'>
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