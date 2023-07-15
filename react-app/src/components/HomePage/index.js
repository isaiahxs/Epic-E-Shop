import {useSelector, useDispatch} from 'react-redux'
import { setSeedItems, setDailyItems, setFeaturedItems, getSeedItems, getDailyItems, getFeaturedItems } from '../../store/items'
import { getLikes } from '../../store/like'
import { useEffect, useState } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import theWilds from '../../assets/images/The-Wilds.jpg'
import NewsFeed from '../NewsFeed'
import DailyItems from '../DailyItems'
import FeaturedCarousel from '../FeaturedCarousel'
import RefreshCounter from '../RefreshCounter'
import FanFavorites from '../FanFavorites'
import './HomePage.css'
import { getInventory } from '../../store/inventory'
import { getCart } from '../../store/cart'
import { getReminders } from '../../store/reminders'

const HomePage = () => {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const reminders = useSelector(state => state.reminders);
    const seedItems = useSelector(state => state.items.seedItems);
    const dailyItems = useSelector(state => state.items.dailyItems);
    const featuredItems = useSelector(state => state.items.featuredItems);
    const likes = useSelector(state => state.totalLikes)
    // console.log(likes);

    const [isLoading, setIsLoading] = useState(true);

    const userReminders = sessionUser ? reminders.filter(reminder => reminder.userId === sessionUser.id) : [];
    // const userReminders = reminders.filter(reminder => reminder.userId === sessionUser.id)
    const remindedItems = userReminders.filter(reminder => reminder.reminded === true);

    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getSeedItems())
    //     dispatch(getDailyItems())
    //     dispatch(getFeaturedItems())
    //     dispatch(getReminders())
    //     // dispatch(getInventory())
    //     // dispatch(getLikes())
    // }, [dispatch])

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all([
                dispatch(getSeedItems()),
                setIsLoading(false),
                dispatch(getDailyItems()),
                dispatch(getFeaturedItems()),
                dispatch(getReminders()),
                // dispatch(getInventory()),
                // dispatch(getLikes()),
            ]);
        };

        fetchData();
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem('seedItems', JSON.stringify(seedItems));
        localStorage.setItem('dailyItems', JSON.stringify(dailyItems));
        localStorage.setItem('featuredItems', JSON.stringify(featuredItems));
        // localStorage.setItem('likes', JSON.stringify(likes));
    // }, [seedItems, dailyItems, featuredItems, likes]);
    }, [seedItems, dailyItems, featuredItems]);

    if (isLoading) {
        return (
            <div className='loading-message-container'>
                <h2 className='loading-message'>Loading...</h2>
            </div>
        )
    }

    return (
        <div className='home-container'>
            <div className='home-heading'>
                <h1 className='heading-text reminder-heading-text'>
                    {/* Welcome to the Wilds, {sessionUser.username}! */}
                    {sessionUser ? `Welcome to the Wilds, ${sessionUser.username}!` : 'Welcome to the Wilds!'}
                </h1>

                <div>
                    {sessionUser && remindedItems.length === 1 &&
                        <div>
                            <h2 className='currently-in-store home-currently-in-store'>An item you set a reminder for is currently in store!</h2>
                            <div className='home-to-inventory-container'>
                                <button className='blue-button home-to-inventory' onClick={() => history.push('/inventory')}>View Reminder</button>
                            </div>
                        </div>
                    }
                </div>

                <div>
                    {sessionUser && remindedItems.length > 1 &&
                        <div>
                            <h2 className='currently-in-store home-currently-in-store'>Some items you set reminders for are currently in store!</h2>
                            <div className='home-to-inventory-container'>
                                <button className='blue-button home-to-inventory' onClick={() => history.push('/inventory')}>View Reminders</button>
                            </div>
                        </div>
                    }
                </div>

                <div className='banner-container'>
                    <img className='hero-banner' src={theWilds} alt='The Wilds' />
                {/* <h2 className='refresh-counter'>Item Shop Refreshes at 8PM EST!</h2> */}
                </div>
                <RefreshCounter />
            </div>
            <FanFavorites />
            <DailyItems />
            <FeaturedCarousel />
            <div className='featured-items-button-container'>
                <button className='featured-items-button purple-button' onClick={() => history.push(`/featured_items`)}>Check out the rest of today's featured items!</button>
            </div>
            <NewsFeed />
        </div>
    )
}

export default HomePage;