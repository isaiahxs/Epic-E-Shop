//actions
const SET_SEED_ITEMS = "items/SET_SEED_ITEMS";
const SET_DAILY_ITEMS = "items/SET_DAILY_ITEMS";
const SET_FEATURED_ITEMS = "items/SET_FEATURED_ITEMS";
const SET_ITEMS_LOADED = "items/SET_ITEMS_LOADED";
const SET_CURRENT_ITEM = "items/SET_CURRENT_ITEM";
const SET_SEARCH_RESULTS = "items/SET_SEARCH_RESULTS";
const SET_SEARCH_ERROR = "items/SET_SEARCH_ERROR";
const CLEAR_SEARCH_RESULTS = "items/CLEAR_SEARCH_RESULTS";


//action creators
export const setSeedItems = (items) => {
    // console.log('Loading seed items from localStorage');

    return {
        type: SET_SEED_ITEMS,
        payload: items,
    }
};

export const setDailyItems = (items) => {
    // console.log('Loading daily items from localStorage');

    return {
        type: SET_DAILY_ITEMS,
        payload: items,
    }
};

export const setFeaturedItems = (items) => {
    // console.log('Loading featured items from localStorage');

    return {
        type: SET_FEATURED_ITEMS,
        payload: items,
    }
};

export const setItemsLoaded = () => ({
    type: SET_ITEMS_LOADED,
})

export const setCurrentItem = (item) => ({
    type: SET_CURRENT_ITEM,
    payload: item,
})

export const setSearchResults = (items) => ({
    type: SET_SEARCH_RESULTS,
    payload: items,
})

export const setSearchError = (message) => ({
    type: SET_SEARCH_ERROR,
    payload: message,
})

export const clearSearchResults = () => ({
    type: CLEAR_SEARCH_RESULTS
});

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
        // console.log('Data from getSeedItems', data);

        dispatch(setSeedItems(data.seeded_items));
        // console.log('Loading seed items from API');
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
        // console.log('Loading daily items from API')
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
        // console.log('Loading featured items from API')
        dispatch(setItemsLoaded()); //set items loaded after fetching items
    }
};

export const getCurrentItem = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/items/${itemId}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(setCurrentItem(data));
        // console.log('Loading current item from API')
        dispatch(setItemsLoaded()); //set items loaded after fetching items
    }
};

//encodeURIComponent is used to ensure the query string is properly formatted
export const searchItems = (query) => async (dispatch) => {
    dispatch(clearSearchResults());

    const response = await fetch(`/api/items/search?name=${encodeURIComponent(query)}`, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const data = await response.json();
        // console.log('data from searchItems', data)
        dispatch(setSearchResults(data));

        // dispatch(getSeedItems());
    } else if (response.status === 404) {
        dispatch(setSearchError("Sorry, we were not able to find your item."));
    } else if (response.status === 400) {
        dispatch(setSearchError("Please enter an item to search."));
    }
};

//initial state
const initialState = { seedItems: [], dailyItems: [], featuredItems: [], itemsLoaded: false, currentItem: null, searchResults: [], searchError: null};

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

        case SET_CURRENT_ITEM:
            return { ...state, currentItem: action.payload };

        case SET_SEARCH_RESULTS:
            return { ...state, searchResults: action.payload };

        case SET_SEARCH_ERROR:
            return { ...state, searchError: action.payload };

        case CLEAR_SEARCH_RESULTS:
            return { ...state, searchResults: null, searchError: null };

        default:
            return state;
    }
}