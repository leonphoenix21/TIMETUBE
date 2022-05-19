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

    const { videoId } = useParams()
    const comments = useSelector(state => Object.values(state.comments).filter(comment => comment.video_id === +videoId))

    return (
        <>
            <div className="single-videopage-container">
                {/*this div plays the video only  */}
                <div className="playing-video-container">
                    <SingleVideo />
                </div>

                {/*comments and sidebar */}
                <div className="video-comments-sidebar">
                    <div className="video-description-comments-div">
                        <VideoDescription />
                        <div className="border-Top-line"></div>
                        <div className="countSort">
                            <div className="commentCount">
                                {comments.length} Comments
                            </div>
                            <div className="sortByComments">

                            </div>
                        </div>
                        <CommentContainer videoCommentId={videoId} />
                        <CommentsDisplay boxId={videoId} />
                    </div>
                    <div className="video-sidebar-div">
                        <VideoSideBar />
                    </div>
                </div>

            </div>
        </>
    )
}

export default SingleVideoPage;