import React, { useEffect, useRef, useState } from 'react';
import { GiTrashCan } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import './edit_videos.css';
import { removeComment } from '../../../store/comments'
import { BsCheck2 } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';


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
                    <form onSubmit={handleSubmit} className='ConfirmDel '>
                        <div className='thumbnailHeader ' style={{ marginBottom: '-8px' }}><label >Confirm delete? </label></div>
                        <div className="delcommIcons">
                            <button className='commComfirmDel' style={{ marginRight: '10px' }}> <BsCheck2 /> </button>
                            <button className='commComfirmDel' onClick={() => setShowCommDelete(false)}><MdOutlineCancel /></button>
                        </div>
                    </form>
                </>
                :
                <>
                    <span className="navlinks homeIcon" onClick={() => setShowCommDelete(true)} > <GiTrashCan /></span>
                </>
            }

        </div>
    )
}

export default DelComEditPg;