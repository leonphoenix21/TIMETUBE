// constants
const LOAD_USER = 'details/LOAD_USER';
const NEW_DETAIL = "detail/NEW_DETAIL";
const loadDetails = (user) => ({
    type: LOAD_USER,
    payload: user
});

const newDetail = (detail) => ({
    type: NEW_DETAIL,
    detail,
});

export const userDetails = (data) => async (dispatch) => {
    const response = await fetch(`/api/users/edit`, {
        method: 'PUT',
        body: data,
    });
    if (response.ok) {
        const detail = await response.json();
        dispatch(newDetail(data))
        return detail;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

export const loadUserDetails = () => async (dispatch) => {
    const response = await fetch(`/api/users/details`);
    console.log()
    if (response.ok) {
        const details = await response.json();
        dispatch(loadDetails(details));
    }
}

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case NEW_DETAIL: {
            const newState = {
                ...state,
                [action.detail.id]: action.detail
            }
            return newState;
        }
        case LOAD_USER:
            const newState = { ...state }
            action?.details?.forEach((user) => {
                newState[user.id] = user
            })
            return newState
        default:
            return state;
    }
}
