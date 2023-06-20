import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory, useParams } from 'react-router-dom'
import './ItemDetailPage.css'

const ItemDetailPage = ({isLoaded}) => {
    const { itemName } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const dailyItems = useSelector(state => state.items.dailyItems);
    const featuredItems = useSelector(state => state.items.featuredItems);
    const itemsLoaded = useSelector(state => state.items.itemsLoaded)

    useEffect(() => {
        dispatch(getDailyItems())
        dispatch(getFeaturedItems())
    }, [dispatch])

    //combine both lists
    const allItems = [...dailyItems, ...featuredItems]

    //find the item with the given name
    const item = allItems.find(item => item.name === itemName);

    //now we can use 'item' to display its details
    //handle case where item is undefined

    function formatDate(dateString) {
        const date = new Date(dateString);
    
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0 based index in JS
        const year = date.getFullYear();
    
        return `${month}-${day}-${year}`;
    }

    if (!isLoaded) {
        return <p>Loading...</p>
    }
    return (
        <>
            {/* <h1>This is the Item Detail Page</h1> */}
            {item ? (
                <div className='item-detail-heading'>
                    <div>
                        <img className='item-detail-image' src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                    </div>
                    <div className='item-details'>
                        <h1 className='item-detail-name'>{item.name}</h1>
                        <h3>Rarity: {item.rarity}</h3>
                        <div>
                            <img className='vbucks-icon' src={item.priceIconLink} alt='vbucks' />
                            {item.price}
                        </div>
                        <div>{item.description}</div>
                        <div>Release Date: {formatDate(item.history.firstSeen)}</div>
                        <div>Last Seen: {formatDate(item.history.lastSeen)}</div>
                        <div>Occurrences: {item.history.occurrences}</div>
                    </div>
                    <div className='item-history'>
                        <div>Shop Occurrences</div>
                    </div>
                </div>
            ) : (
                <p>Loading: { itemName }</p>
            )}
            <div></div>
        </>
    )
}

export default ItemDetailPage;