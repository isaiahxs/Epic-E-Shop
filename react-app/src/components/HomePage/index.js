import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import theWilds from '../../assets/images/The-Wilds.jpg'
import NewsFeed from '../NewsFeed'
import DailyItems from '../DailyItems'
import './HomePage.css'

const HomePage = () => {
    const history = useHistory()

    return (
        <div>
            <div className='home-heading'>
                <h1>Welcome to the Wilds!</h1>
                <img className='hero-banner' src={theWilds} alt='The Wilds' />
                <h2 className='refresh-counter'>Item Shop Refreshes in X:XX:XX</h2>

            </div>
            <DailyItems />
            <button className='featured-items-button' onClick={() => history.push(`/featured_items`)}>Check out our Featured items!</button>
            {/* <div>
                <div>Recent Articles</div>
            </div> */}
            <NewsFeed />
        </div>
    )
}

export default HomePage;