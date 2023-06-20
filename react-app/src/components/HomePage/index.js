import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import theWilds from '../../assets/images/The-Wilds.jpg'
import mud from '../../assets/images/Mud.jpg'
import raptorRiding from '../../assets/images/Raptor-Riding.jpg'
import autograph from '../../assets/images/Autograph-Please.jpg'
import wildsCharacters from '../../assets/images/Wilds-Characters.jpeg'
import './HomePage.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.dailyItems)
    // console.log("THESE ARE OUR ITEMS", items)
    // console.log('THIS IS OUR ITEMS[0] NAME', items?.[0]?.name)
    const history = useHistory()

    useEffect(() => {
        dispatch(getDailyItems())
        // dispatch(getFeaturedItems())
    }, [dispatch])

    return (
        <div>
            <div className='home-heading'>
                <h1>Welcome to the Wilds!</h1>
                <img className='hero-banner' src={theWilds} alt='The Wilds' />
                <button className='featured-items-button' onClick={() => history.push(`/featured_items`)}>Check out our Featured items!</button>
            </div>
            <h2>Today's Daily Items</h2>
            {/* check if the items array is not empty before trying to map over it */}
            {items.length > 0 && items.map((item, idx) => (
                <div key={idx} onClick={() => history.push(`/item/${item.name}`)}>
                    <div className='home-item-information'>
                        <div className='item-name home-item-name'>{item.name}</div>
                        <img className='vbucks-icon' src={item.priceIconLink} alt='vbucks' />
                        <div className='item-price home-item-price'>{item.price}</div>
                    </div>
                    {/* possible image options are: featured, gallery, icon, png, resizeAvailable: boolean */}
                    <img className='home-item-image' src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>                    
                </div>
            ))}
            {/* <div>
                <div>Recent Articles</div>
            </div> */}
            <div className='news-feed'>
                <h2>Latest News</h2>
                <div className='latest-news'>
                    <img className='news-image' src={theWilds} alt='The Wilds' />
                    <h3 className='news-text-heading'>Chapter 4 Season 3: WILDS</h3>
                    <p className='news-text-body'>The WILDS await! Explore the vast jungle on the back of a raptor, ascend the high canopies or slide through the mud for additional speed and camouflage.</p>
                </div>
                <div className='latest-news'>
                    <img className='news-image' src={raptorRiding} alt='Raptor Riding' />
                    <h3 className='news-text-heading'>Raptor Riding</h3>
                    <p className='news-text-body'>Raptors are running wild! Make your enemies go extinct as you traverse the jungles on these fearsome creatures.</p>
                </div>
                <div className='latest-news'>
                    <img className='news-image' src={mud} alt='Mud' />
                    <h3 className='news-text-heading'>Mud</h3>
                    <p className='news-text-body'>Watch your step! Slide through a puddle of mud for a boost in speed and gain camouflage.</p>
                </div>
                <div className='latest-news'>
                    <img className='news-image' src={wildsCharacters} alt='Shockwave Grenades' />
                    <h3 className='news-text-heading'>Shockwave Grenades</h3>
                    <p className='news-text-body'>Now available in Zero Build, bounce around the jungle with Shockwave Grenades!</p>
                </div>
                {/* <div className='latest-news'>
                    <img className='news-image' src={autograph} alt='Autograph Please!' />
                    <h3 className='news-text-heading'>Autograph Please!</h3>
                    <p className='news-text-body'>Pass by the item shop to check out our latest emote!</p>
                </div> */}
            </div>
        </div>
    )
}

export default HomePage;