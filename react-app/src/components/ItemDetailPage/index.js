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
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' }); //this will get the month name
        const year = date.getFullYear();
        
        //function to convert day into ordinal number (1st, 2nd, 3rd, etc.)
        function getOrdinal(n) {
            const s = ["th","st","nd","rd"],
            v = n % 100;
            return n + (s[(v-20)%10] || s[v] || s[0]);
        }
    
        return `${month} ${getOrdinal(day)}, ${year}`;
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
        <div className='item-detail-container'>
            {/* <h1>This is the Item Detail Page</h1> */}
            {item ? (
                <div className='item-detail-heading'>
                    <div>
                        <img className='item-detail-image' src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                    </div>
                    <div className='item-details'>
                        <h1 className='item-detail-name'>{item.name}</h1>
                        <div className='item-rarity-section'>
                            {/* <h3>Rarity:</h3> */}
                            <h3 className='rarity' style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}>{item.rarity}</h3>
                            <h3 className='item-type'>{item.type}</h3>
                        </div>
                        <div className='item-detail-price'>
                            <img className='vbucks-icon' src={item.priceIconLink} alt='vbucks' />
                            {item.price}
                        </div>
                        <div>{item.description}</div>
                        <div>Release Date: {formatDate(item.history.firstSeen)}</div>
                        <div>Last Seen: {formatDate(item.history.lastSeen)}</div>
                        <div>Occurrences: {item.history.occurrences}</div>
                    </div>

                    <div className='item-history'>
                        <h3 className='occurrences'>Shop Occurrences</h3>
                        <div className='time-days'>
                            <div className='date-days'>
                                <div>Date</div>
                                <div>Days Ago</div>
                            </div>
                            {item.history.dates.sort((a, b) => new Date(b) - new Date(a)).map(date => (
                                <div key={date} className="date-item">
                                    <div className='date'>{formatDate(date)}</div>
                                    <div className='days'>{daysAgo(date)}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            ) : (
                <h1 className='loading-message'>Loading: { itemName }</h1>
            )}
            <div></div>
        </div>
    )
}

export default ItemDetailPage;