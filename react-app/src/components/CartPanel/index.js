import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCart, getCart } from '../../store/cart';
import Cart from '../Cart';
import './CartPanel.css'

const CartPanel = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    console.log('SESSION USER', sessionUser)

    //dispatch getCart whenever CartPanel is mounted or whenever sessionUser changes
    useEffect(() => {
        if (sessionUser) {
            dispatch(getCart())
        }
    }, [dispatch, sessionUser])

    return (
        <div>
            <button>Add item to cart</button>
            <button>Remove item from cart</button>
            <Cart />
        </div>
    )
}

export default CartPanel;