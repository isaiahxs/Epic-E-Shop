import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'

const ItemDetailPage = () => {
    return (
        <div>This is the Item Detail Page</div>
    )
}

export default ItemDetailPage;