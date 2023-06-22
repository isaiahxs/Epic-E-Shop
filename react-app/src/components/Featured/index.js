import {useSelector, useDispatch} from 'react-redux'
import { setSeedItems, setDailyItems, setFeaturedItems, getSeedItems, getDailyItems, getFeaturedItems } from '../../store/items'
import { setLikes, getLikes } from '../../store/like'
import { useEffect } from 'react'
import { getItemBackgroundColor } from '../../utils'
import { useHistory } from 'react-router-dom'
import './Featured.css'

const Featured = () => {
    const dispatch = useDispatch()
    const featuredItems = useSelector(state => state.items.featuredItems)
    const history = useHistory()

    useEffect(() => {
        const seedItemsStored = localStorage.getItem('seedItems');
        const dailyItemsStored = localStorage.getItem('dailyItems');
        const featuredItemsStored = localStorage.getItem('featuredItems');
        const likesStored = localStorage.getItem('likes');
    
        if (!seedItemsStored || !dailyItemsStored || !featuredItemsStored || !likesStored) {
            dispatch(getSeedItems())
            dispatch(getDailyItems())
            dispatch(getFeaturedItems())
            dispatch(getLikes())
        } else {
            dispatch(setSeedItems(JSON.parse(seedItemsStored)));
            dispatch(setDailyItems(JSON.parse(dailyItemsStored)));
            dispatch(setFeaturedItems(JSON.parse(featuredItemsStored)));
            dispatch(setLikes(JSON.parse(likesStored)));
        }
    }, [dispatch]);

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