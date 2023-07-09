import { useSelector, useDispatch } from 'react-redux'
import { getItemBackgroundColor } from '../../utils'
import { getCart, removeFromCart, addToCart } from '../../store/cart'
import vbucks from '../../assets/images/vbucks-icon.webp'
import './Cart.css'
import { getInventory } from '../../store/inventory'
import { checkout } from '../../store/cart'
import { authenticate } from '../../store/session'
// import { setUser } from '../../store/session'


const Cart = ({isCartOpen, toggleCartOpen}) => {
    const dispatch = useDispatch();
    const currentCart = useSelector(state => state.cart);
    // console.log('CURRENT CART', currentCart)

    const seedItems = useSelector(state => state.items.seedItems);
    const dailyItems = useSelector(state => state.items.dailyItems);
    const featuredItems = useSelector(state => state.items.featuredItems);
    const sessionUser = useSelector(state => state.session.user);

    //combine both lists
    const allItems = [...seedItems, ...dailyItems, ...featuredItems]

    const consolidateCartItems = (cartItems) => {
        let consolidated = {};
        cartItems.forEach(item => {
            if (!consolidated[item.itemId]) {
                consolidated[item.itemId] = { ...item };
            } else {
                consolidated[item.itemId].quantity += item.quantity;
            }
        });
        return Object.values(consolidated);
    };

    const itemsInCart = consolidateCartItems(
        currentCart.map(cartItem => {
            //find the item in allItems
            const item = allItems.find(item => item.itemId === cartItem.itemId);
            return {
                //spread item and cartItem to create a new object that has properties from both
                ...item,
                ...cartItem,
            };
        })
    );

    // const itemsInCart = currentCart.map(cartItem => {
    //     //find the item in allItems
    //     const item = allItems.find(item => item.itemId === cartItem.itemId);
    //     return {
    //         //spread item and cartItem to create a new object that has properties from both
    //         ...item,
    //         ...cartItem,
    //     };
    // });

    // console.log('ITEMS IN CART LISTTTTTT', itemsInCart)

    const handleAddToCart = (itemId) => {
        // e.preventDefault();
        const item = {
            userId: sessionUser.id,
            itemId: itemId,
            // quantity: 1,
        }
        dispatch(addToCart(item))
        .then(() => dispatch(getCart())) //only want to dispatch the re-render after the addToCart thunk action has completed
    }

    const handleRemoveFromCart = (itemId) => {
        // console.log('itemId within handleRemoveFromCart function', itemId)

        dispatch(removeFromCart(itemId))
        .then(() => dispatch(getCart()));
    }

    //this function will add commas to numbers
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } 

    const handleCheckout = () => {
        dispatch(checkout())
        .then(() => {
            dispatch(authenticate())
            dispatch(getInventory())
            dispatch(getCart())    
        });
    }

    const handleClick = (e) => {
        e.stopPropagation();
    }

    return (
        <div className={`cart ${isCartOpen ? 'cart-open' : 'cart-closed'}`} onClick={handleClick}>
            <button className='close-cart-button' onClick={toggleCartOpen}>X</button>
            <div className='current-cart-items'>
                {itemsInCart.length !== 0 &&
                    <>
                        <h2 className='cart-items-heading'>These are the items you currently have in your cart:</h2>
                        <div className='cart-item-list'>
                            {itemsInCart.map(item => {
                                if (!item.price) {
                                    console.error('Item with no price: ', item);
                                }
                                if (item.images) {
                                    return (
                                        <div className='individual-cart-item' key={item.id}>
                                            <div className='cart-item-container'>

                                                <div className='cart-item-information'>
                                                    <div>{item.quantity}x {item.name}</div>
                                                    <div className='item-detail-price'>
                                                        <img className='vbucks-icon' src={item.priceIconLink} />
                                                        <div>{item.price} V-Bucks</div>
                                                    </div>
                                                    <div className='in-cart-updates'>
                                                        <button className='in-cart-add' onClick={() => handleAddToCart(item.itemId)}>+1</button>
                                                        <button className='in-cart-remove' onClick={() => handleRemoveFromCart(item.itemId)}>-1</button>
                                                    </div>
                                                </div>

                                                <div className='cart-item-image-container'>
                                                    <img className='cart-item-image' src={item.images.icon} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                }
                            })}

                            {sessionUser &&
                                <>
                                    <div className='inventory-balance-container'>
                                        <h3 className='current-vbucks'>Current Balance:</h3>
                                        <div className='item-detail-price inventory-balance cart-content'>
                                            <img src={vbucks} className='vbucks-icon' />
                                            <h3 className='balance-amount'>{numberWithCommas(sessionUser.vbucks)} V-Bucks</h3>
                                        </div>
                                    </div>
                                </>
                            }

                            <div className='cart-total'>
                                <h3 className='cart-total-heading'>Cart Total:</h3>
                                <h3 className='item-detail-price cart-total-price'>
                                    <img className='vbucks-icon' src={vbucks} />
                                    {/* <div>{numberWithCommas(itemsInCart.reduce((total, item) => {
                                    const price = parseInt(item.price.replace(/,/g, ''), 10);
                                    return total + price * item.quantity;
                                    }, 0))} V-Bucks
                                    </div> */}
                                    <div>
                                        {numberWithCommas(itemsInCart.reduce((total, item) => {
                                            const price = item.price ? parseInt(item.price.replace(/,/g, ''), 10) : 0;
                                            return total + price * item.quantity;
                                        }, 0))} V-Bucks
                                    </div>
                                </h3>
                            </div>

                            <div className='checkout-button-container'>
                                <button className='checkout-button' onClick={handleCheckout}>Checkout</button>
                            </div>
                        </div>
                    </>
                }
                {itemsInCart.length === 0 &&
                    <>
                        {sessionUser &&
                            <>
                                <h2 className='cart-content-header cart-content'>Looks like you don't have any items in your cart yet!</h2>
                                    <div className='item-detail-price current-wallet cart-content'>
                                        <img src={vbucks} className='vbucks-icon' />
                                        <h3 className='current-vbucks'>Current V-Bucks: {numberWithCommas(sessionUser.vbucks)}</h3>
                                    </div>
                            </>
                        }
                        {!sessionUser &&
                            <>
                                <h2>Sign in to start adding items to your cart!</h2>
                            </>
                        }
                    </>
                }
            </div>
            
            <div className='additional-money-message'>
                <div>Additional features coming soon:</div>
                <div className='starter-cash-message'>Need more V-Bucks? You can buy some more with your starter cash!</div>
                <div>If you've ran out of cash, you can earn more by completing daily tasks such as setting reminders, leaving comments, and likes!</div>
            </div>
        </div>
    )
}

export default Cart;