import React, { useSelector, useDispatch } from 'react-redux'
import { setSeedItems, setDailyItems, setFeaturedItems, setCurrentItem, getSeedItems, getDailyItems, getFeaturedItems } from '../../store/items'
import { setLikes, getLikes } from '../../store/like'
import { getComments } from '../../store/comments'
import { useEffect, useState } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import { getInventory } from '../../store/inventory'
import { getReminders } from '../../store/reminders'
import vbucks from '../../assets/images/vbucks-icon.webp'
import InventoryBlock from '../InventoryBlock'
import './InventoryPage.css'

const InventoryPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    const sessionUser = useSelector(state => state.session.user);
    const reminders = useSelector(state => state.reminders);
    const comments = useSelector(state => state.comments);
    const likes = useSelector(state => state.totalLikes);
    const inventory = useSelector(state => state.inventory);

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
            // await dispatch(getSeedItems());
            await Promise.all([
                dispatch(getSeedItems()),
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
    const remindedItems = userReminders.filter(reminder => reminder.reminded === true);
    const userComments = comments.filter(comment => comment.userId === sessionUser.id)
    const userLikes = likes.filter(like => like.userId === sessionUser.id)

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    //calculating the total value of the inventory
    const totalValue = inventory.reduce((total, inventoryItem) => {
        const item = allItems.find(item => item.itemId === inventoryItem.itemId);
        if (item) {
            const itemPrice = parseInt(item.price.replace(',', ''), 10);
            return total + (inventoryItem.quantity * itemPrice);
        }
        return total;
    }, 0);

    const formattedTotalValue = numberWithCommas(totalValue);

    //calculating the total quantity of the inventory
    const totalItems = inventory.reduce((total, inventoryItem) => {
        return total + inventoryItem.quantity;
    }, 0);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    if (isLoading) {
        return (
            <div className='loading-message-container'>
                <h2 className='loading-message'>Loading...</h2>
            </div>
        )
    }
    return (
        <>
            {sessionUser &&
                <>
                    <div className='inventory-container'>
                        <div className='inventory-heading'>
                            {inventory.length > 0 &&
                                <h1 className='inventory-welcome'>Nice collection so far, {sessionUser.username}!</h1>
                            }

                            <div className='member-since'>
                                <h2>Member since: </h2>
                                <h2 className='user-creation-date'>{sessionUser.created_at.slice(0, 16)}</h2>
                            </div>

                            <div className='item-detail-price inventory-detail-price inventory-detail-price-heading'>
                                <div>
                                    <h2>Total Inventory value:</h2>
                                </div>
                                <div>
                                    <h2 className='total-value'>
                                        <img src={vbucks} className='vbucks-icon inventory-vbuck' />
                                        {formattedTotalValue}
                                    </h2>
                                </div>
                            </div>
                        </div>

                        {remindedItems.length === 1 &&
                            <div className='inventory-subheading'>
                                <h2 className='currently-in-store'>The item you set a reminder for is currently in store!</h2>
                            </div>
                        }
                        {remindedItems.length > 1 &&
                            <div className='inventory-subheading'>
                                <h2 className='currently-in-store'>The items you set reminders for are currently in store!</h2>
                            </div>
                        }

                        {userReminders.map(reminder => {
                            const item = allItems.find(item => item.itemId === reminder.itemId && reminder.reminded === true);

                            return item ? (
                                <div className='inventory-item-container'>
                                    <div className='inventory-item' key={item.itemId}>
                                        <InventoryBlock item={item} />

                                        <div className='inventory-special inv-clickable inv-special-column' onClick={() => history.push(`/item/${item.name}`)}>
                                            <div className='inventory-special-word'>
                                                Available:
                                            </div>
                                            <div className='inventory-special-value'>
                                                Now
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null;
                        })}

                        <div>
                            <h2 className='inventory-subheading'>Total items: ({totalItems})</h2>
                            <h2 className='inventory-subheading unique-items-heading'>Unique items: ({inventory.length})</h2>
                        </div>

                        {inventory.map(inventoryItem => {
                            const item = allItems.find(item => item.itemId === inventoryItem.itemId);

                            return item ? (
                                <div className='inventory-item-container'>
                                    <div className='inventory-item' key={inventoryItem.itemId}>
                                        <InventoryBlock item={item} />

                                        <div className='inventory-special inv-clickable inv-special-column' onClick={() => history.push(`/item/${item.name}`)}>
                                            <div className='inventory-special-word'>
                                                Quantity:
                                            </div>
                                            <div className='inventory-special-value'>
                                                {inventoryItem.quantity}x
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null;
                        })}
                    </div>


                    <div className='inventory-reminders inventory-container'>
                        <h2 className='inventory-subheading'>Your Reminders: ({userReminders.length})</h2>

                        {userReminders.map(reminder => {
                            const item = allItems.find(item => item.itemId === reminder.itemId);

                            return item ? (
                                <div className='inventory-item-container'>
                                    <div className='inventory-item' key={reminder.itemId}>

                                        <InventoryBlock item={item} />

                                        {reminder.duration === -1 &&
                                            <div className='inventory-special inv-clickable inv-special-column' onClick={() => history.push(`/item/${item.name}`)}>
                                                <div className='inventory-special-word'>
                                                    Duration:
                                                </div>
                                                <div className='inventory-special-value'>
                                                    Until item returns
                                                </div>
                                            </div>
                                        }
                                        {reminder.duration !== -1 &&
                                            <div className='inventory-special inv-clickable inv-special-column' onClick={() => history.push(`/item/${item.name}`)}>
                                                <div className='inventory-special-word'>
                                                    Duration:
                                                </div>
                                                <div className='inventory-special-value'>
                                                    {reminder.duration} days
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            ) : null;
                        })}

                    </div>


                    <div className='inventory-comments inventory-container'>
                        <h2 className='inventory-subheading'>Your Comments: ({userComments.length})</h2>

                        {userComments.map(comment => {
                            const item = allItems.find(item => item.itemId === comment.itemId);

                            return item ? (
                                <div className='inventory-item-container'>
                                    <div className='inventory-item' key={comment.itemId}>

                                        <InventoryBlock item={item} getItemBackgroundColor={getItemBackgroundColor} />

                                        <div className='inventory-comment inv-clickable' onClick={() => history.push(`/item/${item.name}`)}>
                                            <div className='inventory-comment-text inventory-special inv-special-column'>
                                                <div className='inventory-special-word'>
                                                    Comment:
                                                </div>
                                                <div className='inventory-special-value'>
                                                    {comment.text}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null;
                        })}

                    </div>


                    <div className='inventory-likes inventory-container'>
                        <h2 className='inventory-subheading'>Your Votes: ({userLikes.length})</h2>

                        {userLikes.map(vote => {
                            const item = allItems.find(item => item.itemId === vote.itemId);

                            return item ? (
                                <div className='inventory-item-container'>
                                    <div className='inventory-item' key={vote.itemId}>
                                        <InventoryBlock item={item} getItemBackgroundColor={getItemBackgroundColor} />

                                        <div className='vote-value inventory-special inv-clickable inv-special-column' onClick={() => history.push(`/item/${item.name}`)}>
                                            <div className='inventory-special-word'>
                                                Vote:
                                            </div>
                                            <div className='inventory-special-value'>
                                                {vote.value ? "Liked" : "Disliked"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : null;
                        })}
                    </div>
                </>
            }
            <div className='back-to-top-button-container'>
                <button className='back-to-top-button' onClick={scrollToTop}>Back to Top</button>
            </div>
            {!sessionUser &&
                <h1>Sign in to view your account details!</h1>
            }
        </>
    )
}

export default InventoryPage;