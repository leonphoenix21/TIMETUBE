import React, { useEffect, useRef, useState } from 'react';
import './comments.css';
import { useSelector } from 'react-redux';

function CommentsDisplay() {

    const [active, setActive] = useState(false)
    const [content, setContent] = useState('')
    const sessionUser = useSelector(state => state.session.user)

    const updateBtnActivity = (e) => {
        if (e.target.value) {
            setActive(true)
        } else {
            setActive(false)
        }
    }

    return (
        <>
            <div className="border-Top-line"></div>
            <div className="commentsContainer">
                <div className="commentsDisplay">
                    <div className="countSort">
                        <div className="commentCount"> </div>
                        <div className="sortByComments"></div>
                    </div>
                    <div className='addCommentDiv'>
                        <img className='commentsAvtr' src={`${sessionUser.avatar}`} />
                        <div className='addCommentInputDiv'>
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
                            {active ?
                                <div className='commentInputBtns'>
                                    <button
                                        type='submit'
                                        className='submitvideobtn'>
                                        Submit
                                    </button>

                                    <button
                                        type='button'
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
                </div>
                <div className="VideoSideBar">

                </div>
            </div>
        </>
    )
}

export default CommentsDisplay;