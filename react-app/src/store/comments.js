const LOAD_COMMENTS = "comment/LOAD_COMMENTS";
const NEW_COMMENT = "video/NEW_COMMENT";
const REMOVE_COMMENT = "comment/REMOVE_COMMENTS";



const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    comments,
});

const newComment = (comment) => ({
    type: NEW_COMMENT,
    comment,
});

const deleteComment = (commentId) => {
    return {
        type: REMOVE_COMMENT,
        commentId,
    };
};

//! Get the comments for a specific video
export const videoComments = () => async (dispatch) => {
    const response = await fetch(`/api/comments/`);
    if (response.ok) {
        const comments = await response.json();
        dispatch(loadComments(comments));
    }
};



//! Creating Comments 
export const createComments = (data) => async (dispatch) => {
    const response = await fetch("/api/comments/", {
        method: "POST",
        body: data,
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(newComment(data));
        return data;
    }
    else {
        return ["Something seems wrong :( .Please try again."];
    }
};


//! Editing Comments from the Db
export const editComment = (data) => async (dispatch) => {
    const response = await fetch("/api/comments/", {
        method: "PUT",
        body: data,
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(newComment(data));
        return data;
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
};

export const removeComment = (id) => async (dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        const comment = await response.json();
        dispatch(deleteComment(comment));
        return id;
    }
};


const initialState = {};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_COMMENTS: {
            const newState = { ...state };
            action.comments.forEach((comment) => {
                newState[comment.id] = comment;
            });
            return newState;
        }
        case NEW_COMMENT: {
            const newState = {
                ...state,
                [action.comment.id]: action.comment,
            };
            return newState;
        }
        case REMOVE_COMMENT: {
            const newState = { ...state };
            delete newState[action.commentId];
            return newState;
        }
        default:
            return state;
    }
}
