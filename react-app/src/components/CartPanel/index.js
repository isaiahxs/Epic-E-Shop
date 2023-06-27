import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCart, getCart, addItem, addToCart, removeItem, removeFromCart } from '../../store/cart';
import Cart from '../Cart';
import vbucks from '../../assets/images/vbucks-icon.webp';
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
            <div className='item-detail-price current-wallet'>
                <img className='vbucks-icon' src={vbucks} alt='vbucks icon' />
                {sessionUser &&
                <div className='current-vbucks'>Current V-Bucks: {sessionUser.vbucks}</div>
                }

                {!sessionUser &&
                <div className='cart-not-logged-in'>Sign in to view your vbucks balance</div>
                }
            </div>
            <div className='gift-message'>
                <div>Feature coming soon: You can also purchase multiple of the same item in case you'd like to gift one to a friend!</div>
            </div>
            <div className='add-remove-cart-buttons'>
                <button className='add-this-item-to-cart-button' onClick={() => handleAddToCart()}>Add this item to your cart</button>
                <button className='remove-this-item-from-cart-button' onClick={() => handleRemoveFromCart(currentItem.itemId)}>Remove this item from your cart</button>
            </div>
            <Cart />
        </div>
    )
}

export default CartPanel;