//actions
const SET_COMMENTS = "comments/SET_COMMENTS";

//action creators
export const setComments = (comments) => {
    console.log('Loading comments from localStorage');
    
    return {
        type: SET_COMMENTS,
        payload: comments,
    }
}

//thunk action
export const getComments = () => async (dispatch) => {
    const response = await fetch("/api/comments", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const comments = await response.json();
        dispatch({
            type: SET_COMMENTS,
            payload: comments,
        })
    }
}

//initial state
const initialState = [];

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_COMMENTS:
            return action.payload.comments ? action.payload.comments : [];

        default:
            return state;
    }
}