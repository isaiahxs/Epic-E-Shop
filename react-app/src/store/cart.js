import { setInventory } from "./inventory";

//action
const SET_CART = 'cart/SET_CART';
const CLEAR_CART = 'cart/CLEAR_CART';
const ADD_ITEM = 'cart/ADD_ITEM';
const REMOVE_ITEM = 'cart/REMOVE_ITEM';

//action creators
export const setCart = (cart) => ({
    type: SET_CART,
    payload: cart,
});

export const clearCart = () => ({
    type: CLEAR_CART,
});

export const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item,
});

export const removeItem = (item) => ({
    type: REMOVE_ITEM,
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

export const removeFromCart = (itemId) => async (dispatch) => {
    const response = await fetch(`/api/carts/${itemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const cart = await response.json();
        dispatch(setCart(cart));
        // return cart;
    }
};

export const checkout = () => async (dispatch) => {
    const response = await fetch(`/api/carts/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const inventory = await response.json();
        dispatch(setInventory(inventory));
        //clear cart
        dispatch(setCart([]));
    } else {
        const errorData = await response.json();
        console.error(errorData);
    }
};

//initial state
const initialState = [];

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_CART:
            return action.payload.cart ? action.payload.cart : [];

        case CLEAR_CART:
            return [];

        case ADD_ITEM:
            return [...state, action.payload];

        case REMOVE_ITEM:
            return state.filter((item) => item.id !== action.payload);

        default:
            return state;
    }
}