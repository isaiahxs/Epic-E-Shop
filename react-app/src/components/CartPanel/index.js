import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCart, getCart } from '../../store/cart';
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
            This is the CartPanel
        </div>
    )
}

export default CartPanel;