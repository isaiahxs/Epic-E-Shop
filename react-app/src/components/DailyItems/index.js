import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import './DailyItems.css'

const DailyItems = () => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.items.dailyItems)
    const history = useHistory()

    useEffect(() => {
        dispatch(getDailyItems())
        // dispatch(getFeaturedItems())
    }, [dispatch])

    return (
        <div>
            <h2>Today's Daily Items</h2>
            {/* check if the items array is not empty before trying to map over it */}
            {items.length > 0 && items.map((item, idx) => (
                <div key={idx} onClick={() => history.push(`/item/${item.name}`)}>
                    {/* possible image options are: featured, gallery, icon, png, resizeAvailable: boolean */}
                    <img className='home-item-image' src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                    <div className='home-item-information'>
                        <div className='item-name home-item-name'>{item.name}</div>
                        <img className='vbucks-icon' src={item.priceIconLink} alt='vbucks' />
                        <div className='item-price home-item-price'>{item.price}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DailyItems;