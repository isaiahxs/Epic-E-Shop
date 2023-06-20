//actions
const SET_DAILY_ITEMS = "items/SET_DAILY_ITEMS";
const SET_FEATURED_ITEMS = "items/SET_FEATURED_ITEMS";
const SET_ITEMS_LOADED = "items/SET_ITEMS_LOADED";

//action creators
const setDailyItems = (items) => ({
    type: SET_DAILY_ITEMS,
    payload: items,
});

const setFeaturedItems = (items) => ({
    type: SET_FEATURED_ITEMS,
    payload: items,
});

const setItemsLoaded = () => ({
    type: SET_ITEMS_LOADED,
})

//initial state
const initialState = { dailyItems: [], featuredItems: [], itemsLoaded: false };

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
        dispatch(setItemsLoaded()); //set items loaded after fetching items
    }
};

export const getFeaturedItems = () => async (dispatch) => {
    const response = await fetch("/api/items/featured_items", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setFeaturedItems(data));
        dispatch(setItemsLoaded()); //set items loaded after fetching items
    }
};

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DAILY_ITEMS:
            return { ...state, dailyItems: action.payload };

        case SET_FEATURED_ITEMS:
            return { ...state, featuredItems: action.payload };

        case SET_ITEMS_LOADED:
            return { ...state, itemsLoaded: true };

        default:
            return state;
    }
}