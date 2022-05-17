import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { videoComments } from '../../../../store/comments';
import './comdisplay.css'

function CommentsDisplay({ boxId }) {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(videoComments());
        })();
    }, [dispatch]);

    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.video_id === +boxId))

    // const navLink = (id) => {
    //     history.push(`users/${id}`)
    // }


    return (
        <>

            {comments?.map(comment => (
                <div className="commentDisplayBox">
                    <div className="firstContainer">
                        <div className="commentAvatar">
                            <a href={`/users/${comment.user_id}`}>
                                <img className='eachCommentAvtr'
                                    src={`${comment?.avatar}`}
                                // onClick={() => (
                                //     navLink(comment.user_id)
                                // )}
                                />
                            </a>
                        </div>
                    </div>
                    <div className="secondCOntainer">
                        <div className="fullCommentName">
                            <div className="commentFirstname">
                                {comment?.firstname}
                            </div>
                            <div className="commentLastname">
                                {comment?.lastname}
                            </div>
                        </div>
                        <div className='individualContent'>
                            <span> {comment?.content}</span>
                            <div className="comment-bottom-border" ></div>
                        </div>
                    </div>
                </div>

            ))}
        </>
    )
}

export default CommentsDisplay;