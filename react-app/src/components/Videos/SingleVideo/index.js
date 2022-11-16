import React, { useEffect, useRef, useState } from 'react';
import SingleVideo from './VIdeoDisplay/singlevideo';
import { useParams, useHistory } from 'react-router-dom';
import CommentsDisplay from '../../Comments/VideoCommentsDisplay/CommentsDisplay/commentsDisplay';
import VideoDescription from './VideoDescription/vid-description';
import VideoSideBar from './VideoSideBar/side-vid-bar';
import { useSelector } from 'react-redux';
import './index.css'
import CommentContainer from '../../Comments/CommentContainer';

function SingleVideoPage() {
    const [commCount, setCommCount] = useState(0)

    const { videoId } = useParams()
    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.video_id === +videoId).reverse()
    )
    useEffect(() => {
        if (comments) {
            setCommCount(comments.length)
        }
    }, [comments]);
    return (
        <div className='Single-Page-Div'>
            <div className="single-videopage-container">
                {/*this div plays the video only  */}
                <div className="video-comments-sidebar">
                    <div className="single-video-container">
                        <SingleVideo />
                    </div>
                    {/*comments and sidebar */}
                    <div className="video-description-comments-div">
                        <VideoDescription />
                        <div className="singlevid-border-Top-line"></div>

                        <div className='commentsCount' > {commCount} Comments  </div>

                        <CommentContainer videoCommentId={videoId} />
                        <div className="comment-single-page-box">
                            <CommentsDisplay boxId={videoId} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="video-sidebar-div">
                <VideoSideBar />
            </div>
        </div>
    )
}

export default SingleVideoPage;