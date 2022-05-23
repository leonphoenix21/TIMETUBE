const LOAD_VIDEOS = "video/LOAD_VIDEOS";
const NEW_VIDEO = "video/NEW_VIDEO";
const REMOVE_VIDEO = "video/REMOVE_VIDEO";

const loadVideos = (videos) => ({
    type: LOAD_VIDEOS,
    videos,
});

// for create and edit
export const newVideo = (video) => ({
    type: NEW_VIDEO,
    video,
});

const removeVideo = (videoId) => {
    return {
        type: REMOVE_VIDEO,
        videoId,
    };
};



//! Create videos in the database
export const uploadVideo = (Data) => async (dispatch) => {
    console.log('this is when video is received in store and about to be sent to backend')

    const response = await fetch("/api/videos/", {
        method: "POST",
        body: Data,
    });
    console.log(' hhhhhhhhhhhhhhh ', response)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return data
        } else if (!data.errors) {
            dispatch(newVideo(data));
            return data;
        }
    } else {
        return { 'errors': ['an error has occured please verify your file types'] }
    }
};

//! Get All Videos from the Database
export const getAllVideos = () => async (dispatch) => {
    const response = await fetch("/api/videos/");
    if (response.ok) {
        const videos = await response.json();
        dispatch(loadVideos(videos));
    }
};



//! Edit/Update Videos from the db
export const editVideo = (data) => async (dispatch) => {
    const response = await fetch(`/api/videos/`, {
        method: "PUT",
        body: data,
    });
    if (response.ok) {
        const video = await response.json();
        dispatch(newVideo(video));
        return video;
    } else {
        const data = await response.json();
        if (data.errors) {
            return ['An video/image file error occured. please try again']
        }
    }
};

//!Delete Video from the db
export const deleteVideo = (videoId) => async (dispatch) => {
    const response = await fetch(`/api/videos/${videoId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        await response.json();
        dispatch(removeVideo(videoId));
        return videoId;
    }
};

// State shape:
// state.videos --> {
//   [id]: {
//      id, user_id, title, video_url, description, image_url, created_at, updated_at,
//      user: {},
//      comments: [],
//   },
//   [id]: {
//      id, user_id, title, video_url, description, image_url, created_at, updated_at,
//      user: {},
//      comments: [],
//   },
// }

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case NEW_VIDEO: {
            const newState = {
                ...state,
                [action.video.id]: action.video,
            };
            return newState;
        }
        case LOAD_VIDEOS: {
            const newState = { ...state };
            action.videos.forEach((video) => {
                newState[video.id] = video;
            });
            return newState;
        }
        case REMOVE_VIDEO: {
            const newState = { ...state };
            delete newState[action.videoId];
            return newState;
        }
        default:
            return state;
    }
}