import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { videoComments } from '../../../../store/comments';
import './comdisplay.css';
import EditComment from '../EditComment/editcomment';
import DeleteComments from '../DeleteComment/delete-comments';

function CommentsDisplay({ boxId }) {

    const [commCount, setCommCount] = useState(0)
    const [users, setUsers] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            await dispatch(videoComments());
        })();
    }, []);

    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.video_id === +boxId).reverse()
    )
    const video = useSelector(state => Object.values(state.videos).filter((vid) => vid.id === +boxId))
    const sessionUser = useSelector(state => state.session.user)


    //Querries the backend for all users
    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/users/');
            const responseData = await response.json();
            setUsers(responseData.users);
        }
        fetchData();
    }, [dispatch]);
    const PosterPicture = (id) => {
        const findUser = users.filter(currUser => currUser?.id === +id);
        const userAvatar = findUser[0]?.avatar
        return userAvatar;
    }
    const channelName = (id) => {
        const findUser = users.filter(currUser => currUser?.id === +id);
        const firstname = findUser[0]?.firstname
        const lastname = findUser[0]?.lastname
        const fullname = `${firstname} ${lastname}`
        return fullname;
    }

    return (
        <div className='commentBody'>
            <div className="countSort">

                <div className="sortByComments">

                </div>
            </div>
            <div className='CommentsDisplayContainer'>
                {comments?.map(comment => (
                    <div className="commentDisplayBox">
                        <div className="firstContainer">
                            <div className="commentAvatar">
                                <a href={`/users/${comment?.user_id}`}>
                                    <img className='eachCommentAvtr'
                                        src={`${PosterPicture(comment.user_id)}`}
                                        onError={(e) => e.target.src = ('https://as1.ftcdn.net/jpg/03/35/13/14/220_F_335131435_DrHIQjlOKlu3GCXtpFkIG1v0cGgM9vJC.jpg')}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="secondCOntainer">
                            <div className="fullCommentName">
                                <div className="commentFirstname" style={{ marginRight: '3px' }}>
                                    {channelName(comment.user_id)}
                                </div>
                            </div>
                            <div className='individualContent'>
                                <div className="contentItems">
                                    <p className="commentContent">  {comment?.content}</p>
                                    {comment?.user_id === sessionUser.id ?
                                        <span className="commentReactIcons commEdit"> <EditComment commentId={comment.id} /></span>
                                        :
                                        <>
                                        </>
                                    }
                                    {comment?.user_id === sessionUser.id || sessionUser.id === video.user ?
                                        <span className="navlinks homeIcon commDell"> <DeleteComments commentId={comment.id} /></span>
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
        </div>

    )
}

export default CommentsDisplay;