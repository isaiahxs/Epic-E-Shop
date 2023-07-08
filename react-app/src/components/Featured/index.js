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

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <h1 className='featured-header'>Today's Featured Items</h1>
            <div className='featured-items-container'>
                {featuredItems.length > 0 && featuredItems.map((item, idx) => (
                    <div key={idx} onClick={() => history.push(`/item/${item.name}`)}>
                        <div className='featured-item'>
                            <div className='img-container'>
                                <img className='home-item-image' src={item.images.icon} alt={item.name} style={{ backgroundColor: getItemBackgroundColor(item.rarity) }}/>
                            </div>
                            <div className='item-name home-item-name'>{item.name}</div>
                            <div className='item-detail-price'>
                                <img className='vbucks-icon' src={item.priceIconLink} alt='vbucks' />
                                <div className='item-price home-item-price'>{item.price}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='back-to-top-button-container'>
                <button className='back-to-top-button' onClick={scrollToTop}>Back to Top</button>
            </div>
        </>
    )
}

export default Featured;