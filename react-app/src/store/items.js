//actions
const SET_DAILY_ITEMS = "items/SET_DAILY_ITEMS";

//action creators
const setDailyItems = (items) => ({
    type: SET_DAILY_ITEMS,
    payload: items,
});

//initial state
const initialState = { dailyItems: [] };

//thunk action
export const getDailyItems = () => async (dispatch) => {
    const response = await fetch("/api/items/daily_items", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setDailyItems(data));
    }
};

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DAILY_ITEMS:
            return { ...state, dailyItems: action.payload };
        default:
            return state;
    }
}