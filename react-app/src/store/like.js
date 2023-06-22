//actions
const SET_LIKES = "likes/SET_LIKES";

//action creators
export const setLikes = (likes) => ({
    type: SET_LIKES,
    payload: likes,
});

//intial state
const initialState = { likes: [] };

//thunk action
export const getLikes = () => async (dispatch) => {
    const response = await fetch("/api/likes", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();
        console.log("this is the data retrieved from getLikes", data);
        dispatch(setLikes(data.likes));
    } else {
        console.error('Error', response.statusText);
    }
};

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_LIKES:
            return { ...state, likes: action.payload };
        default:
            return state;
    }
}