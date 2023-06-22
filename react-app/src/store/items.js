//actions
const SET_SEED_ITEMS = "items/SET_SEED_ITEMS";
const SET_DAILY_ITEMS = "items/SET_DAILY_ITEMS";
const SET_FEATURED_ITEMS = "items/SET_FEATURED_ITEMS";
const SET_ITEMS_LOADED = "items/SET_ITEMS_LOADED";

//action creators
export const setSeedItems = (items) => {
    console.log('Loading seed items from localStorage');

    return {
        type: SET_SEED_ITEMS,
        payload: items,
    }
};

export const setDailyItems = (items) => {
    console.log('Loading daily items from localStorage');

    return {
        type: SET_DAILY_ITEMS,
        payload: items,
    }
};

export const setFeaturedItems = (items) => {
    console.log('Loading featured items from localStorage');

    return {
        type: SET_FEATURED_ITEMS,
        payload: items,
    }
};

export const setItemsLoaded = () => ({
    type: SET_ITEMS_LOADED,
})

//initial state
const initialState = { seedItems: [], dailyItems: [], featuredItems: [], itemsLoaded: false };

//thunk action
export const getSeedItems = () => async (dispatch) => {
    //fetch seed items from backend
    const response = await fetch("/api/items/seed_items", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setSeedItems(data.seeded_items));
        console.log('Loading seed items from API')
        dispatch(setItemsLoaded()); //set items loaded after fetching items
    }
};

export const getDailyItems = () => async (dispatch) => {
    const response = await fetch("/api/items/daily_items", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setDailyItems(data));
        console.log('Loading daily items from API')
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
        console.log('Loading featured items from API')
        dispatch(setItemsLoaded()); //set items loaded after fetching items
    }
};

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_SEED_ITEMS:
            return { ...state, seedItems: action.payload };

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