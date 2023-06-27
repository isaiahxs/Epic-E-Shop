//action
const SET_CART = 'cart/SET_CART';
const ADD_ITEM = 'cart/ADD_ITEM';

//action creators
export const setCart = (cart) => ({
    type: SET_CART,
    payload: cart,
});

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item,
});

//thunk action
export const getCart = () => async (dispatch) => {
    const response = await fetch("/api/carts/", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const cart = await response.json();
        dispatch(setCart(cart));
    }
};

export const addToCart = (item) => async (dispatch) => {
    console.log('THIS IS OUR ITEM ID INSIDE THE THUNK ACTION', item)
    const response = await fetch(`/api/carts/${item.itemId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    });

    if (response.ok) {
        const cart = await response.json();
        dispatch(setCart(cart));
        return cart;
    }
};

//initial state
const initialState = [];

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_CART:
            return action.payload.cart ? action.payload.cart : [];

        case ADD_ITEM:
            return [...state, action.payload];

        default:
            return state;
    }
}