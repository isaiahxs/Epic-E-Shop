import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCart, addToCart, removeFromCart } from '../../store/cart';
import Cart from '../Cart';
import vbucks from '../../assets/images/vbucks-icon.webp';
import './CartPanel.css'

const CartPanel = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const currentItem = useSelector(state => state.items.currentItem);
    const cart = useSelector(state => state.cart);

    const [isCartOpen, setIsCartOpen] = useState(false);

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

    // const toggleCartOpen = () => {
    //     setIsCartOpen(!isCartOpen);
    // }

    //so i can disable background scrolling while cart is opened
    const toggleCartOpen = () => {
        setIsCartOpen(!isCartOpen);
        if (!isCartOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }

    useEffect(() => {
        return () => {
            //removes the no-scroll class when the component unmounts
            document.body.classList.remove('no-scroll');
        };
    }, []);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <>
            {currentItem ? (
                <div className='cart-panel-container'>
                    {isCartOpen && <div className="overlay" onClick={toggleCartOpen}></div>}
                    <div className='item-detail-price current-wallet'>
                        {sessionUser &&
                            <>
                                <img className='vbucks-icon' src={vbucks} alt='vbucks icon' />
                                <div className='current-vbucks'>Current V-Bucks: {numberWithCommas(sessionUser.vbucks)}</div>
                            </>
                        }
                        {!sessionUser && (
                            <h2>
                                Sign in to vote, comment, set a reminder, or shop our items!
                            </h2>
                        )}
                    </div>

                    <div className='gift-message'>
                        <div>Feature coming soon: You can also purchase multiple of the same item in case you'd like to gift one to a friend!</div>
                    </div>

                    <h2>Cart ({cart.length})</h2>
                    {!sessionUser &&
                        <button className='blue-button toggle-cart toggle-cart-signed-out' onClick={toggleCartOpen}>
                            {isCartOpen ? 'Close Cart' : 'Open Cart'}
                        </button>
                    }

                    {sessionUser && currentItem.history.dates &&
                        <div className='cart-button-container'>
                            <div className='add-remove-cart-buttons'>
                                <button className='toggle-cart blue-button' onClick={toggleCartOpen}>
                                    {isCartOpen ? 'Close Cart' : 'Open Cart'}
                                </button>
                                {currentItem.history.dates &&
                                    <>
                                        <button className='add-this-item-to-cart-button green-button' onClick={() => handleAddToCart()}>Add to cart</button>
                                        <button className='remove-this-item-from-cart-button red-button' onClick={() => handleRemoveFromCart(currentItem.itemId)}>Remove from cart</button>
                                    </>
                                }
                            </div>
                        </div>
                    }

                    {sessionUser && !currentItem.history.dates &&
                        <div className='cart-button-container'>
                            <div className='add-remove-cart-buttons'>
                                <button className='blue-button toggle-cart smaller-toggle-cart' onClick={toggleCartOpen}>
                                    {isCartOpen ? 'Close Cart' : 'Open Cart'}
                                </button>
                            </div>
                        </div>
                    }

                    <Cart isCartOpen={isCartOpen} toggleCartOpen={toggleCartOpen} />
                </div>
            ) : (
                <div className='loading-message-container'>
                    <h2 className='loading-message'>Loading...</h2>
                </div>
            )}
        </>
    )
}

export default CartPanel;