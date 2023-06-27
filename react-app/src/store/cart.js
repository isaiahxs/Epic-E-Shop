//action
const SET_CART = 'cart/SET_CART';

//action creators
export const setCart = (cart) => ({
    type: SET_CART,
    payload: cart,
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

//initial state
const initialState = [];

//reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_CART:
            return action.payload.cart ? action.payload.cart : [];

        default:
            return state;
    }
}