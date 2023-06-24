//actions
const SET_LIKES = "likes/SET_LIKES";
const ADD_LIKE = "likes/ADD_LIKE";

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

    // if (response.ok) {
    //     const data = await response.json();
    //     console.log("this is the data retrieved from getLikes", data);
    //     dispatch(setLikes(data));
    //     console.log('Loading likes from from API')
    // } else {
    //     console.error('Error', response.statusText);
    // }
};

export const postLike = (itemId, value) => async (dispatch) => {
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
            // return action.payload;
            

        default:
            return state;
    }
}