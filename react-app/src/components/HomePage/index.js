import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
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
            <h1>HomePage</h1>
            <button onClick={() => history.push(`/featured_items`)}>Check out our Featured items!</button>
            <h2>Today's Daily Items</h2>
            {/* check if the items array is not empty before trying to map over it */}
            {items.length > 0 && items.map((item, idx) => (
                <div key={idx}>
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
            <div>
                <div>Latest News</div>
                <div>Chapter 4 Season 3: WILDS</div>
                <div>Raptor Riding</div>
                <div>Mud</div>
            </div>
        </div>
    )
}

export default HomePage;