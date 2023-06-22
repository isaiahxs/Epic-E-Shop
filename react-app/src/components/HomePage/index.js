import {useSelector, useDispatch} from 'react-redux'
import { setSeedItems, setDailyItems, setFeaturedItems, getSeedItems, getDailyItems, getFeaturedItems } from '../../store/items'
import { getLikes } from '../../store/like'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import theWilds from '../../assets/images/The-Wilds.jpg'
import NewsFeed from '../NewsFeed'
import DailyItems from '../DailyItems'
import RefreshCounter from '../RefreshCounter'
import FanFavorites from '../FanFavorites'
import './HomePage.css'

const HomePage = () => {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const seedItems = useSelector(state => state.items.seedItems);
    const dailyItems = useSelector(state => state.items.dailyItems);
    const featuredItems = useSelector(state => state.items.featuredItems);
    const likes = useSelector(state => state.likes)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSeedItems())
        dispatch(getDailyItems())
        dispatch(getFeaturedItems())
        dispatch(getLikes())
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem('seedItems', JSON.stringify(seedItems));
        localStorage.setItem('dailyItems', JSON.stringify(dailyItems));
        localStorage.setItem('featuredItems', JSON.stringify(featuredItems));
        localStorage.setItem('likes', JSON.stringify(likes));
    }, [seedItems, dailyItems, featuredItems, likes]);

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
    // }, [dispatch]);

    return (
        <div className='home-container'>
            <div className='home-heading'>
                <h1 className='heading-text'>
                    {/* Welcome to the Wilds, {sessionUser.username}! */}
                    {sessionUser ? `Welcome to the Wilds, ${sessionUser.username}!` : 'Welcome to the Wilds!'}
                </h1>
                <div className='banner-container'>
                    <img className='hero-banner' src={theWilds} alt='The Wilds' />
                {/* <h2 className='refresh-counter'>Item Shop Refreshes at 8PM EST!</h2> */}
                </div>
                <RefreshCounter />
            </div>
            <DailyItems />
            <h2 className='featured-items-button' onClick={() => history.push(`/featured_items`)}>Check out the rest of today's featured items!</h2>
            {/* <div>
                <div>Recent Articles</div>
            </div> */}
            <FanFavorites />
            <NewsFeed />
        </div>
    )
}

export default HomePage;