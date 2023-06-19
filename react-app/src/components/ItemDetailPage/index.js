import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory, useParams } from 'react-router-dom'
import './ItemDetailPage.css'

const ItemDetailPage = () => {
    const { itemName } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const dailyItems = useSelector(state => state.items.dailyItems);
    const featuredItems = useSelector(state => state.items.featuredItems);

    //combine both lists
    const allItems = [...dailyItems, ...featuredItems]

    //find the item with the given name
    const item = allItems.find(item => item.name === itemName);

    //now we can use 'item' to display its details
    //handle case where item is undefined

    return (
        <>
            <h1>This is the Item Detail Page</h1>
            {item ? (
                <div>
                    <h2>{item.name}</h2>
                    <img src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                    <div>{item.description}</div>
                    <div>{item.price}</div>
                </div>
            ) : (
                <p>No item found with this name: { itemName }</p>
            )}
            <div></div>
        </>
    )
}

export default ItemDetailPage;