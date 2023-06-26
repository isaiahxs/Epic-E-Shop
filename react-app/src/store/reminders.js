//actions
const SET_REMINDERS = "reminders/SET_REMINDERS";
const CREATE_REMINDER = "reminders/CREATE_REMINDER";
const EDIT_REMINDER = "reminders/UPDATE_REMINDER";
const DELETE_REMINDER = "reminders/DELETE_REMINDER";

//action creators
export const setReminders = (reminders) => ({
    type: SET_REMINDERS,
    payload: reminders,
});

export const createReminder = (reminder) => ({
    type: CREATE_REMINDER,
    payload: reminder,
});

export const editReminder = (reminder) => ({
    type: EDIT_REMINDER,
    payload: reminder,
});

export const deleteReminder = (reminder) => ({
    type: DELETE_REMINDER,
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

export const updateExistingReminder = (reminder) => async (dispatch) => {
    const response = await fetch(`/api/reminders/${reminder.itemId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reminder),
    });

    if (response.ok) {
        const updatedReminder = await response.json();
        dispatch(editReminder(updatedReminder));
        return updatedReminder;
    }
};

export const deleteExistingReminder = (reminder) => async (dispatch) => {
    const response = await fetch(`/api/reminders/${reminder.itemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reminder),
    });

    if (response.ok) {
        const deletedReminder = await response.json();
        dispatch(deleteReminder(deletedReminder));
        // return deletedReminder;
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

        case EDIT_REMINDER:
            return state.map(reminder => {
                if (reminder.id === action.payload.id) {
                    return action.payload;
                } else {
                    return reminder;
                }
            });

        case DELETE_REMINDER:
            return state.filter(reminder => reminder.id !== action.payload.id);

    default:
        return state;
    }
}