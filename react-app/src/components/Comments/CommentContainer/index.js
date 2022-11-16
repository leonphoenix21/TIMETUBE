import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import CreateComments from '../VideoCommentsDisplay/CreateComments/create-comments';

function CommentContainer({ videoCommentId }) {


    return (
        <>
            < CreateComments Id={videoCommentId} />
        </>
    )
}

export default CommentContainer;