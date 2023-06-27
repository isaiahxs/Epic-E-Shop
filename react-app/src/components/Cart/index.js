import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import './Cart.css'

const Cart = () => {
    return (
        <div>This is the Cart Component</div>
    )
}

export default Cart;