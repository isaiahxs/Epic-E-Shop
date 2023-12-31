import { useSelector, useDispatch } from 'react-redux'
import { setSeedItems, setDailyItems, setFeaturedItems, setCurrentItem, getSeedItems, getDailyItems, getFeaturedItems } from '../../store/items'
import { setLikes, getLikes } from '../../store/like'
import { getComments } from '../../store/comments'
import { useEffect, useState } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useParams } from 'react-router-dom'
import ItemLikes from '../ItemLikes'
import Comments from '../Comments'
import Reminders from '../Reminders'
import CartPanel from '../CartPanel'
import vbucks from '../../assets/images/vbucks-icon.webp'
import './ItemDetailPage.css'
import { getInventory } from '../../store/inventory'
import { getReminders } from '../../store/reminders'

const ItemDetailPage = () => {
    const { itemName } = useParams();
    const dispatch = useDispatch();
    const seedItems = useSelector(state => state.items.seedItems);
    const dailyItems = useSelector(state => state.items.dailyItems);
    const featuredItems = useSelector(state => state.items.featuredItems);
    const currentItem = useSelector(state => state.items.currentItem);
    const itemsLoaded = useSelector(state => state.items.itemsLoaded)
    const sessionUser = useSelector(state => state.session.user);


    //combine both lists
    const allItems = [...seedItems, ...dailyItems, ...featuredItems]

    //find the item with the given name
    const item = allItems.find(item => item.name === itemName);
    // dispatch(setCurrentItem(item)); //set the current item in the store

    useEffect(() => {
        if (item) {
            dispatch(setCurrentItem(item)); //set the current item in the store
        }
    }, [dispatch, item]);

    //now we can use 'item' to display its details
    //handle case where item is undefined

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' }); //this will get the month name
        const year = date.getFullYear();

        //function to convert day into ordinal number (1st, 2nd, 3rd, etc.)
        function getOrdinal(n) {
            const s = ["th", "st", "nd", "rd"],
                v = n % 100;
            return n + (s[(v - 20) % 10] || s[v] || s[0]);
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

    //USING LOCAL STORAGE but going from search to idp didn't set seed data immediately yet
    //but since the seed data is in my database and we're not interacting with the external api anymore, it should still be very fast
    // useEffect(() => {
    //     const seedItemsStored = localStorage.getItem('seedItems');
    //     const dailyItemsStored = localStorage.getItem('dailyItems');
    //     const featuredItemsStored = localStorage.getItem('featuredItems');

    //     if (!seedItemsStored || !dailyItemsStored || !featuredItemsStored) {
    //         dispatch(getSeedItems())
    //         dispatch(getDailyItems())
    //         dispatch(getFeaturedItems())
    //     } else {
    //         dispatch(setSeedItems(JSON.parse(seedItemsStored)));
    //         dispatch(setDailyItems(JSON.parse(dailyItemsStored)));
    //         dispatch(setFeaturedItems(JSON.parse(featuredItemsStored)));
    //     }

    //     //i want to always fetch likes from the server
    //     dispatch(getLikes());
    //     dispatch(getComments());
    //     dispatch(getInventory());
    //     dispatch(getReminders());
    // }, [dispatch]);

    useEffect(() => {
        // const seedItemsStored = localStorage.getItem('seedItems');
        const dailyItemsStored = localStorage.getItem('dailyItems');
        const featuredItemsStored = localStorage.getItem('featuredItems');

        if (!dailyItemsStored || !featuredItemsStored) {
            // dispatch(getSeedItems())
            dispatch(getDailyItems())
            dispatch(getFeaturedItems())
        } else {
            // dispatch(setSeedItems(JSON.parse(seedItemsStored)));
            dispatch(setDailyItems(JSON.parse(dailyItemsStored)));
            dispatch(setFeaturedItems(JSON.parse(featuredItemsStored)));
        }

        dispatch(getSeedItems());
        dispatch(getLikes());
        dispatch(getComments());
        dispatch(getInventory());
        dispatch(getReminders());
    }, [dispatch]);

    return (
        <div className='item-detail-container'>
            {/* <h1>This is the Item Detail Page</h1> */}
            {item ? (
                <div className='item-detail-body'>
                    {/* <div className='item-detail-heading'> */}
                    <div className={`item-detail-heading ${!item.history.dates ? 'exclusive-item-detail-heading' : ''}`}>
                        <div className={`item-detail-image-container ${item.rarity}-container`}>
                            <img className={`item-detail-image ${item.rarity}`} src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }} />
                        </div>
                        <div className='item-detail-stats'>
                            <div className='item-details'>
                                <h1 className='item-detail-name'>{item.name}</h1>

                                <div className='item-rarity-section small-rarity-section'>
                                    <h3 className='rarity' style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}>{item.rarity}</h3>
                                    <h3 className='item-type'>{item.type}</h3>
                                </div>

                                {item.price && !item.priceIconLink &&
                                    <div className='item-detail-price small-detail-price'>
                                        {item.price}
                                    </div>
                                }

                                {item.price && item.priceIconLink && item.priceIcon === 'vip' &&
                                    <div className='item-detail-price small-detail-price'>
                                        <img className='vbucks-icon' src={item.priceIconLink} alt='vbucks' />
                                        {item.price}
                                    </div>
                                }

                                {item.price && item.priceIconLink && item.priceIcon !== 'vip' &&
                                    <div className='item-detail-price small-detail-price'>
                                        <img className='vbucks-icon' src={vbucks} alt='vbucks' />
                                        {item.price}
                                    </div>
                                }

                                <div className='small-item-details'>
                                    <div>{item.description}</div>
                                    {item.history.dates &&
                                        <>
                                            <div>Release Date: {formatDate(item.history.firstSeen)}</div>
                                            <div>Last Seen: {formatDate(item.history.lastSeen)}</div>
                                            <div>Occurrences: {item.history.occurrences}</div>
                                        </>
                                    }
                                </div>
                            </div>

                            <div className='item-history'>
                                {item.history === false || !item.history.dates ?
                                    (
                                        <h3 className='occurrences'>
                                            Unfortunately, this item was a battle-pass exclusive, so you are not able to add it to your cart!
                                        </h3>
                                    ) : (
                                        <>
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
                                        </>
                                    )
                                }
                            </div>
                        </div>

                    </div>

                    <CartPanel />
                    <ItemLikes />
                    <Comments />
                    <Reminders />
                </div>
            ) : (
                <h1 className='loading-message'>Loading: {itemName}</h1>
            )}
        </div>
    )
}

export default ItemDetailPage;