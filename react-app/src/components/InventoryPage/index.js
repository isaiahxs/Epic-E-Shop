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
    //     // dispatch(getLikes());
    //     // dispatch(getComments());
    //     // dispatch(getInventory());
    //     // dispatch(getReminders());
    // }, [dispatch]);

    const allItems = [...seedItems, ...dailyItems, ...featuredItems]

    useEffect(() => {
        const fetchAllData = async () => {
            await Promise.all([
                dispatch(getSeedItems()),
                dispatch(getDailyItems()),
                dispatch(getFeaturedItems()),
                dispatch(getInventory())
            ]);
            setIsLoading(false);
        };

        fetchAllData();
    }, [dispatch]);

    const userReminders = reminders.filter(reminder => reminder.userId === sessionUser.id)
    console.log('USER REMINDERS', userReminders);

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
                    <h2>Your Reminders: ({userReminders.length})</h2>
                    <h2>Your Comments: ({userComments.length})</h2>
                    <h2>Your Likes: ({userLikes.length})</h2>
                </>
            }
            {!sessionUser &&
                <h1>Sign in to view your account details!</h1>
            }
        </>
    )
}

export default InventoryPage;