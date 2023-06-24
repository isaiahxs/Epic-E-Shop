//actions
const SET_LIKES = "likes/SET_LIKES";
const ADD_LIKE = "likes/ADD_LIKE";
const REMOVE_LIKE = "likes/REMOVE_LIKE";
const ADD_DISLIKE = "likes/ADD_DISLIKE";
const REMOVE_DISLIKE = "likes/REMOVE_DISLIKE";

//action creators

export const setLikes = (likes) => {
    console.log('Loading likes from localStorage');
    
    return {
        type: SET_LIKES,
        payload: likes,
    }
}

export const addLike = (like) => ({
    type: ADD_LIKE,
    payload: like,
});

export const removeLike = (like) => ({
    type: REMOVE_LIKE,
    payload: like,
});

export const addDislike = (dislike) => ({
    type: ADD_DISLIKE,
    payload: dislike,
});

export const removeDislike = (dislike) => ({
    type: REMOVE_DISLIKE,
    payload: dislike,
});

//thunk action
export const getLikes = () => async (dispatch) => {
    const response = await fetch("/api/likes", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const likes = await response.json();
        dispatch({
            type: SET_LIKES,
            payload: likes,
        })
    }
};

export const postLike = (itemId, value) => async (dispatch) => {
    console.log('this is the value when liking an item', value)
    const response = await fetch(`/api/likes/${itemId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({value: value}),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addLike(data));
    } else {
        console.error('Error', response.statusText);
    }
};

export const deleteLike = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${itemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({value: true}),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(removeLike(data));
    } else {
        console.error('Error', response.statusText);
    }
};

export const postDislike = (itemId, value) => async (dispatch) => {
    console.log('this is the value when disliking an item', value)
    const response = await fetch(`/api/likes/${itemId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({value: value}),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addDislike(data));
    } else {
        console.error('Error', response.statusText);
    }
};

export const deleteDislike = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/likes/${itemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({value: false}),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(removeDislike(data));
    } else {
        console.error('Error', response.statusText);
    }
};

//intial state
const initialState = [];

// console.log('this is the action.payload', action.payload);

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_LIKES:
            // return [...state, action.payload];
            // return action.payload;
            return action.payload.likes ? action.payload.likes : [];

        case ADD_LIKE:
            return [...state, action.payload];

        case REMOVE_LIKE:
            return state.filter((like) => like.id !== action.payload.id);

        case ADD_DISLIKE:
            return [...state, action.payload];

        case REMOVE_DISLIKE:
            return state.filter((dislike) => dislike.id !== action.payload.id);

        default:
            return state;
    }
}