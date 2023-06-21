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

    function daysAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const timeDiff = now - date;
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        return daysDiff;
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

                    {/* <div className='item-history'>
                        <div>Shop Occurrences</div>
                        <div className='date-days'>
                            <div>Date</div>
                            <div>Days Ago</div>
                        </div>
                        <div className='time-days'>
                            <div></div>
                            <div></div>
                        </div>
                    </div> */}

                    <div className='item-history'>
                        <div>Shop Occurrences</div>
                        <div className='date-days'>
                            <div>Date</div>
                            <div>Days Ago</div>
                        </div>
                        <div className='time-days'>
                            {item.history.dates.sort((a, b) => new Date(b) - new Date(a)).map(date => (
                                <div key={date} className="date-item">
                                    <div>{formatDate(date)}</div>
                                    <div>{daysAgo(date)} days ago</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            ) : (
                <h1 className='loading-message'>Loading: { itemName }</h1>
            )}
            <div></div>
        </>
    )
}

export default ItemDetailPage;