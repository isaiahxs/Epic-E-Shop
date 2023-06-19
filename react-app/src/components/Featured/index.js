import {useSelector, useDispatch} from 'react-redux'
import { getDailyItems, getFeaturedItems } from '../../store/items'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import './Featured.css'

const Featured = () => {
    const dispatch = useDispatch()
    const featuredItems = useSelector(state => state.items.featuredItems)
    const history = useHistory()

    useEffect(() => {
        // dispatch(getDailyItems())
        dispatch(getFeaturedItems())
    }, [dispatch])

    return (
        <div>
            <h1>Featured Items</h1>
            {featuredItems.length > 0 && featuredItems.map((item, idx) => (
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
        </div>
    )
}

export default Featured;