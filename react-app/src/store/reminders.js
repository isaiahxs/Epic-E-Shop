//actions
const SET_REMINDERS = "reminders/SET_REMINDERS";

//action creators
export const setReminders = (reminders) => ({
    type: SET_REMINDERS,
    payload: reminders,
});

//thunk action
export const getReminders = () => async (dispatch) => {
    const response = await fetch("/api/reminders", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const reminders = await response.json();
        dispatch(setReminders(reminders));
    }
};

//initial state
const initialState = [];

//reducer
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_REMINDERS:
            return action.payload.reminders ? action.payload.reminders : [];

    default:
        return state;
    }
}