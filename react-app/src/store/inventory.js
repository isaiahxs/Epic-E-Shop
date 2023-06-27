// //action
const SET_INVENTORY = 'inventory/SET_INVENTORY';

// //action creators
export const setInventory = (inventory) => ({
    type: SET_INVENTORY,
    payload: inventory,
});

// //thunk action
export const getInventory = () => async (dispatch) => {
    const response = await fetch("/api/inventories/", {
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const inventory = await response.json();
        dispatch(setInventory(inventory));
    }
};

// //initial state
const initialState = [];

// //reducer
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_INVENTORY:
            return action.payload.inventory ? action.payload.inventory : [];

        default:
            return state;
    }
}