import React, {useSelector, useDispatch} from 'react-redux'
import { setSeedItems, setDailyItems, setFeaturedItems, setCurrentItem, getSeedItems, getDailyItems, getFeaturedItems } from '../../store/items'
import { setLikes, getLikes } from '../../store/like'
import { getComments } from '../../store/comments'
import { useEffect, useState } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import { getInventory } from '../../store/inventory'
import { getReminders } from '../../store/reminders'
import vbucks from '../../assets/images/vbucks-icon.webp'
import InventoryItems from '../InventoryItems'
import './InventoryPage.css'

const InventoryPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    // const inventory = useSelector(state => state.inventory);
    // console.log('INVENTORY', inventory)
    const sessionUser = useSelector(state => state.session.user);
    const reminders = useSelector(state => state.reminders);
    const comments = useSelector(state => state.comments);
    const likes = useSelector(state => state.totalLikes);

    const seedItems = useSelector(state => state.items.seedItems);
    const dailyItems = useSelector(state => state.items.dailyItems);
    const featuredItems = useSelector(state => state.items.featuredItems);

    useEffect(() => {
        const seedItemsStored = localStorage.getItem('seedItems');
        const dailyItemsStored = localStorage.getItem('dailyItems');
        const featuredItemsStored = localStorage.getItem('featuredItems');
    
        if (!seedItemsStored || !dailyItemsStored || !featuredItemsStored) {
            dispatch(getSeedItems())
            dispatch(getDailyItems())
            dispatch(getFeaturedItems())
        } else {
            dispatch(setSeedItems(JSON.parse(seedItemsStored)));
            dispatch(setDailyItems(JSON.parse(dailyItemsStored)));
            dispatch(setFeaturedItems(JSON.parse(featuredItemsStored)));
        }

    }, [dispatch]);

    const allItems = [...seedItems, ...dailyItems, ...featuredItems]

    useEffect(() => {
        const fetchAllData = async () => {
            await Promise.all([
                // dispatch(getSeedItems()),
                // dispatch(getDailyItems()),
                // dispatch(getFeaturedItems()),
                dispatch(getInventory()),
                dispatch(getReminders()),
                dispatch(getComments()),
                dispatch(getLikes()),
            ]);
            setIsLoading(false);
        };

        fetchAllData();
    }, [dispatch]);

    const userReminders = reminders.filter(reminder => reminder.userId === sessionUser.id)
    // console.log('USER REMINDERS', userReminders);

    const userComments = comments.filter(comment => comment.userId === sessionUser.id)
    const userLikes = likes.filter(like => like.userId === sessionUser.id)

    if (isLoading) {
        return <div>Loading...</div>
    }
    return (
        <>
            {sessionUser &&
                <>
                    <InventoryItems />
                    <div className='inventory-reminders'>
                        <h2>Your Reminders: ({userReminders.length})</h2>

                            {userReminders.map(reminder => {
                            const item = allItems.find(item => item.itemId === reminder.itemId);

                            return item ? (
                                <div className='inventory-item' key={reminder.itemId} onClick={() => history.push(`/item/${item.name}`)}>
                                    
                                    <div className='img-container'>
                                        <img className='home-item-image' src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                                    </div>
                                    <div className='inventory-item-info'>
                                        <div className='inventory-item-name'>Item name: {item.name}</div>
                                        <div className='inventory-rarity-section'>Rarity: <span className='rarity' style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}>{item.rarity}</span></div>

                                        <div className='inventory-item-type'>Type: {item.type}</div>
                                        <div className='item-detail-price'>
                                            <img src={item.priceIconLink} alt={item.priceIcon} className='vbucks-icon'/>
                                            <div className='inventory-item-price'>{item.price}</div>
                                        </div>
                                    </div>
                                    {reminder.duration === -1 &&
                                    <div className='inventory-quantity'>Duration: Until item returns</div>
                                    }
                                    {reminder.duration !== -1 &&
                                    <div className='inventory-quantity'>Duration: {reminder.duration} days</div>
                                    }
                                </div>
                            ) : null;
                        })}

                    </div>


                    <div className='inventory-comments'>
                        <h2>Your Comments: ({userComments.length})</h2>

                        {userComments.map(comment => {
                            const item = allItems.find(item => item.itemId === comment.itemId);

                            return item ? (
                                <div className='inventory-item' key={comment.itemId} onClick={() => history.push(`/item/${item.name}`)}>
                                    
                                    <div className='img-container'>
                                        <img className='home-item-image' src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                                    </div>
                                    <div className='inventory-item-info'>
                                        <div className='inventory-item-name'>Item name: {item.name}</div>
                                        <div className='inventory-rarity-section'>Rarity: <span className='rarity' style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}>{item.rarity}</span></div>

                                        <div className='inventory-item-type'>Type: {item.type}</div>
                                        <div className='item-detail-price'>
                                            <img src={item.priceIconLink} alt={item.priceIcon} className='vbucks-icon'/>
                                            <div className='inventory-item-price'>{item.price}</div>
                                        </div>
                                    </div>
                                    <div className='inventory-comment'>
                                        <div className='inventory-comment-text inventory-quantity'>Comment: {comment.text}</div>
                                    </div>
                                </div>
                            ) : null;
                        })}

                    </div>


                    <div className='inventory-likes'>
                        <h2>Your Votes: ({userLikes.length})</h2>

                        {userLikes.map(vote => {
                            const item = allItems.find(item => item.itemId === vote.itemId);

                            return item ? (
                                <div className='inventory-item' key={vote.itemId} onClick={() => history.push(`/item/${item.name}`)}>
                                    
                                    <div className='img-container'>
                                        <img className='home-item-image' src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                                    </div>
                                    <div className='inventory-item-info'>
                                        <div className='inventory-item-name'>Item name: {item.name}</div>
                                        <div className='inventory-rarity-section'>Rarity: <span className='rarity' style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}>{item.rarity}</span></div>

                                        <div className='inventory-item-type'>Type: {item.type}</div>
                                        <div className='item-detail-price'>
                                            <img src={item.priceIconLink} alt={item.priceIcon} className='vbucks-icon'/>
                                            <div className='inventory-item-price'>{item.price}</div>
                                        </div>
                                    </div>
                                    <div className='vote-value inventory-quantity'>{vote.value ? "Liked" : "Disliked"}</div>
                                </div>
                            ) : null;
                        })}
                    </div>
                </>
            }
            {!sessionUser &&
                <h1>Sign in to view your account details!</h1>
            }
        </>
    )
}

export default InventoryPage;