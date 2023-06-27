import { useSelector, useDispatch } from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import { getCart, removeFromCart } from '../../store/cart'
import vbucks from '../../assets/images/vbucks-icon.webp'
import './Cart.css'

const Cart = () => {
    const dispatch = useDispatch();
    const currentCart = useSelector(state => state.cart);
    // console.log('CURRENT CART', currentCart)

    const seedItems = useSelector(state => state.items.seedItems);
    const dailyItems = useSelector(state => state.items.dailyItems);
    const featuredItems = useSelector(state => state.items.featuredItems);

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

    return (
        <>
            <div className='current-cart-items'>
                {/* {itemsInCart.length === 0 && <div>You currently have no items in your cart.</div>} */}
                {itemsInCart.length !== 0 &&
                    <>
                        <h2 className='cart-items-heading'>These are the items you currently have in your cart:</h2>
                        <div className='cart-item-list'>
                            {itemsInCart.map(item => {
                                return (
                                    <div className='individual-cart-item' key={item.itemId}>
                                        <div className='cart-item-container'>

                                            <div className='cart-item-information'>
                                                <div>{item.quantity} {item.name}</div>
                                                <div className='item-detail-price'>
                                                    <img className='vbucks-icon' src={item.priceIconLink} />
                                                    <div>{item.price} vbucks</div>
                                                </div>
                                                <button onClick={() => handleRemoveFromCart(item.itemId)}>Remove from cart</button>
                                            </div>

                                            <div className='cart-item-image-container'>
                                                <img className='item-detail-image cart-item-image' src={item.images.icon} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                                            </div>

                                        </div>
                                    </div>
                                )
                            })}

                            <div className='cart-total'>
                                <h2 className='cart-total-heading'>Cart Total:</h2>
                                <div className='item-detail-price cart-total-price'>
                                    <img className='vbucks-icon' src={vbucks} />
                                    <div>{numberWithCommas(itemsInCart.reduce((total, item) => {
                                    const price = parseInt(item.price.replace(/,/g, ''), 10);
                                    return total + price * item.quantity;
                                    }, 0))} vbucks
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {itemsInCart.length === 0 &&
                    <>
                        <div>Looks like you don't have any items in your cart yet!</div>
                    </>
                }
            </div>
            
            <div className='additional-money-message'>
                <div>Need more vbucks? You can buy some more with your starter cash!</div>
                <div>If you've ran out of cash, you can earn more by completing daily tasks such as setting reminders, leaving comments, and likes!</div>
            </div>
        </>
    )
}

export default Cart;