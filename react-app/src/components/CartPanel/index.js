import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCart, getCart, addItem, addToCart, removeItem, removeFromCart } from '../../store/cart';
import Cart from '../Cart';
import './CartPanel.css'

const CartPanel = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // console.log('SESSION USER', sessionUser)

    const currentItem = useSelector(state => state.items.currentItem);

    //dispatch getCart whenever CartPanel is mounted or whenever sessionUser changes
    useEffect(() => {
        if (sessionUser) {
            dispatch(getCart())
        }
    }, [dispatch, sessionUser])

    const handleAddToCart = (e) => {
        // e.preventDefault();
        const item = {
            userId: sessionUser.id,
            itemId: currentItem.itemId,
            // quantity: 1,
        }
        dispatch(addToCart(item))
        .then(() => dispatch(getCart())) //only want to dispatch the re-render after the addToCart thunk action has completed
    }

    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart(itemId))
        .then(() => dispatch(getCart())) //only want to dispatch the re-render after the addToCart thunk action has completed
    }

    return (
        <div>
            <button className='add-this-item-to-cart-button' onClick={() => handleAddToCart()}>Add this item to your cart</button>
            <button className='remove-this-item-from-cart-button' onClick={() => handleRemoveFromCart(currentItem.itemId)}>Remove this item from your cart</button>
            <Cart />
        </div>
    )
}

export default CartPanel;