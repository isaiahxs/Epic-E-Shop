//actions
const SET_COMMENTS = "comments/SET_COMMENTS";
const ADD_COMMENT = "comments/ADD_COMMENT";
const EDIT_COMMENT = "comments/EDIT_COMMENT";

//action creators
export const setComments = (comments) => {
    console.log('Loading comments from localStorage');
    
    return {
        type: SET_COMMENTS,
        payload: comments,
    }
}

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment,
    }
}

// export const editComment = (comment) => {
//     return {
//         type: EDIT_COMMENT,
//         payload: comment,
//     }
// }

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

export const createComment = (itemId, comment) => async (dispatch) => {
    console.log('THIS IS OUR ITEM ID INSIDE THE THUNK ACTION', itemId)
    console.log('THIS IS OUR COMMENT INSIDE THE THUNK ACTION', comment)
    const response = await fetch(`/api/comments/${itemId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });

    if (response.ok) {
        const newComment = await response.json();
        dispatch(addComment(newComment));
        return newComment;
    }
}

export const editComment = (commentId, comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    });

    if (response.ok) {
        const updatedComment = await response.json();
        dispatch({
            type: EDIT_COMMENT,
            payload: updatedComment,
        })
        return updatedComment;
    }
}

//initial state
const initialState = [];

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_COMMENTS:
            return action.payload.comments ? action.payload.comments : [];

        case ADD_COMMENT:
            return [...state, action.payload];

        case EDIT_COMMENT:
            return state.map(comment => {
                if (comment.id === action.payload.id) {
                    return action.payload;
                } else {
                    return comment;
                }
            });

            //OR
            // const updatedComment = action.payload;
            // return state.map(comment => {
            //     if (comment.id === updatedComment.id) {
            //         return updatedComment;
            //     } else {
            //         return comment;
            //     }
            // });

        default:
            return state;
    }
}