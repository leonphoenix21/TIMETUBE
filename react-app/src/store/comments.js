const LOAD_COMMENTS = "comment/LOAD_COMMENTS";
const NEW_COMMENT = "video/NEW_COMMENT";


const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    comments,
});

const newComment = (comment) => ({
    type: NEW_COMMENT,
    comment,
});

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
        default:
            return state;
    }
}
