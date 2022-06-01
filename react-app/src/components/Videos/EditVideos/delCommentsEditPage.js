import React, { useEffect, useRef, useState } from 'react';
import { GiTrashCan } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import './edit_videos.css';
import { removeComment } from '../../../store/comments'


function DelComEditPg({ comment }) {
    const [showCommDelete, setShowCommDelete] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // formData.append("id", commentId);

        const data = await dispatch(removeComment(comment.id))
        if (data) {
            setShowCommDelete(false)
        }
    }
    return (
        <div className="editVideodeleteComment">
            {showCommDelete ?
                <>
                    <form onSubmit={handleSubmit}>
                        <div className='areUSure'><label >are you sure you want to delete <span style={{ fontWeight: 'bold' }}>{comment?.firstname}</span>'s comment? </label></div>
                        <button className='commComfirmDel'> Confirm Delete </button>
                        <button className='commComfirmCancel' onClick={() => setShowCommDelete(false)}>Cancel</button>
                    </form>
                </>
                :
                <>
                    <span className="navlinks homeIcon" onClick={() => setShowCommDelete(true)} style={{ position: 'absolute', right: '5%' }}> <GiTrashCan /></span>
                </>
            }

        </div>
    )
}

export default DelComEditPg;