import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'

const WishlistPage = () => {
    return (
        <div>This is the Wish-list Page</div>
    )
}

export default WishlistPage;