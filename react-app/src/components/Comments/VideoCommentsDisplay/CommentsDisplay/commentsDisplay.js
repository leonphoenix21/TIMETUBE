import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { videoComments } from '../../../../store/comments';
import './comdisplay.css';
import { GiTrashCan } from "react-icons/gi";
import EditComment from '../EditComment/editcomment';
import DeleteComments from '../DeleteComment/delete-comments';

function CommentsDisplay({ boxId }) {

    const dispatch = useDispatch();
    const comments = []
    let countComments = 0;
    useEffect(() => {
        (async () => {
            await dispatch(videoComments());
        })();
    }, []);

    const unsortedcomments = useSelector(state => Object.values(state.comments).filter(comment => comment.video_id === +boxId))
    for (let i = 1; i < unsortedcomments.length; i++) {
        let el = unsortedcomments[unsortedcomments.length - i]
        comments.push(el)
    }
    const sessionUser = useSelector(state => state.session.user)




    return (
        <>
            {/* <div className="countSort">
                <div className="commentCount">
                    {comments.length} Comments
                </div>
                <div className="sortByComments">

                </div>
            </div> */}
            <div className='CommentsDisplayContainer'>

                {comments?.map(comment => (
                    <div className="commentDisplayBox">
                        <div className="firstContainer">
                            <div className="commentAvatar">
                                <a href={`/users/${comment.user_id}`}>
                                    <img className='eachCommentAvtr'
                                        src={`${comment?.avatar}`}
                                    // onError={({ e }) => {
                                    //     // e.onerror = null;
                                    //     e.src = 'https://ih1.redbubble.net/image.1339858831.9273/st,small,845x845-pad,1000x1000,f8f8f8.u1.jpg'
                                    // }}
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
                                    <p className="commentContent">  {comment?.content}</p>
                                    {comment?.user_id === sessionUser.id ?
                                        <div className="commentIcons">
                                            <span className="navlinks homeIcon"> <EditComment commentId={comment.id} /></span>
                                            <span className="navlinks homeIcon"> <DeleteComments commentId={comment.id} /></span>
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
            </div>
        </>

    )
}

export default CommentsDisplay;