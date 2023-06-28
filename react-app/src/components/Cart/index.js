import { useSelector, useDispatch } from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import { getCart, removeFromCart } from '../../store/cart'
import vbucks from '../../assets/images/vbucks-icon.webp'
import './Cart.css'
import { getInventory } from '../../store/inventory'
import { checkout } from '../../store/cart'
import { authenticate } from '../../store/session'
// import { setUser } from '../../store/session'


const Cart = ({isCartOpen}) => {
    const dispatch = useDispatch();
    const currentCart = useSelector(state => state.cart);
    // console.log('CURRENT CART', currentCart)

    const seedItems = useSelector(state => state.items.seedItems);
    const dailyItems = useSelector(state => state.items.dailyItems);
    const featuredItems = useSelector(state => state.items.featuredItems);
    const sessionUser = useSelector(state => state.session.user);

    //combine both lists
    const allItems = [...seedItems, ...dailyItems, ...featuredItems]

    const itemsInCart = currentCart.map(cartItem => {
        //find the item in allItems
        const item = allItems.find(item => item.itemId === cartItem.itemId);
        return {
            //spread item and cartItem to create a new object that has properties from both
            ...item,
            ...cartItem,
        };
    });

    // console.log('ITEMS IN CART LISTTTTTT', itemsInCart)

    const handleRemoveFromCart = (itemId) => {
        console.log('itemId within handleRemoveFromCart function', itemId)

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

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } 

    return (
        // <div className={`cart ${isCartOpen ? 'cart-open' : 'cart-closed'}`}>
        <div className={`cart ${isCartOpen ? 'cart-open' : 'cart-closed'}`} onClick={handleClick}>
            <div className='current-cart-items'>
                {/* {itemsInCart.length === 0 && <div>You currently have no items in your cart.</div>} */}
                {itemsInCart.length !== 0 &&
                    <>
                        <h2 className='cart-items-heading'>These are the items you currently have in your cart:</h2>
                        {sessionUser &&
                            <>
                                <div className='item-detail-price'>
                                    <img src={vbucks} className='vbucks-icon' />
                                    <h3 className='current-vbucks'>Current V-Bucks: {numberWithCommas(sessionUser.vbucks)}</h3>
                                </div>
                            </>
                        }
                        <div className='cart-item-list'>
                            {itemsInCart.map(item => {
                                if (item.images) {
                                    return (
                                        <div className='individual-cart-item' key={item.id}>
                                            <div className='cart-item-container'>

                                                <div className='cart-item-information'>
                                                    <div>{item.quantity} {item.name}</div>
                                                    <div className='item-detail-price'>
                                                        <img className='vbucks-icon' src={item.priceIconLink} />
                                                        <div>{item.price} V-Bucks</div>
                                                    </div>
                                                    <button onClick={() => handleRemoveFromCart(item.itemId)}>Remove from cart</button>
                                                </div>

                                                <div className='cart-item-image-container'>
                                                    <img className='item-detail-image cart-item-image' src={item.images.icon} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                }
                            })}

                            <div className='cart-total'>
                                <h2 className='cart-total-heading'>Cart Total:</h2>
                                <div className='item-detail-price cart-total-price'>
                                    <img className='vbucks-icon' src={vbucks} />
                                    <div>{numberWithCommas(itemsInCart.reduce((total, item) => {
                                    const price = parseInt(item.price.replace(/,/g, ''), 10);
                                    return total + price * item.quantity;
                                    }, 0))} V-Bucks
                                    </div>
                                </div>
                            </div>

                            <div className='checkout-button-container'>
                                <button className='checkout-button' onClick={handleCheckout}>Checkout</button>
                            </div>
                        </div>
                    </>
                }
                {itemsInCart.length === 0 &&
                    <>
                        <h2>Looks like you don't have any items in your cart yet!</h2>
                        {sessionUser &&
                            <>
                                <div className='item-detail-price'>
                                    <img src={vbucks} className='vbucks-icon' />
                                    <h3 className='current-vbucks'>Current V-Bucks: {numberWithCommas(sessionUser.vbucks)}</h3>
                                </div>
                            </>
                        }
                    </>
                }
            </div>
            
            <div className='additional-money-message'>
                <div>Need more vbucks? You can buy some more with your starter cash!</div>
                <div>If you've ran out of cash, you can earn more by completing daily tasks such as setting reminders, leaving comments, and likes!</div>
            </div>
        </div>
    )
}

export default Cart;