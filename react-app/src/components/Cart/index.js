import { useSelector, useDispatch } from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
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

    // console.log('ITEMS IN CART', itemsInCart)

    return (
        <>
            <div className='current-cart-items'>
                {/* {itemsInCart.length === 0 && <div>You currently have no items in your cart.</div>} */}
                {itemsInCart.length !== 0 &&
                    <>
                        <div>These are the items you currently have in your cart:</div>
                        <div>
                            {itemsInCart.map(item => {
                                return (
                                    <div key={item.itemId}>
                                        <div>{item.quantity}</div>
                                        <div>{item.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                }
                {itemsInCart.length === 0 &&
                    <>
                        <div>Looks like you don't have any items in your cart yet!</div>
                    </>
                }
            </div>

        <div>Need more vbucks? You can buy some more with your starter cash!</div>
        <div>If you've ran out of cash, you can earn more by completing daily tasks such as setting reminders, leaving comments, and likes!</div>
        </>
    )
}

export default Cart;