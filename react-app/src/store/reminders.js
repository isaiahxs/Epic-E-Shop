//actions
const SET_REMINDERS = "reminders/SET_REMINDERS";
const CREATE_REMINDER = "reminders/CREATE_REMINDER";

//action creators
export const setReminders = (reminders) => ({
    type: SET_REMINDERS,
    payload: reminders,
});

export const createReminder = (reminder) => ({
    type: CREATE_REMINDER,
    payload: reminder,
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

export const createNewReminder = (reminder) => async (dispatch) => {
    const response = await fetch(`/api/reminders/${reminder.itemId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reminder),
    });

    if (response.ok) {
        const newReminder = await response.json();
        dispatch(createReminder(newReminder));
        return newReminder;
    }
};

//initial state
const initialState = [];

//reducer
export default function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_REMINDERS:
            return action.payload.reminders ? action.payload.reminders : [];

        case CREATE_REMINDER:
            return [...state, action.payload];

    default:
        return state;
    }
}