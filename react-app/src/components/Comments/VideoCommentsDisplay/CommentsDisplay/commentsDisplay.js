import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { videoComments } from '../../../../store/comments';
import './comdisplay.css';
import { GiTrashCan } from "react-icons/gi";
import { MdEditNote } from "react-icons/md";
import EditComment from '../../EditComment/editcomment';
function CommentsDisplay({ boxId }) {

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(videoComments());
        })();
    }, [dispatch]);

    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.video_id === +boxId))
    const sessionUser = useSelector(state => state.session.user)



    return (
        <>

            {comments?.map(comment => (
                <div className="commentDisplayBox">
                    <div className="firstContainer">
                        <div className="commentAvatar">
                            <a href={`/users/${comment.user_id}`}>
                                <img className='eachCommentAvtr'
                                    src={`${comment?.avatar}`}
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
                            <div className="contentItems">
                                <div className="contentpart">  <span> {comment?.content}</span> </div>
                                {comment?.user_id === sessionUser.id ?
                                    <div className="commentIcons">
                                        <span className="navlinks homeIcon"> <GiTrashCan /></span>
                                        <span className="navlinks homeIcon"> <EditComment commentId={comment.id} /></span>
                                    </div>
                                    :
                                    <>
                                    </>
                                }
                            </div>
                            <div className="comment-bottom-border" ></div>
                        </div>
                    </div>
                </div>

            ))}
        </>
    )
}

export default CommentsDisplay;