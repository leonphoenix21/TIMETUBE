// constants
const LOAD_USER = 'details/LOAD_USER';
const loadDetails = (user) => ({
    type: LOAD_USER,
    payload: user
});

export const userDetails = (data) => async (dispatch) => {
    const response = await fetch(`/api/users/`, {
        method: 'PUT',
        body: data,
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(loadDetails(data))
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
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
