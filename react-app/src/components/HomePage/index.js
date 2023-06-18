import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import './HomePage.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.dailyItems)
    // console.log("THESE ARE OUR ITEMS", items)
    // console.log('THIS IS OUR ITEMS[0] NAME', items?.[0]?.name)

    useEffect(() => {
        dispatch(getDailyItems())
    }, [dispatch])



    return (
        <div>
            <h1>HomePage</h1>
            <h2>Today's Daily Items</h2>
            {/* check if the items array is not empty before trying to map over it */}
            {items.length > 0 && items.map((item, idx) => (
                <>
                    <div className='home-item-information'>
                        <div className='item-name home-item-name' key={idx}>{item.name}</div>
                        <img className='vbucks-icon' src={item.priceIconLink} alt='vbucks' />
                        <div className='item-price home-item-price'>{item.price}</div>
                    </div>
                    {/* possible image options are: featured, gallery, icon, png, resizeAvailable: boolean */}
                    <img className='home-item-image' src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>                    
                </>
            ))}
        </div>
    )
}

export default HomePage;